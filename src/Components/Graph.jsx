import * as Plotly from "plotly.js";
import React, { useEffect, useState } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import "../App.css";

const Plot = createPlotlyComponent(Plotly);

export const Graph = ({
  data,
  layout,
  templates,
  loader,
  separateGraphs,
  onHover,
  onUnhover,
  onClick,
  rightMargin,
  toggleFirstDayLine,
  onDoubleClick,
  strategiesData,
  id,
}) => {
  const drawStrategiesBar = (strategiesData) => {
    let dateIndex =
      strategiesData && data.x.findIndex((f) => f === strategiesData.time);
    return strategiesData && dateIndex >= 0
      ? [
          {
            type: "rect",
            text: "ddd",
            x0: dateIndex - 0.5,
            y0: 0,
            x1: dateIndex + 0.5,
            yref: "paper",
            y1: 1,
            line: {
              color: "#ffff00",
              width: 1.5,
              // dash: "dot",
            },
            hoverinfo: "x",
            fillcolor: "#ffff00",
            opacity: 0.6,
          },
        ]
      : [];
  };
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
        id={id}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onHover={onHover}
        onUnhover={onUnhover}
        data={[data, ...(templates || []), ...bottomTemplate]}
        layout={{
          ...layout,
          xaxis: {
            ...layout.xaxis,
            autorange: false,
            range: [data.x.length - 280, data.x.length - 1],
          },
          shapes: [
            ...(toggleFirstDayLine
              ? data.x
                  .slice(0, data.x.length - rightMargin)
                  .map((dateStr, dateIndex) => {
                    let date_ = new Date(dateStr);
                    let date1 = date_.getDate();
                    let date2 = new Date(data.x[dateIndex - 1]).getDate();
                    let date3 = new Date(data.x[dateIndex - 2]).getDate();

                    if (
                      date1 === 1 ||
                      (date1 === 2 && date2 !== 1) ||
                      (date1 === 3 && date3 !== 1 && date2 !== 2)
                    ) {
                      return {
                        type: "line",
                        text: "ddd",
                        x0: String(dateStr),
                        y0: 0,
                        x1: String(dateStr),
                        yref: "paper",
                        y1: 1,
                        line: {
                          color: "grey",
                          width: 1.5,
                          dash: "dot",
                        },
                        hoverinfo: "x",
                      };
                      // return {
                      //   type: "rect",
                      //   text: "ddd",
                      //   x0: dateIndex - 0.5,
                      //   y0: 0,
                      //   x1: dateIndex + 0.5,
                      //   yref: "paper",
                      //   y1: 1,
                      //   line: {
                      //     color: "yellow",
                      //     width: 1.5,
                      //     // dash: "dot",
                      //   },
                      //   hoverinfo: "x",
                      //   fillcolor: "yellow",
                      //   opacity: 0.3,
                      // };
                    }
                    return null;
                  })
              : []),
            ...drawStrategiesBar(strategiesData),
          ],
        }}
        config={{
          scrollZoom: true,
        }}
        useResizeHandler={true}
      />
    );
};
