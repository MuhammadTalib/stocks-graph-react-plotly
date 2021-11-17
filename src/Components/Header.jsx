import BarChartIcon from "@mui/icons-material/BarChart";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";

const Header = ({
  handleGrapthType,
  graphType,
  templateChange,
  templatesOptions,
  data,
}) => {
  return (
    <div>
      <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={() => handleGrapthType("candlestick")}>
          <WaterfallChartIcon
            color={graphType === "candlestick" ? "primary" : "action"}
          />
        </Button>
        <Button onClick={() => handleGrapthType("ohlc")}>
          <BarChartIcon color={graphType !== "ohlc" ? "primary" : "action"} />
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="text" aria-label="text button group">
        {templatesOptions(data).map((m) => (
          <Button onClick={() => templateChange(m)}>{m.name}</Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default Header;
