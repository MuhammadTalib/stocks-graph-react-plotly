import { Box, TableSortLabel } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { visuallyHidden } from "@mui/utils";
import React, { useEffect, useState } from "react";
import { getComparator, stableSort } from "../Utils/sorting";
import { getTimeObject } from "../Utils/utils";
import { getAllStocks } from "../services/api";
import { T0, templates } from "../Utils/defaults";

const FilterPanelTable = ({
    height,
    scrollableListRef,
    selectedStrategy,
    placeSelectedItemInTheMiddle,
    selectedStock,
    hanldeSelectedTime,
    selectedTime,
    strategiesData,
    selectedCategory,
    symbolFilter,
    timeFilter,
    setSelectStockIndex,
    selectedStockIndex,
    startDate,
    filterPattern,
    setSelectedTriggerFromPanel,
    fetchTimeStamp,
    setGraphConfigs,
    graphConfigs,
    setPatterns,
    patterns
}) => {
    const pollingTime = 100 //seconds
    const filtersColumns = [
        { label: "Symbol", numeric: false, type: "string" },
        { label: "Interval", numeric: false, type: "string" },
        {
            label: "Session",
            numeric: false,
            type: "time",
        },
    ];
    const [tableData, setTableData] = useState([]);
    const [patternColumns, setPatternColumns] = useState([]);
    const [pagination, setPagination] = useState({
        pageSize: 100,
        currentPage: 1,
        total_count: 0,
        total_pages: 0,
    });
    const [selectedColumnIndex, setSelectedColumnIndex] = useState(null)
    const [time, setTime] = useState(0)
    useEffect(() => {
        fetchTableData();
    }, [symbolFilter, timeFilter, pagination.currentPage, startDate, filterPattern, fetchTimeStamp, time]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    const processTableData = (data) => {
        setTableData(data?.alert_data || []);
    };

    useEffect(() => { //POLLING data
        const timer = setInterval(()=>{
            setTime(new Date().getTime());
        }, 1000 * pollingTime);
        return () => clearInterval(timer);
    }, []);

    const fetchTableData = () => {
        if (
            selectedStock &&
            selectedStock.name !== undefined &&
            selectedStock.sources &&
            selectedStock.sources[0] !== undefined
        ) {
            let url = `stocks/table_alert_data/${
                pagination.currentPage || 1
            }?source=${
                selectedStock.sources[0]
            }&category=${selectedCategory}&per_page=${pagination.pageSize}`;

            if (symbolFilter && symbolFilter.length) {
                url += `&symbol=${symbolFilter.map((m) => m.name).join(",")}`;
            }
            if (timeFilter && timeFilter.length) {
                url += `&interval=${timeFilter.map((m) => m.name).join(",")}`;
            }
            if (startDate && startDate.length > 1 && startDate[0] && startDate[1]) {
                url += `&start_date=${startDate[0]}&end_date=${startDate[1]}`;
            }
            if (filterPattern && filterPattern.length) {
                url += `&pattern=${filterPattern?.map((m) => m.be_pattern).join(",")}`;
            }
            getAllStocks(url, "get").then((res) => {
                // eslint-disable-next-line array-callback-return
                let data = res?.data?.data;
                processTableData(data);
                if(!(filterPattern && filterPattern.length)){
                    setPatterns(data?.fe_dropdown_column || []) //used for dropdown
                }
                setPatternColumns(data?.columns || []); //columns
                setPagination({
                    ...pagination,
                    currentPage: data?.page,
                    total_count: data?.total_count,
                    total_pages: data?.total_pages,
                });
            });
        }
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 38) {
            hanldeSelectedTime(selectedTime);
            setGraphConfigs({...graphConfigs, stock: {
                description: "",
                name: tableData[selectedStockIndex - 1].stock_symbol,
                sectorName: "",
                sources: [
                    selectedStock &&
                        selectedStock.sources &&
                        selectedStock.sources.length &&
                        selectedStock.sources[0],
                ],
            }})
            setSelectStockIndex(selectedStockIndex - 1);
            placeSelectedItemInTheMiddle(selectedStockIndex - 1);
        } else if (e.keyCode === 40) {
            hanldeSelectedTime(selectedTime);
            setGraphConfigs({...graphConfigs, stock: {
                description: "",
                name: tableData[selectedStockIndex + 1] && tableData[selectedStockIndex + 1].stock_symbol,
                sectorName: "",
                sources: [
                    selectedStock &&
                        selectedStock.sources &&
                        selectedStock.sources.length &&
                        selectedStock.sources[0],
                ],
            }})
            setSelectStockIndex(selectedStockIndex + 1);
            placeSelectedItemInTheMiddle(selectedStockIndex + 1);
        }
    };

    const handleChange = (event, value) => {
        setPagination({
            ...pagination,
            currentPage: value,
        });
    };
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("Symbol");

    const createSortHandler = (property) => (event) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);

        setTableData(
            stableSort(
                tableData?.map((m) => {
                    let obj = {};
                    selectedStrategy.forEach((s, i) => {
                        let t = strategiesData?.[i]?.data?.[m.name]?.time;
                        obj[s] = t ? new Date(t) : null;
                    });

                    return {
                        ...m,
                        Symbol: m.stock_symbol,
                        Interval: m.interval,
                        ...obj,
                    };
                }),
                getComparator(
                    isAsc ? "desc" : "asc",
                    property,
                    selectedStrategy
                )
            )
        );
    };
    return (
        <div onKeyDown={handleKeyDown}>
            <TableContainer
                sx={{
                    maxHeight: height - 20 - 25,
                    margin: "10px 0px",
                    overflowX: "auto",
                }}
            >
                <Table
                    sx={{ minWidth: "300px" }}
                    ref={scrollableListRef}
                    stickyHeader
                    aria-label="sticky table"
                >
                    <TableHead>
                        <TableRow>
                            {[
                                ...filtersColumns,
                                ...patternColumns.map((col) => {
                                    return { label: col, numeric: false };
                                }),
                            ].map((column, index) => (
                                <TableCell
                                    key={"key column"+column?.label + index}
                                    align={column.numeric ? "center" : "center"}
                                    sortDirection={
                                        orderBy === column.label ? order : false
                                    }
                                    style={{ padding:"16px 0px !important" }}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.label}
                                        direction={
                                            orderBy === column.label
                                                ? order
                                                : "asc"
                                        }
                                        onClick={createSortHandler(
                                            column.label
                                        )}
                                    >
                                        {column.label}
                                        {orderBy === column.id ? (
                                            <Box
                                                component="span"
                                                sx={visuallyHidden}
                                            >
                                                {order === "desc"
                                                    ? "sorted descending"
                                                    : "sorted ascending"}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData?.map((row, index) => {
                            return (
                                <TableRow
                                    key={'row'+row?.stock_symbol +index+ Date.now()}
                                    className={
                                        selectedStockIndex === index
                                            ? "selectedRowStyle"
                                            : ""
                                    }
                                    active={(
                                        selectedStockIndex === index
                                    ).toString()}
                                    onClick={() => {
                                        setGraphConfigs({
                                            time: getTimeObject(row?.interval),
                                            stock: {
                                                description: "",
                                                name: row.stock_symbol.replace("/", ''),
                                                sectorName: "",
                                                sources: [
                                                    selectedStock &&
                                                        selectedStock.sources &&
                                                        selectedStock.sources
                                                            .length &&
                                                        selectedStock.sources[0],
                                                ],
                                            },
                                            pattern: null,
                                            template: T0
                                        })
                                        placeSelectedItemInTheMiddle(index);
                                        setSelectStockIndex(index);
                                        setSelectedTriggerFromPanel(row);
                                        setSelectedColumnIndex(null)
                                    }}
                                    focus={(
                                        selectedStockIndex === index
                                    ).toString()}
                                >
                                    <TableCell
                                        sx={{ width: "100px" }}
                                        align={"center"}
                                    >
                                        {row?.stock_symbol}
                                    </TableCell>
                                    <TableCell align={"center"}>
                                        {row?.interval}
                                    </TableCell>
                                    <TableCell align={"center"}>
                                        {row.date}
                                    </TableCell>
                                    {patternColumns.map((col, col_index) => {
                                        console.log("col", col)
                                        return row.pattern_dict[col]?.join(", ")
                                            ?.length ? (
                                            <TableCell
                                                key={col+col_index}
                                                align={"center"}
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    let pObj = patterns.find(p=>p.name === col)
                                                    let template = templates.find(t=>t.name===(pObj?.template || "T0"))
                                                    placeSelectedItemInTheMiddle(index);
                                                    setSelectStockIndex(index);
                                                    setSelectedColumnIndex(col_index)
                                                    setGraphConfigs({
                                                        time: getTimeObject(row?.interval),
                                                        stock: {
                                                            description: "",
                                                            name: row.stock_symbol.replace("/", ''),
                                                            sectorName: "",
                                                            sources: [
                                                                selectedStock &&
                                                                    selectedStock.sources &&
                                                                    selectedStock.sources
                                                                        .length &&
                                                                    selectedStock.sources[0],
                                                            ],
                                                        },
                                                        pattern: pObj.pattern,
                                                        template: template
                                                    })
                                                }}
                                                className={`button-like ${(selectedStockIndex === index && col_index === selectedColumnIndex) ?'selectedColumnStyle':''}`}
                                                style={{
                                                    cursor: "pointer",
                                                    transition:
                                                        "background-color 0.3s",
                                                    backgroundColor:  selectedColumnIndex === col_index
                                                    ? "beige !important"
                                                    : "red !important"
                                                }}
                                            >
                                                {row.pattern_dict[col].join(
                                                    ", "
                                                ) || "-"}
                                            </TableCell>
                                        ) : (
                                            <TableCell></TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {pagination && (
                    <Pagination
                        style={{
                            display: "flex",
                            margin: "10px",
                            justifyContent: "flex-end",
                        }}
                        count={pagination.total_pages}
                        page={pagination.page}
                        onChange={handleChange}
                    />
                )}
            </TableContainer>
        </div>
    );
};

export default FilterPanelTable;
