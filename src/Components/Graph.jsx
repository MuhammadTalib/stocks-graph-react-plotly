import React, { useEffect, useState } from "react";
import { drawFirstDateLine, drawStrategiesBar } from "../Utils/utils";
import "../App.css";
import Plot from 'react-plotly.js';
import { drawFVGPatterns } from "../Utils/patternUtils";

export const Graph = ({
  data,
  layout,
  templates,
  loader,
  separateGraphs,
  onHover,
  onUnhover,
  onClick,
  toggleFirstDayLine,
  onDoubleClick,
  id,
  setLayout,
  dualChartWidth,
  sidebarWidth,
  selectedStrategy,
  selectedPattern
}) => {

  document
    .querySelector('[data-title="Autoscale"]')
    ?.addEventListener("onclick", function (event) {});

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
      data && layout && <Plot
        id={id}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onHover={onHover}
        onUnhover={onUnhover}
        data={[data, ...(templates || []), ...bottomTemplate]}
        layout={{
          ...layout,
          shapes: [
            ...drawFirstDateLine(toggleFirstDayLine, data),
            ...(selectedStrategy.length < 2
              ? drawStrategiesBar(data.strategiesData, data)
              : []),
            ...drawFVGPatterns(data, selectedPattern),
          ],
        }}
        config={{
          scrollZoom: true,
        }}
        useResizeHandler={true}
        onRelayout={(e) => {
          if (e && e["xaxis.autorange"]) {
            setLayout({
              ...layout,
              xaxis: {
                ...layout.xaxis,
                autorange: false,
                range: [data.x.length - 280, data.x.length - 1],
              },
              width: window.innerWidth - dualChartWidth - sidebarWidth,
              shapes: [
                ...drawFirstDateLine(toggleFirstDayLine, data),
                ...drawStrategiesBar(data.strategiesData, data),
                ...drawFVGPatterns(data, selectedPattern)
              ],
            });
          }
        }}
      />
    );
};
