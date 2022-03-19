import React from "react";
import { Graph } from "./Components/Graph";
import {
  drawConfirmHighAndLow,
  drawMergedChart,
  drawPatternData,
} from "./Utils/utils";

export function DefaultChart({
  onHover,
  rightMargin,
  onUnhover,
  onClick,
  pointIndex,
  graphType,
  style,
  data,
  layout,
  toggleFirstDayLine,
  switchToggle,
  selectedTemp,
  selectedPattern,
  separateGraphs,
  loader,
  enableDualChart,
  type,
  onDoubleClick,
}) {
  // let width = "100%";
  if (type === "default") {
    // width = enableDualChart ? "50%" : "100%";
  }

  if (type === "secondary") {
    // width = enableDualChart ? "50%" : "0px";
  }

  return (
    <Graph
      onHover={onHover}
      rightMargin={rightMargin}
      onUnhover={onUnhover}
      onClick={onClick}
      onDoubleClick={() => onDoubleClick(type)}
      style={{ ...style, border: "1px solid red" }}
      data={{ ...data, type: graphType }}
      layout={layout}
      toggleFirstDayLine={toggleFirstDayLine}
      templates={[
        ...drawMergedChart(selectedTemp, data, pointIndex), //templates T1 , T2 , T3
        ...drawConfirmHighAndLow(switchToggle, data), //0 1 2 3
        ...drawPatternData(data, selectedPattern), //
      ]}
      separateGraphs={separateGraphs}
      loader={loader}
    />
  );
}
