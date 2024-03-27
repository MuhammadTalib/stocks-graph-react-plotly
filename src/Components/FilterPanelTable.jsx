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
}) => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetchTableData();
    }, [selectedStock]);

    const fetchTableData = () => {
        if (
            selectedStock.name !== undefined &&
            selectedStock.sources &&
            selectedStock.sources[0] !== undefined
        ) {
            getAllStocks(
                `stocks/table_alert_data/1?category=${selectedCategory}&symbol=${selectedStock.name}&source=${selectedStock.sources[0]}&interval=${selectedTime.name}`,
                "get"
            ).then((data) => {
                console.log("data", data);
                // eslint-disable-next-line array-callback-return
                let dataMap = data?.data?.data
                    ? Object.values(data?.data?.data).filter((d) => d?.datetime)
                    : [];
                setTableData(dataMap);
            });
        }
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
                            ...(strategiesData?.length
                                ? [
                                      ...new Set(
                                          strategiesData.map(
                                              (item) => item.name
                                          )
                                      ),
                                  ].map((m) => {
                                      return {
                                          label: m,
                                          numeric: false,
                                      };
                                  })
                                : []),
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
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FilterPanelTable;
