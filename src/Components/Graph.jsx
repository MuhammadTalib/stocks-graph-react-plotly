import * as Plotly from "plotly.js";
import React from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import "../App.css";

const Plot = createPlotlyComponent(Plotly);

export const Graph = ({
  style,
  data,
  layout,
  templates,
  loader,
  onHover,
  separateGraphs,
}) => {
  if (loader) {
    return <div className="loadingLabel">Loading...</div>;
  } else
    return (
      <Plot
        onHover={onHover}
        data={[
          data,
          ...(templates || []),
          ...(separateGraphs?.length ? separateGraphs : []),
        ]}
        layout={layout}
      />
    );
};
