import React from "react";
import Plot from "react-plotly.js";

export const TempChart = () => {
  var trace0 = {
    x: [1, 2, 3],
    y: [4, 5, 6],
    type: "scatter",
    name: "first",
  };

  var trace1 = {
    x: [20, 30, 40],
    y: [50, 60, 70],
    xaxis: "x2",
    yaxis: "y2",
    type: "scatter",
    name: "second",
  };

  var data = [trace0, trace1];

  var layout = {
    title: "My subplots",
    xaxis: { domain: [0, 0.45] },
    xaxis2: { domain: [0.55, 1] },
    yaxis: { domain: [0, 0.9] },
    yaxis2: { anchor: "y2", domain: [0, 0.9] },
  };
  return <Plot data={data} layout={layout} />;
};
