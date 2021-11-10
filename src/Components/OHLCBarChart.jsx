import React from "react";
import Plot from "react-plotly.js";

const OHLCBarChart = ({ style, data, layout, templates }) => {
  return (
    <Plot
      style={style}
      data={[{ ...data, type: "ohlc" }, ...(templates || [])]}
      layout={{ ...layout }}
    />
  );
};

export default OHLCBarChart;
