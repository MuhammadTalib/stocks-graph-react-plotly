import BarChartIcon from "@mui/icons-material/BarChart";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllStocks } from "../services/api";
import { Grid, TextField } from "@mui/material";
import { times, templates } from "../Utils/utils";
import Switch from "@mui/material/Switch";
import "../App.css";
const Header = ({
  handleGrapthType,
  graphType,
  templateChange,
  templatesOptions,
  data,
  selectedStock,
  handleStockChange,
  handlePatternChange,
  selectedTime,
  hanldeSelectedTime,
  selectedTemp,
  selectedPattern,
  handlSwitchToggle,
  switchToggle,
}) => {
  let [stocks, setStocks] = useState([]);
  let [patterns, setPatterns] = useState([]);

  useEffect(() => {
    getAllStocks("stocks/available").then((res) => {
      console.log("res", res);
      setStocks(res?.data?.list || []);
    });

    getAllStocks("stocks/patterns").then((res) => {
      console.log("res", res);
      setPatterns(res?.data?.list || []);
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
          onChange={(event, newValue) => {
            handleStockChange(newValue);
          }}
          fullWidth
          id="free-solo-2-demo"
          disableClearable={true}
          options={stocks}
          onClose={() => {
            console.log("aytr");
          }}
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
      </Grid>{" "}
      <Grid item xs={2}>
        <Autocomplete
          onChange={(event, newValue) => {
            handlePatternChange(newValue);
          }}
          fullWidth
          id="free-solo-2-demo"
          disableClearable={true}
          options={[...patterns]}
          onClose={() => {
            console.log("aytr");
          }}
          value={selectedPattern}
          defaultValue={patterns.find((v) => v[0])}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Pattern"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
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
      <Grid item xs={1}>
        <Switch
          checked={switchToggle}
          onClick={(e) => {
            console.log("console.log", e.target.checked);
            handlSwitchToggle(e.target.checked);
          }}
          size="small"
        />
      </Grid>
      <Grid item xs={2}>
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
      <Grid item xs={4}>
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
