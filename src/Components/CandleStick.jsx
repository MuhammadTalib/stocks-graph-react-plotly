import * as Plotly from "plotly.js";
import React from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import "../App.css";

const Plot = createPlotlyComponent(Plotly);

export const CandleStick = ({ style, data, layout, templates }) => {
  return (
    <Plot style={style} data={[data, ...(templates || [])]} layout={layout} />
  );
};
