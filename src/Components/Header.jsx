import {
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import { getAllStocks } from "../services/api";
import { templates, times } from "../Utils/defaults";

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
  useEffect(() => {
    setOpenPatternDropdown(false);
  }, [selectedStock]);
  let patternRef = useRef(null);
  let [patterns, setPatterns] = useState([]);
  const [openPatternDropdown, setOpenPatternDropdown] = useState(false);

  useEffect(() => {
    getAllStocks("stocks/patterns").then((res) => {
      console.log("res", res);
      setPatterns(res?.data?.list || []);
    });
  }, []);
  const CustomPaper = (props) => {
    return <Paper elevation={8} {...props} />;
  };
  const handleKeyDown = (e) => {
    console.log("e", e);
    if (e.keyCode === 38) {
      setOpenPatternDropdown(false);
    } else if (e.keyCode === 40) {
      setOpenPatternDropdown(false);
    }
  };
  return (
    <Grid
      ref={patternRef}
      container
      spacing={2}
      style={{ position: "fixed", padding: "10px" }}
    >
      <Grid
        item
        md={2}
        sm={6}
        xs={12}
        onMouseLeave={() => {
          setOpenPatternDropdown(false);
        }}
      >
        <Autocomplete
          onKeyPress={handleKeyDown}
          selectOnFocus={false}
          blurOnSelect={"touch"}
          onChange={(_, newValue) => {
            handlePatternChange(newValue);
          }}
          fullWidth
          id="free-solo-2-demo"
          open={openPatternDropdown}
          onBlur={() => {
            setOpenPatternDropdown(false);
          }}
          disableClearable={true}
          options={[...patterns]}
          onMouseLeave={() => {
            patternRef.current.click();
          }}
          onClose={() => {
            console.log("aytr");
          }}
          onKeyDown={() => {
            setOpenPatternDropdown(true);
          }}
          onClick={() => {
            setOpenPatternDropdown(true);
          }}
          value={selectedPattern}
          defaultValue={patterns.find((v) => v[0])}
          PaperComponent={CustomPaper}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Pattern"
              variant="standard"
              onClick={() => {
                setOpenPatternDropdown(!openPatternDropdown);
              }}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 28 28"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M17 11v6h3v-6h-3zm-.5-1h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5z"></path>
              <path d="M18 7h1v3.5h-1zm0 10.5h1V21h-1z"></path>
              <path d="M9 8v12h3V8H9zm-.5-1h4a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5z"></path>
              <path d="M10 4h1v3.5h-1zm0 16.5h1V24h-1z"></path>
            </svg>
          </Button>
          <Button
            className={`btn ${graphType === "ohlc" ? "templateBtn" : ""}`}
            onClick={() => handleGrapthType("ohlc")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 28 28"
              width="24"
              height="24"
            >
              <g fill="none" stroke="currentColor" stroke-linecap="square">
                <path d="M10.5 7.5v15M7.5 20.5H10M13.5 11.5H11M19.5 6.5v15M16.5 9.5H19M22.5 16.5H20"></path>
              </g>
            </svg>
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item md={2}>
        <ButtonGroup variant="text" aria-label="text button group">
          {[0, 1, 2, 3, 4].map((t, i) => (
            <Button
              key={i}
              onClick={() => handlSwitchToggle(t)}
              className={`btn ${switchToggle === t ? "templateBtn" : ""}`}
            >
              {t}
            </Button>
          ))}
        </ButtonGroup>
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
            onClick={() => setEnableDualChart(!enableDualChart)}
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
