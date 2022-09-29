import React, { useEffect, useRef, useState } from "react";

import { dummy } from "../Utils/defaults";
import { drawPatternData, drawPatternTriggers } from "../Utils/patternUtils";
import {
  drawConfirmHighAndLow,
  drawMergedChart,
  drawSeparateChart,
  getDataRequestService,
  getOccuredReversalPatterns,
} from "../Utils/utils";
import { Graph } from "./Graph";
import InfoLines from "./InfoLines";

export function DefaultChart({
  onHover,
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
  selectedStrategy,
  enableDualChart,
  sidebarWidth,
  dualChartWidth,
  dataBaseUrl,
  setStrategiesData,
  strategiesData,
}) {
  const [data, setGraphData] = useState({ ...dummy });
  const [currentSelectedTemp, setCurrentSelectedTemp] = useState(selectedTemp);

  useEffect(() => {
    setCurrentSelectedTemp(selectedTemp);
  }, [selectedTemp]);

  const [loader, setLoader] = useState(false);
  const prevCountRef = useRef();

  const getDataRequest = getDataRequestService(
    selectedCategory,
    setLoader,
    layout,
    setCurrentSelectedTemp,
    setGraphData,
    setLayout,
    graphType,
    enableDualChart,
    sidebarWidth,
    dataBaseUrl,
    selectedStrategy,
    setStrategiesData,
    strategiesData
  );

  useEffect(() => {
    let addPreviousStrategy = true;
    if (selectedStock !== prevCountRef.current) {
      addPreviousStrategy = false;
    }
    prevCountRef.current = selectedStock;

    selectedTime &&
      getDataRequest(
        selectedStock,
        selectedTime,
        currentSelectedTemp,
        selectedPattern,
        switchToggle,
        data,
        addPreviousStrategy
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
    enableDualChart,
    selectedStrategy,
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
          ConfrimHigh: data?.ConfrimHigh[pointIndex],
          ConfrimLow: data?.ConfrimLow[pointIndex],
        }}
        selectedPattern={
          (data.patternData[pointIndex]
            ? selectedPattern === "All Reversal Patterns" ||
              selectedPattern === "All Failure Patterns" ||
              selectedPattern === "T3 Down" ||
              selectedPattern === "All High/Low Patterns" ||
              data.strategiesData
              ? getOccuredReversalPatterns(data.patternData, pointIndex)
              : selectedPattern
            : undefined) ||
          (data?.patternTrigger[pointIndex]?.trigger_failure
            ? selectedPattern
            : undefined)
        }
        patternTrigger={data?.patternTrigger[pointIndex]?.trigger_failure}
        selectedTime={selectedTime}
        pointIndex={pointIndex}
        data={data}
      />
      <Graph
        id={id}
        onHover={onHover}
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
          ...(drawPatternData(data, selectedPattern, data.strategiesData) ||
            []),
          ...(drawPatternTriggers(data, data.strategiesData) || []),
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
        setLayout={setLayout}
        dualChartWidth={dualChartWidth}
        sidebarWidth={sidebarWidth}
        selectedStrategy={selectedStrategy}
      />
    </>
  ) : (
    <></>
  );
}
