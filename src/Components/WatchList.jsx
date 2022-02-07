import { Grid, TextField } from "@mui/material";
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

let categories = ["Watch List", "L1", "L2", "L3", "L4"];

const WatchList = ({ handleStockChange, selectedStock }) => {
  let [stocks, setStocks] = useState([]);

  useEffect(() => {
    console.log("getAllStocks");
    getAllStocks("stocks/available").then((res) => {
      console.log("res", res);
      setStocks(res?.data?.list || []);
    });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Watch List");
  const [selectedTime, setSelectedTime] = useState("1d");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [timeanchorEl, setTimeanchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const openTime = Boolean(timeanchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleTimeClick = (event) => {
    setTimeanchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleTimeClose = () => {
    setTimeanchorEl(null);
  };
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
          {/* <Grid item md={2} sm={2} xs={2}>
          <Autocomplete
            onChange={(_, newValue) => {
              setSelectedTime(newValue);
            }}
            fullWidth
            disableClearable={true}
            getOptionLabel={(option) => option?.name}
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
        </Grid> */}
          <Grid item md={5} sm={5} xs={5}>
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
          <Grid item md={6} sm={6} xs={6}>
            <Autocomplete
              onChange={(_, newValue) => {
                handleStockChange(newValue);
              }}
              fullWidth
              id="free-solo-2-demo"
              disableClearable={true}
              options={stocks}
              getOptionLabel={(option) => option}
              value={selectedStock}
              defaultValue={stocks.find((v) => v[0])}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Stock"
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
          <div>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {["Symbol", "Time"].map((column, index) => (
                      <TableCell key={index}>{column}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stocks.map((row, index) => {
                    return (
                      <TableRow
                        className={
                          row === selectedStock ? "selectedRowStyle" : ""
                        }
                        hover
                        key={index}
                        onClick={() => {
                          handleStockChange(row);
                        }}
                      >
                        <TableCell>{row}</TableCell>
                        <TableCell>{selectedTime}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    );
  }, [stocks, selectedStock]);

  return stock;
};

export default WatchList;
