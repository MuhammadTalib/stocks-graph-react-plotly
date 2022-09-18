import { Box, TableSortLabel } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { visuallyHidden } from "@mui/utils";
import React from "react";

import WatchListRow from "./WatchListRow";

const WatchListTable = ({
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
}) => {
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
              { label: "Symbol", numeric: false },
              { label: "Sources", numeric: false },
              { label: "Description", numeric: false },
              { label: "Time", numeric: false },
              ...(strategiesData?.length
                ? strategiesData.map((m) => {
                    return {
                      label: m.name,
                      numeric: false,
                    };
                  })
                : []),
            ].map((column, index) => (
              <TableCell
                sx={{ minWidth: "100px" }}
                key={index}
                align={column.numeric ? "center" : "center"}
                sortDirection={orderBy === column.label ? order : false}
              >
                <TableSortLabel
                  active={orderBy === column.label}
                  direction={orderBy === column.label ? order : "asc"}
                  onClick={createSortHandler(column.label)}
                >
                  {column.label}
                  {orderBy === column.id ? (
                    <Box component="span" sx={visuallyHidden}>
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
          {stocks.map((row, index) => {
            return (
              <WatchListRow
                key={index}
                row={row}
                index={index}
                selectedStock={selectedStock}
                handleStockChange={handleStockChange}
                setSelectStockIndex={setSelectStockIndex}
                selectedTime={selectedTime}
                placeSelectedItemInTheMiddle={placeSelectedItemInTheMiddle}
                setStocks={setStocks}
                stocks={stocks}
                hanldeSelectedTime={hanldeSelectedTime}
                selectedStrategy={selectedStrategy}
                strategiesData={strategiesData}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WatchListTable;
