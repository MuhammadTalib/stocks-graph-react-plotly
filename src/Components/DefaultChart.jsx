import axios from "axios";
import React, { useEffect, useState } from "react";
import { dummy } from "../Utils/defaults";
import { drawPatternData } from "../Utils/patternUtils";
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
}) {
  const [data, setGraphData] = useState({ ...dummy });
  const [currentSelectedTemp, setCurrentSelectedTemp] = useState(selectedTemp);
  const [strategiesData, setStrategiesData] = useState(null);

  useEffect(() => {
    setCurrentSelectedTemp(selectedTemp);
  }, [selectedTemp]);

  useEffect(() => {
    async function fetchData() {
      if (selectedStrategy && selectedStrategy.length) {
        let stra = await axios.get(
          `/stocks/${selectedStrategy[0]?.value}?interval=${selectedTime.name}&watch_list=${selectedCategory}&trends_required=true`
        );
        setStrategiesData(stra?.data?.data);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStrategy, selectedCategory, selectedTime]);

  const [loader, setLoader] = useState(false);

  const getDataRequest = getDataRequestService(
    selectedCategory,
    setLoader,
    layout,
    setCurrentSelectedTemp,
    setGraphData,
    setLayout,
    graphType,
    enableDualChart,
    sidebarWidth
  );

  useEffect(() => {
    selectedTime &&
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
          ConfrimHigh: data?.ConfrimHigh[pointIndex],
          ConfrimLow: data?.ConfrimLow[pointIndex],
        }}
        selectedPattern={
          data.patternData[pointIndex]
            ? selectedPattern === "All Reversal Patterns"
              ? getOccuredReversalPatterns(data.patternData, pointIndex)
              : selectedPattern
            : undefined
        }
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
          ...drawPatternData(
            data,
            selectedPattern,
            strategiesData?.[selectedStock.name]
          ), //
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
        strategiesData={strategiesData?.[selectedStock.name]}
        setLayout={setLayout}
      />
    </>
  ) : (
    <></>
  );
}
