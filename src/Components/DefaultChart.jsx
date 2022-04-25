import React, { useEffect, useState } from "react";
import { dummy } from "../Utils/defaults";
import {
  drawConfirmHighAndLow,
  drawMergedChart,
  drawPatternData,
  drawSeparateChart,
  getDataRequestService,
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
  layout,
  toggleFirstDayLine,
  switchToggle,
  selectedTemp,
  selectedPattern,
  type,
  onDoubleClick,
  selectedStock,
  selectedTime,
  selectedCategory,
  id,
  setLayout,
}) {
  const [data, setGraphData] = useState({ ...dummy });
  const [currentSelectedTemp, setCurrentSelectedTemp] = useState(selectedTemp);

  useEffect(() => {
    setCurrentSelectedTemp(selectedTemp);
  }, [selectedTemp]);

  const [loader, setLoader] = useState(false);
  const getDataRequest = getDataRequestService(
    selectedCategory,
    setLoader,
    layout,
    setCurrentSelectedTemp,
    setGraphData,
    setLayout,
    graphType
  );

  useEffect(() => {
    getDataRequest(
      selectedStock,
      selectedTime,
      currentSelectedTemp,
      selectedPattern,
      switchToggle
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedStock,
    selectedTime,
    selectedCategory,
    selectedPattern,
    switchToggle,
    currentSelectedTemp.id,
    graphType,
  ]);

  return data && data?.x?.length ? (
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
          ...drawMergedChart(currentSelectedTemp, data, pointIndex, graphType), //templates T1 , T2 , T3
          ...drawConfirmHighAndLow(switchToggle, data, pointIndex), //0 1 2 3
          ...drawPatternData(data, selectedPattern), //
        ]}
        separateGraphs={[
          ...drawSeparateChart(
            currentSelectedTemp,
            data,
            pointIndex,
            graphType
          ),
        ]}
        loader={loader}
      />
    </>
  ) : (
    <></>
  );
}
