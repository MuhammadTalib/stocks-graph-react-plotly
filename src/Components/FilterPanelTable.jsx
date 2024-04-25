import { Box, TableSortLabel } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { visuallyHidden } from "@mui/utils";
import React, { useEffect, useState } from "react";
import { getAllStocks } from "../services/api";
import { getTimeObject } from "../Utils/utils";
import Pagination from "@mui/material/Pagination";
import { getComparator, stableSort } from "../Utils/sorting";

const FilterPanelTable = ({
    height,
    scrollableListRef,
    selectedStrategy,
    placeSelectedItemInTheMiddle,
    selectedStock,
    hanldeSelectedTime,
    handleStockChange,
    selectedTime,
    strategiesData,
    selectedCategory,
    symbolFilter,
    timeFilter,
    setSelectStockIndex,
    selectedStockIndex,
    startDate,
    endDate,
    filterPattern,
    setSelectedTriggerFromPanel,
}) => {
    const filtersColumns = [
        { label: "Symbol", numeric: false, type: "string" },
        { label: "Interval", numeric: false, type: "string" },
        {
            label: "Closing Session Time / Date",
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

    useEffect(() => {
        fetchTableData();
    }, [symbolFilter, timeFilter, pagination.currentPage, startDate, endDate, filterPattern]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    const processTableData = (data) => {
        setTableData(data?.alert_data || []);
    };

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
            if (startDate && endDate) {
                url += `&start_date=${startDate}&end_date=${endDate}`;
            }
            if (filterPattern && filterPattern.length) {
                url += `&pattern=${filterPattern?.map((m) => m.key).join(",")}`;
            }
            getAllStocks(url, "get").then((res) => {
                // eslint-disable-next-line array-callback-return
                let data = res?.data?.data;
                processTableData(data);
                setPatternColumns(data?.columns || []);
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
            handleStockChange({
                description: "",
                name: tableData[selectedStockIndex - 1].symbol,
                sectorName: "",
                sources: [
                    selectedStock &&
                        selectedStock.sources &&
                        selectedStock.sources.length &&
                        selectedStock.sources[0],
                ],
            });
            setSelectStockIndex(selectedStockIndex - 1);
            placeSelectedItemInTheMiddle(selectedStockIndex - 1);
        } else if (e.keyCode === 40) {
            hanldeSelectedTime(selectedTime);
            handleStockChange({
                description: "",
                name: tableData[selectedStockIndex - 1].symbol,
                sectorName: "",
                sources: [
                    selectedStock &&
                        selectedStock.sources &&
                        selectedStock.sources.length &&
                        selectedStock.sources[0],
                ],
            });
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
                                    key={column?.label + index}
                                    align={column.numeric ? "center" : "center"}
                                    sortDirection={
                                        orderBy === column.label ? order : false
                                    }
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
                                    className={
                                        selectedStockIndex === index
                                            ? "selectedRowStyle"
                                            : ""
                                    }
                                    key={row?.symbol + index}
                                    active={(
                                        selectedStockIndex === index
                                    ).toString()}
                                    onClick={() => {
                                        hanldeSelectedTime(
                                            getTimeObject(row?.interval)
                                        );
                                        placeSelectedItemInTheMiddle(index);
                                        handleStockChange({
                                            description: "",
                                            name: row.stock_symbol,
                                            sectorName: "",
                                            sources: [
                                                selectedStock &&
                                                    selectedStock.sources &&
                                                    selectedStock.sources
                                                        .length &&
                                                    selectedStock.sources[0],
                                            ],
                                        });
                                        setSelectStockIndex(index);
                                        setSelectedTriggerFromPanel(row)
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
                                    {patternColumns.map((col, index) => {
                                        return row.pattern_dict[col].join(", ")
                                            ?.length ? (
                                            <TableCell
                                                key={index}
                                                align={"center"}
                                              
                                                className="button-like"
                                                style={{
                                                    cursor: "pointer",
                                                    transition:
                                                        "background-color 0.3s",
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
