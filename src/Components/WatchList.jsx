import { Box, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useMemo, useState } from "react";
import { getAllStocks } from "../services/api";
import { times } from "../Utils/utils";
import "../App.css";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

let categories = ["Watch List", "L1", "L2", "L3", "L4"];

const WatchList = ({
  handleStockChange,
  selectedStock,
  stocks,
  setStocks,
  height,
  setSelectStockIndex,
  scrollableListRef,
  placeSelectedItemInTheMiddle,
}) => {
  useEffect(() => {
    console.log("getAllStocks");
    getAllStocks("stocks/available").then((res) => {
      console.log("res", res);
      setStocks(res?.data?.list || []);
      setSelectStockIndex(0);
      handleStockChange(res?.data?.list[0]);
    });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Watch List");
  const [selectedTime, setSelectedTime] = useState("1d");

  const handleKeyDown = (e) => {
    console.log("handleKeyDown");

    const { cursor, result } = this.state;
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && cursor > 0) {
      console.log("up");
    } else if (e.keyCode === 40 && cursor < result.length - 1) {
      console.log("down");
    }
  };

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Symbol");
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    setStocks(
      stableSort(stocks, getComparator(isAsc ? "desc" : "asc", property))
    );
  };
  function descendingComparator(a, b, orderBy) {
    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const stock = useMemo(() => {
    return (
      <Grid container>
        {console.log("logging")}
        <Grid container item md={12} sm={12} xs={12} spacing={2}>
          <Grid item md={5} sm={5} xs={5}>
            <Autocomplete
              onChange={(_, newValue) => {
                setSelectedCategory(newValue);
              }}
              fullWidth
              id="free-solo-2-demo"
              disableClearable={true}
              options={categories}
              value={selectedCategory}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categrories"
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>
          <Grid item md={3} sm={3} xs={3}>
            <Autocomplete
              onChange={(_, newValue) => {
                setSelectedTime(newValue);
              }}
              fullWidth
              disableClearable={true}
              getOptionLabel={(option) => (option?.name ? option?.name : "1d")}
              options={times}
              value={selectedTime}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Time"
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>
          <Grid item md={4} sm={4} xs={4}>
            <Autocomplete
              fullWidth
              options={[]}
              defaultValue={times.find((v) => v[0])}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Strategies"
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          <div onKeyPress={handleKeyDown}>
            <TableContainer sx={{ maxHeight: height - 20, margin: "10px 0px" }}>
              <Table
                ref={scrollableListRef}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    {[
                      { label: "Symbol", numeric: false },
                      { label: "Time", numeric: false },
                    ].map((column, index) => (
                      <TableCell
                        key={index}
                        align={column.numeric ? "right" : "left"}
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
                      // <TableCell key={index}>{column}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stocks.slice(0, 60).map((row, index) => {
                    return (
                      <RenderRow
                        key={index}
                        row={row}
                        index={index}
                        selectedStock={selectedStock}
                        handleStockChange={handleStockChange}
                        setSelectStockIndex={setSelectStockIndex}
                        selectedTime={selectedTime}
                        placeSelectedItemInTheMiddle={
                          placeSelectedItemInTheMiddle
                        }
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    );
  }, [stocks, selectedStock, order, orderBy]);

  return stock;
};

export default WatchList;

const RenderRow = ({
  row,
  index,
  selectedStock,
  handleStockChange,
  selectedTime,
  placeSelectedItemInTheMiddle,
  setSelectStockIndex,
}) => {
  return (
    <TableRow
      className={row === selectedStock ? "selectedRowStyle" : ""}
      active={row === selectedStock}
      key={index}
      onClick={() => {
        placeSelectedItemInTheMiddle(index);
        handleStockChange(row);
        setSelectStockIndex(index);
      }}
      focus={row === selectedStock}
    >
      <TableCell>{row}</TableCell>
      <TableCell>{selectedTime}</TableCell>
    </TableRow>
  );
};
