import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Box, Checkbox, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "../App.css";
import { getAllStocks } from "../services/api";
import { strategies, times } from "../Utils/defaults";
import { getComparator, stableSort } from "../Utils/sorting";
import WatchListRow from "./WatchListRow";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const WatchList = ({
  handleStockChange,
  selectedStock,
  stocks,
  setStocks,
  height,
  scrollableListRef,
  placeSelectedItemInTheMiddle,
  selectedCategory,
  setSelectedCategory,
  hanldeSelectedTime,
  setLayout,
  layout,
  setSidebarWidth,
  sidebarWidth,
  enableDualChart,
}) => {
  const [categories, setCategories] = useState([]);
  const [selectedStockIndex, setSelectStockIndex] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const [selectedTime, setSelectedTime] = useState({
    name: "1d",
    ms: 86400000,
  });

  const handleKeyDown = (e) => {
    if (e.keyCode === 38) {
      hanldeSelectedTime(selectedTime);
      handleStockChange(stocks[selectedStockIndex - 1]);
      setSelectStockIndex(selectedStockIndex - 1);
      placeSelectedItemInTheMiddle(selectedStockIndex - 1);
    } else if (e.keyCode === 40) {
      hanldeSelectedTime(selectedTime);
      handleStockChange(stocks[selectedStockIndex + 1]);
      setSelectStockIndex(selectedStockIndex + 1);
      placeSelectedItemInTheMiddle(selectedStockIndex + 1);
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

  const stock = useMemo(() => {
    return (
      <Grid container>
        <Grid container item md={12} sm={12} xs={12} spacing={2}>
          <Grid item md={3} sm={3} xs={3}>
            <Autocomplete
              blurOnSelect
              onChange={(_, newValue) => {
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
          <Grid item md={2} sm={2} xs={2}>
            <Autocomplete
              blurOnSelect
              onChange={(_, newValue) => {
                setSelectedTime(newValue);
                hanldeSelectedTime(newValue);
              }}
              fullWidth
              disableClearable={true}
              getOptionLabel={(option) => {
                return option ? option?.name : null;
              }}
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
          <Grid item md={7} sm={7} xs={7}>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              limitTags={1}
              size="small"
              options={strategies}
              onChange={(e, v) => {
                setSelectedStrategy(v);
              }}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Strategies"
                  placeholder="Strategies"
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          <div onKeyPress={handleKeyDown}>
            <TableContainer
              sx={{
                maxHeight: height - 20,

                margin: "10px 0px",
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
                      { label: "Time", numeric: false },
                      ...selectedStrategy.map((m) => {
                        return {
                          label: m.name,
                          numeric: true,
                        };
                      }),
                    ].map((column, index) => (
                      <TableCell
                        // sx={{ width: 100, minWidth: "100px" }}
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
                        placeSelectedItemInTheMiddle={
                          placeSelectedItemInTheMiddle
                        }
                        setStocks={setStocks}
                        stocks={stocks}
                        hanldeSelectedTime={hanldeSelectedTime}
                        selectedStrategy={selectedStrategy}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    stocks,
    selectedStock,
    order,
    orderBy,
    selectedCategory,
    categories,
    stocks,
    selectedTime,
    selectedStrategy,
  ]);

  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        let w =
          window.innerWidth -
          (sidebarRef.current.getBoundingClientRect().right -
            mouseMoveEvent.clientX) -
          10;

        if (enableDualChart) {
          w = w / 2;
        }

        setLayout({
          ...layout,
          width: w,
          height: window.innerHeight - 80,
        });
        setSidebarWidth(
          sidebarRef.current.getBoundingClientRect().right -
            mouseMoveEvent.clientX
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [layout, enableDualChart, isResizing]
  );

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);
  const startResizing = React.useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div
      onKeyDown={handleKeyDown}
      ref={sidebarRef}
      className="app-sidebar"
      style={{ width: sidebarWidth + "px" }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="app-sidebar-resizer" onMouseDown={startResizing} />
      <div className="app-sidebar-content"> {stock} </div>
    </div>
  );
};

export default WatchList;
