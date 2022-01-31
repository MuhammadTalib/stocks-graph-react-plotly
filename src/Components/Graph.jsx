import * as Plotly from "plotly.js";
import React, { useEffect, useState } from "react";
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
  let [bottomTemplate, setBottomTemplates] = useState([]);
  useEffect(() => {
    let temp = [];
    separateGraphs?.length &&
      separateGraphs.forEach((spG) => {
        temp.push(spG);
        spG?.templates?.length &&
          spG.templates?.forEach((t) => {
            temp.push(t);
          });
      });
    setBottomTemplates(temp);
  }, [separateGraphs]);
  if (loader) {
    return <div className="loadingLabel">Loading...</div>;
  } else
    return (
      <Plot
        onHover={onHover}
        data={[
          data,
          ...(templates || []),
          ...bottomTemplate,
          // ...(separateGraphs?.length ? separateGraphs : []),
        ]}
        layout={layout}
      />
    );
};
