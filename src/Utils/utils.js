import { getAllStocks } from "../services/api";
import { dummy, months, rightMargin } from "./defaults";

function arrayMax(array) {
  return array.reduce(function (a, b) {
    return Math.max(a, b);
  });
}

function arrayMin(array) {
  return array.reduce(function (a, b) {
    return Math.min(a, b);
  });
}

export const drawPatternData = (data, selectedPattern) => {
  return data.patternData?.length
    ? [
        {
          x: data?.x,
          y: data?.patternData.map((m, i) => {
            let perc10 = ((data.max - data.min) / 100) * 2.5; //((data.high[i] - data.low[i]) / 100) * 10;
            if (m) {
              if (data.close[i] > data.open[i]) {
                return data.low[i] - perc10;
              }
              return data.high[i] + perc10;
            }
            return null;
          }),
          name: "Pattern",
          mode: "markers",
          dy: 10,
          marker: {
            color: data?.patternData.map((m, i) => {
              if (m) {
                if (data.close[i] < data.open[i]) {
                  return "red";
                }
                return "green";
              }
              return null;
            }),
            margin: {
              r: 10,
              t: 25,
              b: 40,
              l: 20,
            },
            symbol: data?.patternData.map((m, i) => {
              if (m) {
                if (data.close[i] < data.open[i]) {
                  return "triangle-down";
                }
                return "triangle-up";
              }
              return null;
            }),
            size: 7,
          },
        },
      ]
    : [];
};

export const drawConfirmHighAndLow = (switchToggle, data) => {
  return [
    ...(switchToggle
      ? [
          {
            x: data?.x,
            y: data?.ConfrimHigh.map((m, i) => {
              if (!m) return null;
              else return data.high[i];
            }),
            name: "Confirm High",
            mode: "markers",
            marker: {
              color: "blue",
              symbol: "diamond",
            },
          },
        ]
      : []),
    ...(switchToggle
      ? [
          {
            x: data?.x,
            y: data.ConfrimLow.map((m, i) => {
              if (!m) return null;
              else return data.low[i];
            }),
            name: "Confirm Low",
            mode: "markers",
            marker: {
              color: "red",
              symbol: "diamond",
            },
          },
        ]
      : []),
  ];
};

export const initialLayout = {
  dragmode: "pan",
  margin: {
    r: 10,
    t: 25,
    b: 40,
    l: 20,
  },
  hovermode: "x",
  showlegend: true,
  legend: {
    x: 0,
    y: 1,
    traceorder: "normal",
    font: {
      family: "sans-serif",
      size: 12,
      color: "#000",
    },
    bgcolor: "#E2E2E211",
    bordercolor: "#FFFFFF",
  },
  xaxis: {
    domain: [0, 1],
    rangeslider: {
      visible: false,
    },
    type: "category",
    tickmode: "array",
    showspikes: true,
    spikemode: "toaxis+across+marker",
    spikesnap: "cursor",
    spikethickness: 1,
    spikecolor: "black",
    spikedash: "dot",
  },
  yaxis: {
    domain: [0, 1],
    autorange: true,
    rangeslider: {
      visible: false,
    },
    position: 1,
    side: "bottom",
    type: "linear",
    showspikes: true,
    spikemode: "toaxis+across+marker",
    spikesnap: "cursor",
    spikethickness: 1,
    spikecolor: "black",
    spikedash: "dot",
  },
  opacity: 0.2,
  autosize: true,
  width: window.innerWidth - 10,
  height: window.innerHeight - 80,
};

