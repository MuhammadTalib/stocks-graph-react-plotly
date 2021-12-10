import * as Plotly from "plotly.js";
import React from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import "../App.css";

const Plot = createPlotlyComponent(Plotly);

export const Graph = ({ style, data, layout, templates, time, loader }) => {
  const config = { responsive: true };
  if (loader) {
    return <div className="loadingLabel">Loading...</div>;
  } else
    return (
      <Plot
        key={time}
        style={style}
        data={[data, ...(templates || [])]}
        layout={layout}
        config={config}
      />
    );
};
