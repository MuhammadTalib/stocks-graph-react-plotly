import React from "react";
import {
  drawConfirmHighAndLow,
  drawMergedChart,
  drawPatternData,
  drawSeparateChart,
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
  id,
}) {
  return (
    <>
      <InfoLines
        selectedStock={selectedStock}
        ohlc={{
          high: data.high[pointIndex],
          low: data.low[pointIndex],
          open: data.open[pointIndex],
          close: data.close[pointIndex],
          pattern: data.patternData[pointIndex],
          ConfrimHigh: data?.ConfrimHigh[pointIndex],
          ConfrimLow: data?.ConfrimLow[pointIndex],
        }}
        selectedPattern={selectedPattern}
      />
      <Graph
        id={id}
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
          ...drawConfirmHighAndLow(switchToggle, data, pointIndex), //0 1 2 3
          ...drawPatternData(data, selectedPattern), //
        ]}
        separateGraphs={[
          ...drawSeparateChart(selectedTemp, data, pointIndex, graphType),
        ]}
        loader={loader}
      />
    </>
  );
}
