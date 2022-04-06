import React from "react";
import {
  drawConfirmHighAndLow,
  drawMergedChart,
  drawPatternData,
} from "../Utils/utils";
import { Graph } from "./Graph";
import InfoLines from "./InfoLines";

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
  type,
  onDoubleClick,
  selectedStock,
}) {
  // let width = "100%";
  if (type === "default") {
    // width = enableDualChart ? "50%" : "100%";
  }

  if (type === "secondary") {
    // width = enableDualChart ? "50%" : "0px";
  }

  return (
    <>
      <InfoLines
        selectedStock={selectedStock}
        ohlc={{
          high: data.high[pointIndex],
          low: data.low[pointIndex],
          open: data.open[pointIndex],
          close: data.close[pointIndex],
        }}
        selectedPattern={selectedPattern}
      />
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
          ...drawMergedChart(selectedTemp, data, pointIndex, graphType), //templates T1 , T2 , T3
          ...drawConfirmHighAndLow(switchToggle, data), //0 1 2 3
          ...drawPatternData(data, selectedPattern), //
        ]}
        separateGraphs={separateGraphs}
        loader={loader}
      />
    </>
  );
}
