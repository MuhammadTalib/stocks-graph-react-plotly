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
}) => {
  return (
    <div>
      <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={() => handleGrapthType(1)}>
          <WaterfallChartIcon color={graphType === 1 ? "primary" : "action"} />
        </Button>
        <Button onClick={() => handleGrapthType(2)}>
          <BarChartIcon color={graphType !== 1 ? "primary" : "action"} />
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="text" aria-label="text button group">
        {templatesOptions.map((m) => (
          <Button onClick={() => templateChange(m)}>{m.name}</Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default Header;
