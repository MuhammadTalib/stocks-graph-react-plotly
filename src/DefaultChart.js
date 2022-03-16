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
  let width = "100%";
  if (type === "default") {
    width = enableDualChart ? "50%" : "100%";
  }

  if (type === "secondary") {
    width = enableDualChart ? "50%" : "0px";
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
      // templates={[
      //   ...(selectedTemp.merged && Object.keys(selectedTemp.merged).length
      //     ? [
      //         ...Object.keys(selectedTemp.merged).map((key) => {
      //           return {
      //             ...selectedTemp.merged[key],
      //             x: data?.x,
      //             y: selectedTemp.merged[key].data.map((m) => {
      //               if (!m) return null;
      //               else return m;
      //             }),
      //             name: `${selectedTemp.merged[key].name} ${selectedTemp.merged[key].data[pointIndex]}`,
      //           };
      //         }),
      //       ]
      //     : []),
      //   ...(switchToggle
      //     ? [
      //         {
      //           x: data?.x,
      //           y: data?.ConfrimHigh.map((m, i) => {
      //             if (!m) return null;
      //             else return data.high[i];
      //           }),
      //           name: "Confirm High",
      //           mode: "markers",
      //           marker: {
      //             color: "blue",
      //             symbol: "diamond",
      //           },
      //         },
      //       ]
      //     : []),
      //   ...(switchToggle
      //     ? [
      //         {
      //           x: data?.x,
      //           y: data.ConfrimLow.map((m, i) => {
      //             if (!m) return null;
      //             else return data.low[i];
      //           }),
      //           name: "Confirm Low",
      //           mode: "markers",
      //           marker: {
      //             color: "red",
      //             symbol: "diamond",
      //           },
      //         },
      //       ]
      //     : []),
      //   ...(data.patternData?.length
      //     ? [
      //         {
      //           x: data?.x,
      //           y: data.patternData.map((m, i) => {
      //             let perc10 = (data.high[0] / 100) * 1;

      //             if (m) {
      //               return data.close[i] > data.open[i]
      //                 ? data.high[i] - perc10
      //                 : data.high[i] + perc10;
      //             }

      //             return null;
      //           }),
      //           hovertemplate: `${selectedPattern}`,
      //           mode: "text",
      //           type: "scatter",
      //           name: " ",
      //           text: selectedPattern?.slice(0, 2),
      //           textfont: {
      //             family: "Times New Roman",
      //             color: "blue",
      //           },
      //           textposition: "bottom center",
      //           marker: {
      //             size: 12,
      //           },
      //         },
      //       ]
      //     : []),
      // ]}
      separateGraphs={separateGraphs}
      loader={loader}
    />
  );
}
