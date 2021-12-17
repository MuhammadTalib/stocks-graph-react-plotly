import BarChartIcon from "@mui/icons-material/BarChart";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllStocks } from "../services/api";
import { Grid, TextField } from "@mui/material";
import { times, templates } from "../Utils/utils";
import "../App.css";
const Header = ({
  handleGrapthType,
  graphType,
  templateChange,
  templatesOptions,
  data,
  selectedStock,
  handleStockChange,
  selectedTime,
  hanldeSelectedTime,
  selectedTemp,
}) => {
  let [stocks, setStocks] = useState([]);

  useEffect(() => {
    getAllStocks("stocks/available").then((res) => {
      console.log("res", res);
      setStocks(res?.data?.list || []);
    });
  }, []);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      alignItems="center"
      textAlign="center"
      style={{ padding: "10px" }}
    >
      <Grid item xs={2}>
        <Autocomplete
          value={selectedStock}
          disableClearable
          // textInputProps={{ clearButtonMode: "hidden" }}
          onChange={(event, newValue) => {
            handleStockChange(newValue);
          }}
          fullWidth
          inputValue={selectedStock}
          options={stocks}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Stock" />
          )}
        />
      </Grid>
      <Grid item xs={1}>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button
            className={`btn ${graphType !== "ohlc" ? "templateBtn" : ""}`}
            onClick={() => handleGrapthType("candlestick")}
          >
            <WaterfallChartIcon />
          </Button>
          <Button
            className={`btn ${graphType === "ohlc" ? "templateBtn" : ""}`}
            onClick={() => handleGrapthType("ohlc")}
          >
            <BarChartIcon />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={4}>
        <ButtonGroup variant="text" aria-label="text button group">
          {times.map((t, i) => (
            <Button
              key={i}
              onClick={() => hanldeSelectedTime(t)}
              className={`btn ${
                selectedTime.name === t.name ? "templateBtn" : ""
              }`}
            >
              {t.name}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>

      <Grid item xs={5}>
        <ButtonGroup variant="text" aria-label="text button group">
          {templates.map((m, i) => (
            <Button
              key={i}
              onClick={() => templateChange(m)}
              className={`btn ${selectedTemp.id === m.id ? "templateBtn" : ""}`}
            >
              {m.name}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Header;
