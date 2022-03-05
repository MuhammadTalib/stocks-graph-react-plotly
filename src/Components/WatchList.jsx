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

const WatchList = ({
  handleStockChange,
  selectedStock,
  stocks,
  setStocks,
  height,
  setSelectStockIndex,
  scrollableListRef,
  placeSelectedItemInTheMiddle,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("getAllStocks");
    getAllStocks("/stocks/watchlish").then((res) => {
      setCategories(res?.data?.list);
    });
  }, []);

  useEffect(() => {
    getAllStocks("stocks/watchlish/" + selectedCategory).then((res) => {
      console.log(res?.data?.list);
      setStocks(res?.data?.list || []);
      setSelectStockIndex(0);
      handleStockChange(res?.data?.list[0]);
    });
  }, [selectedCategory]);

  const [selectedTime, setSelectedTime] = useState("1d");

  const handleKeyDown = (e) => {
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
    if (b.name < a.name) {
      return -1;
    }
    if (b.name > a.name) {
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
              blurOnSelect
              onChange={(_, newValue) => {
                console.log("newValue", newValue);
                setSelectedCategory(newValue);
              }}
              fullWidth
              id="free-solo-2-demo"
              options={categories}
              disableListWrap
              onHighlightChange={() => {}}
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
              blurOnSelect
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
              blurOnSelect
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
                      { label: "Sources", numeric: false },
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
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stocks.map((row, index) => {
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
                        setStocks={setStocks}
                        stocks={stocks}
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
  }, [
    stocks,
    selectedStock,
    order,
    orderBy,
    selectedCategory,
    categories,
    stocks,
  ]);

  return stock;
};

export default WatchList;

const RenderRow = ({
  key,
  row,
  index,
  selectedStock,
  handleStockChange,
  selectedTime,
  placeSelectedItemInTheMiddle,
  setSelectStockIndex,
  setStocks,
  stocks,
}) => {
  return (
    <TableRow
      className={row.name === selectedStock.name ? "selectedRowStyle" : ""}
      active={row.name === selectedStock.name}
      key={index}
      onClick={() => {
        placeSelectedItemInTheMiddle(index);
        handleStockChange(row);
        setSelectStockIndex(index);
      }}
      focus={row.name === selectedStock.name}
    >
      <TableCell>{row.name}</TableCell>
      <TableCell>
        {row?.sources?.length && row.sources[0]}{" "}
        {/* <Autocomplete
          fullWidth
          onKeyDown={() => {
            console.log("onKeyDown");
          }}
          options={row.sources}
          onChange={(e, v) => {
            setStocks(
              stocks.map((m, i) => {
                if (key === i) {
                  return { ...m, selectedSource: v };
                }
                return m;
              })
            );
          }}
          blurOnSelect
          value={row?.selectedSource || row.sources[0]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Source"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        /> */}
      </TableCell>

      <TableCell>{selectedTime}</TableCell>
    </TableRow>
  );
};
