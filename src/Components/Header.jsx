import { FormControlLabel, Grid, Switch } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React, { useEffect, useState } from "react";
import "../App.css";
import { getAllStocks } from "../services/api";
import { templates, times } from "../Utils/defaults";
import { BAR_ICON, OHLC_ICON } from "../Utils/utils";
import AutocompleteWrapper from "./AutocompleteWrapper";

const Header = ({
  handleGrapthType,
  graphType,
  templateChange,
  setEnableDualChart,
  enableDualChart,
  handlePatternChange,
  selectedTime,
  hanldeSelectedTime,
  selectedTemp,
  selectedPattern,
  handlSwitchToggle,
  switchToggle,
  toggleFirstDayLine,
  setToggleFirstDayLine,
  selectedStock,
}) => {
  let [patterns, setPatterns] = useState([]);

  useEffect(() => {
    getAllStocks("stocks/patterns").then((res) => {
      console.log("res", res);
      setPatterns(res?.data?.list || []);
    });
  }, []);

  return (
    <Grid container spacing={2} style={{ position: "fixed", padding: "10px" }}>
      <Grid item md={2} sm={6} xs={12}>
        <AutocompleteWrapper
          options={patterns}
          value={selectedPattern}
          label={"Pattern"}
          handleChange={handlePatternChange}
          selectedStock={selectedStock}
        />
      </Grid>
      <Grid item md={1} sm={6} xs={12}>
        <FormControlLabel
          control={
            <Switch
              disabled={selectedTime.name !== "1d"}
              checked={toggleFirstDayLine}
              onChange={(e) => {
                setToggleFirstDayLine(e.target.checked);
              }}
            />
          }
          label="1st"
        />
      </Grid>
      <Grid item md={1} sm={2} xs={3}>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button
            className={`btn ${graphType !== "ohlc" ? "templateBtn" : ""}`}
            onClick={() => handleGrapthType("candlestick")}
          >
            {OHLC_ICON()}
          </Button>
          <Button
            className={`btn ${graphType === "ohlc" ? "templateBtn" : ""}`}
            onClick={() => handleGrapthType("ohlc")}
          >
            {BAR_ICON()}
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item md={2}>
        <AutocompleteWrapper
          options={[0, 1, 2, 3, 4]}
          value={switchToggle}
          label={"MT4"}
          handleChange={handlSwitchToggle}
          selectedStock={selectedStock}
        />
      </Grid>
      <Grid item xs={2}>
        <AutocompleteWrapper
          options={times}
          value={selectedTime}
          label={"Time"}
          handleChange={hanldeSelectedTime}
          selectedStock={selectedStock}
          getOptionLabel={(option) => {
            return option ? option?.name : null;
          }}
        />
      </Grid>
      <Grid item md={4} xs={4}>
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
          <Button
            onClick={() => {
              setEnableDualChart(!enableDualChart);
              document.querySelector('[data-title="Autoscale"]')?.click();
            }}
            className={`btn ${enableDualChart ? "templateBtn" : ""}`}
          >
            Dual Chart
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Header;