export const drawMergedChart = (selectedTemp, data, a, graphType) => {
  let mergedCandles = [];
  if (selectedTemp.id === 6) {
    mergedCandles = [
      {
        ...dummy,
        type: graphType,
        name: "Red price",
        high:
          data.elder_impulse_system && data.elder_impulse_system.length
            ? data.realHigh &&
              data.realHigh.map((f_, iindex) => {
                if (!data.elder_impulse_system[iindex]) return f_;
                if (data.elder_impulse_system[iindex].is_red === 1) return f_;
                return null;
              })
            : data.realHigh,
        low: data.low,
        open: data.open,
        close: data.close,
        decreasing: {
          fillcolor: "red",
          line: { color: graphType === "ohlc" ? "red" : "black", width: 1 },
        },
        increasing: {
          fillcolor: "red",
          line: { color: graphType === "ohlc" ? "red" : "black", width: 1 },
        },
        x: data.x,
        ConfrimHigh: data.ConfrimHigh,
        ConfrimLow: data.ConfrimLow,
        patternData: data.patternData,
      },
      {
        ...dummy,
        type: graphType,
        name: "Green price",
        high:
          data.elder_impulse_system && data.elder_impulse_system.length
            ? data.realHigh &&
              data.realHigh.map((f_, iindex) => {
                if (!data.elder_impulse_system[iindex]) return f_;
                if (data.elder_impulse_system[iindex].is_green === 1) return f_;
                return null;
              })
            : data.realHigh,
        low: data.low,
        open: data.open,
        close: data.close,
        decreasing: {
          fillcolor: "green",
          line: { color: graphType === "ohlc" ? "green" : "black", width: 1 },
        },
        increasing: {
          fillcolor: "green",
          line: { color: graphType === "ohlc" ? "green" : "black", width: 1 },
        },
        x: data.x,
        ConfrimHigh: data.ConfrimHigh,
        ConfrimLow: data.ConfrimLow,
        patternData: data.patternData,
      },
    ];
  }
  return selectedTemp.merged && Object.keys(selectedTemp.merged).length
    ? [
        ...mergedCandles,
        ...Object.keys(selectedTemp.merged).map((key) => {
          return {
            ...selectedTemp.merged[key],
            x: data?.x,
            y: selectedTemp.merged[key].data.map((m) => {
              if (!m) return null;
              else return m;
            }),
            name: `${selectedTemp.merged[key].name} ${selectedTemp.merged[key].data[a]}`,
            hoverinfo: "x",
          };
        }),
      ]
    : [];
};

export const drawSeparateChart = (selectedTemp, data, pointIndex) => {
  return selectedTemp.separate && Object.keys(selectedTemp.separate).length
    ? [
        ...Object.keys(selectedTemp.separate).map((key) => {
          return {
            ...selectedTemp.separate[key],
            x: data?.x,
            y: selectedTemp.separate[key].data.map((m) => {
              if (!m) return null;
              else return m;
            }),
            ...(selectedTemp.separate[key].markerFn
              ? {
                  marker: selectedTemp.separate[key].markerFn(
                    selectedTemp.separate[key].data
                  ),
                }
              : {}),
            name: `${selectedTemp.separate[key].name} ${selectedTemp.separate[key].data[pointIndex]}`,
            hoverinfo: "x",
          };
        }),
      ]
    : [];
};

