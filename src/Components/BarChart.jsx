import React from "react";
import Plot from "react-plotly.js";

export const BarChart = ({ data, layout, templates }) => {
  var xData = data.x;

  let top = data.high.map((m, index) => {
    return m - data.low[index];
  });

  var trace1 = {
    x: xData,
    y: data.low,
    type: "bar",
    marker: {
      color: "rgba(1,1,1,0.0)",
    },
    xaxis: "x1",
    yaxis: "y1",
  };

  var trace2 = {
    x: xData,
    y: top,
    type: "bar",
    marker: {
      width: 60,
      color: "rgba(55,128,191,0.7)",
      line: {
        color: "rgba(55,128,191,1.0)",
      },
    },
    xaxis: "x1",
    yaxis: "y1",
  };

  return (
    <Plot
      useResizeHandler={true}
      style={{ width: "100%", height: "100%" }}
      data={[trace1, trace2, ...(templates || [])]}
      layout={layout}
    />
  );
};
