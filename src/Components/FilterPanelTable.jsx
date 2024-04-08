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

const FilterPanelTable = ({
    filtersColumns,
    height,
    scrollableListRef,
    selectedStrategy,
    orderBy,
    createSortHandler,
    order,
    placeSelectedItemInTheMiddle,
    selectedStock,
    hanldeSelectedTime,
    handleStockChange,
    setSelectStockIndex,
    selectedTime,
    stocks,
    setStocks,
    strategiesData,
    selectedCategory,
    symbolFilter,
    timeFilter,
}) => {
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
    }, [selectedStock, symbolFilter, timeFilter, pagination.currentPage]);

    const processTableData = (data) => {
        let tableDict = {};
        data.columns.forEach((col) => {
            return data[col].forEach((patterns) => {
                return Object.values(patterns).forEach((pattern) => {
                    let key = `${Object.values(pattern)[0].datetime}-${
                        Object.values(pattern)[0].interval
                    }`;
                    tableDict[key] = {
                        ...Object.values(pattern)[0],
                        [col]: [
                            ...((tableDict[key] || {})[col] || []),
                            Object.keys(pattern)[0],
                        ],
                    };
                });
            });
        });
        setTableData([...Object.values(tableDict)]);
    };

    const fetchTableData = () => {
        if (
            selectedStock &&
            selectedStock.name !== undefined &&
            selectedStock.sources &&
            selectedStock.sources[0] !== undefined
        ) {
            // let url =
            //     "stocks/table_alert_data/1?source=oanda&per_page=20&symbol=NZD/USD,XCU/USD&category=OANDA";
            let url = `stocks/table_alert_data/${pagination.currentPage}?source=${selectedStock.sources[0]}&category=${selectedCategory}&per_page=${pagination.pageSize}`;
            if (symbolFilter && symbolFilter.length) {
                url += `&symbol=${symbolFilter.map((m) => m.name).join(",")}`;
            }
            if (timeFilter && timeFilter.length) {
                url += `&interval=${timeFilter.map((m) => m.name).join(",")}`;
            }
            if (true) {
                url += `&start_date=04/04/2024, 21:20:00&end_date=04/08/2024, 21:40:00`;
            }
            getAllStocks(
                url, // `stocks/table_alert_data/1?category=${selectedCategory}&symbol=${selectedStock.name}&source=${selectedStock.sources[0]}&interval=${selectedTime.name}`,
                "get"
            ).then((res) => {
                // eslint-disable-next-line array-callback-return
                console.log("res", res?.data.data);
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
    const handleChange = (event, value) => {
        setPagination({
            ...pagination,
            currentPage: value,
        });
    };
    return (
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
                                key={index}
                                align={column.numeric ? "center" : "center"}
                                sortDirection={
                                    orderBy === column.label ? order : false
                                }
                            >
                                <TableSortLabel
                                    active={orderBy === column.label}
                                    direction={
                                        orderBy === column.label ? order : "asc"
                                    }
                                    onClick={createSortHandler(column.label)}
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
                    {tableData.map((row, index) => {
                        return (
                            <TableRow
                                active={row?.symbol === selectedStock.name}
                                key={index}
                                onClick={() => {
                                    hanldeSelectedTime(
                                        getTimeObject(row?.interval)
                                    );
                                    placeSelectedItemInTheMiddle(index);
                                    handleStockChange({
                                        description: "",
                                        name: selectedStock.name,
                                        sectorName: "",
                                        sources: [
                                            selectedStock &&
                                                selectedStock.sources &&
                                                selectedStock.sources.length &&
                                                selectedStock.sources[0],
                                        ],
                                    });
                                    setSelectStockIndex(index);
                                }}
                                focus={row.symbol === selectedStock.name}
                            >
                                <TableCell
                                    sx={{ width: "100px" }}
                                    align={"center"}
                                >
                                    {row?.symbol}
                                </TableCell>
                                <TableCell align={"center"}>
                                    {row?.interval}
                                </TableCell>
                                <TableCell align={"center"}>
                                    {row.datetime}
                                </TableCell>
                                {patternColumns.map((col) => {
                                    return (
                                        <TableCell align={"center"}>
                                            {(row[col] || []).join(", ")}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {pagination && (
                <Pagination
                    count={pagination.total_pages}
                    page={pagination.page}
                    onChange={handleChange}
                />
            )}
        </TableContainer>
    );
};

export default FilterPanelTable;