export function getDataRequestService(
  selectedCategory,
  setLoader,
  layout,
  setSeparateGraphs,
  setSelectedTemp,
  setGraphData,
  setLayout,
  graphType
) {
  return async (stock, time, template, pattern, meta_trader_indicator) => {
    document.querySelector('[data-title="Autoscale"]')?.click();
    if (!selectedCategory || !stock?.name || stock?.selectedSource) {
      return;
    }
    setLoader(true);

    let url = `stocks?category=${selectedCategory}&symbol=${stock.name?.toLowerCase()}&source=${
      stock?.selectedSource || (stock?.sources?.length && stock.sources[0])
    }&interval=${time.name}`;
    if (template && template?.id > 0) {
      url = url + `&template=${template.id}`;
    }
    if (pattern?.length) {
      url = url + `&pattern=${pattern}`;
    }
    if (meta_trader_indicator) {
      url = url + `&meta_template=${meta_trader_indicator}`;
    }
    await getAllStocks(url)
      .then((res) => {
        setLoader(false);
        let responseData = [...res?.data?.data];

        let high = [];
        let low = [];
        let open = [];
        let close = [];
        let x = [];
        let patternData = [];
        let elder_impulse_system = [];
        let ConfrimHigh = [];
        let ConfrimLow = [];
        let tempMerged = template && template.merged;
        let resMerged = tempMerged;

        Object.keys(tempMerged).length &&
          Object.keys(tempMerged).forEach((key) => {
            resMerged[key].data = [];
          });

        let tempSeparate = template && template.separate;
        let resSeparate = tempSeparate;

        Object.keys(tempSeparate).length &&
          Object.keys(tempSeparate).forEach((key) => {
            resSeparate[key].data = [];
          });

        responseData?.forEach((m) => {
          high.push(m.high);
          low.push(m.low);
          open.push(m.open);
          close.push(m.close);

          if (meta_trader_indicator) {
            ConfrimHigh.push(m["meta-indicators"]["Confrim High"]);
            ConfrimLow.push(m["meta-indicators"]["Confrim Low"]);
          }

          if (m[pattern] !== undefined) {
            patternData.push(m[pattern]);
          }
          x.push(new Date(m.date));

          if (template) {
            tempMerged &&
              Object.keys(tempMerged).length &&
              Object.keys(tempMerged).forEach((key) => {
                resMerged[key].data = [
                  ...resMerged[key].data,
                  m.indicators[key],
                ];
              });

            tempSeparate &&
              Object.keys(tempSeparate).length &&
              Object.keys(tempSeparate).forEach((key) => {
                resSeparate[key].data = [
                  ...resSeparate[key].data,
                  resSeparate[key].customLine
                    ? resSeparate[key].customLine
                    : m.indicators[key],
                ];
              });

            if (template.id === 6) {
              elder_impulse_system.push(m.indicators?.elder_impulse_system);
            }
          }
        });
        let tempLayout = { ...layout, ...template.layout };
        for (let i = 0; i < rightMargin; i++) {
          high.push(null);
          low.push(null);
          open.push(null);
          close.push(null);
          x.push(new Date(Date.now(x[x.length - 1]) + (i + 1) * time.ms));
          if (template) {
            tempMerged &&
              Object.keys(tempMerged).forEach((key) => {
                resMerged[key].data = [...resMerged[key].data, null];
              });

            tempSeparate &&
              Object.keys(tempSeparate).forEach((key) => {
                resSeparate[key].data = [...resSeparate[key].data, null];
              });
          }
        }

        if (template) {
          setSelectedTemp({
            ...template,
            merged: resMerged,
            separate: resSeparate,
          });
        }

        setGraphData({
          ...dummy,
          realHigh: high,
          high: elder_impulse_system.length
            ? high.map((f_, iindex) => {
                if (!elder_impulse_system[iindex]) return f_;
                if (
                  elder_impulse_system[iindex].is_red !== 1 ||
                  elder_impulse_system[iindex].is_green !== 1
                )
                  return f_;
                return null;
              })
            : high,
          low,
          open,
          close,
          x,
          increasing:
            template.id === 6
              ? {
                  fillcolor: "blue",
                  line: {
                    color: graphType === "ohlc" ? "blue" : "black",
                    width: 1,
                  },
                }
              : dummy.increasing,
          decreasing:
            template.id === 6
              ? {
                  fillcolor: "blue",
                  line: {
                    color: graphType === "ohlc" ? "blue" : "black",
                    width: 1,
                  },
                }
              : dummy.decreasing,
          ConfrimHigh,
          ConfrimLow,
          patternData,
          elder_impulse_system,
          max: arrayMax(high),
          min: arrayMin(low.filter((f) => f !== 0 && f !== null)),
        });
        setLayout({
          ...tempLayout,
          xaxis: {
            ...layout.xaxis,
            rangeslider: {
              visible: false,
            },
            autorange: true,
            tickvals: [
              ...x.filter((f, i) => {
                return i % 15 === 0; //d.getDate() === 15 || d.getDate() === 30;
              }),
            ],
            ticktext: [
              ...x
                .filter((f, i) => {
                  return i % 15 === 0;
                })
                .map((m) => {
                  let d = new Date(m);
                  return months[d.getMonth()] + " " + d.getUTCFullYear();
                }),
            ],
          },
          shapes: [
            // ...data.x.slice(0, data.x.length - rightMargin).map((dateStr) => {
            //   let date_ = new Date(dateStr);
            //   let date1 = date_.getDate();
            //   if (date1 === 1) {
            //     return {
            //       type: "line",
            //       text: "ddd",
            //       x0: String(dateStr),
            //       y0: 0,
            //       x1: String(dateStr),
            //       yref: "paper",
            //       y1: 1,
            //       line: {
            //         color: "grey",
            //         width: 1.5,
            //         dash: "dot",
            //       },
            //     };
            //   }
            // }),
            ...high.map((shp, i) => {
              if (patternData[i]) {
                let lowP = Math.min(...[low[i], high[i], open[i], close[i]]);
                let highP = Math.max(...[low[i], high[i], open[i], close[i]]);
                let x0 = String(new Date(x[i - 1])); //- 0.5 * time.ms));
                let x1 = String(new Date(x[i + 1])); //.getTime() + 0.5 * time.ms));
                return {
                  type: "rect",
                  xref: "x",
                  yref: "y",
                  x0: x0,
                  y0: lowP,
                  x1,
                  width: 1,
                  y1: highP,
                  fillcolor: "yellow",
                  opacity: 0.6,
                  rightMargin: 3,
                  line: {
                    width: 2,
                    color: open[i] < close[i] ? "green" : "red",
                    opacity: 1,
                  },
                  hoverinfo: "x",
                };
              }
              return null;
            }),
          ],
        });
      })
      .catch((err) => {
        setLoader(false);
        setSeparateGraphs([]);
        setGraphData(null);
      });
    document.querySelector('[data-title="Autoscale"]')?.click();
  };
}
