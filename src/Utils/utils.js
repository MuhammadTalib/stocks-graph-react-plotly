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

        let high = [],
          low = [],
          open = [],
          close = [],
          x = [];

        let EMA0 = [];
        let EMA1 = [];
        let EMA2 = [];
        let EMA3 = [];
        let EMA4 = [];
        let EMA5 = [];
        let volume = [];

        let MACD0 = [];
        let MACD1 = [];
        let MACD2 = [];
        let MACDHIST0 = [];
        let MACDHIST1 = [];
        let MACDHIST2 = [];
        let MACDSIGNAL0 = [];
        let MACDSIGNAL1 = [];
        let MACDSIGNAL2 = [];

        let stochd0 = [];
        let stochk0 = [];

        let MA0 = [];
        let MA1 = [];
        let RSI0 = [];

        let R0 = [];
        let R1 = [];
        let donchian0 = [];
        let HIST0 = [];
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
            if (template.id === 1 && m.indicators) {
              volume.push(m.indicators["Volume EMA"]);
            } else if (template.id === 3 && m.indicators) {
              R0.push(m.indicators["%R0"]);
              R1.push(m.indicators["%R1"]);
              donchian0.push(m.indicators?.donchian0);
            } else if (template.id === 4) {
              MACD0.push(m.indicators?.MACD0);
              MACD1.push(m.indicators?.MACD1);
              MACD2.push(m.indicators?.MACD2);
              MACDSIGNAL0.push(m.indicators?.MACDSIGNAL0);
              MACDHIST0.push(m.indicators?.MACDHIST0);
              MACDSIGNAL2.push(m.indicators?.MACDSIGNAL2);
              stochd0.push(m.indicators?.stochd0);
              stochk0.push(m.indicators?.stochk0);
            } else if (template.id === 5) {
              MACD0.push(m.indicators?.MACD0);
              MACD1.push(m.indicators?.MACD1);
              MACD2.push(m.indicators?.MACD2);
              MACDHIST0.push(m.indicators?.MACDHIST0);
              MACDHIST1.push(m.indicators?.MACDHIST1);
              MACDHIST2.push(m.indicators?.MACDHIST2);
              MACDSIGNAL0.push(m.indicators?.MACDSIGNAL0);
              MACDSIGNAL1.push(m.indicators?.MACDSIGNAL1);
              MACDSIGNAL2.push(m.indicators?.MACDSIGNAL2);
              EMA0.push(m.indicators?.EMA0);
              EMA1.push(m.indicators?.EMA1);
              EMA2.push(m.indicators?.EMA2);
              EMA3.push(m.indicators?.EMA3);
              stochd0.push(m.indicators?.stochd0);
              stochk0.push(m.indicators?.stochk0);
            } else if (template.id === 7) {
              EMA0.push(m.indicators?.EMA0);
              MA0.push(m.indicators?.MA0);
              MA1.push(m.indicators?.MA1);
              RSI0.push(m.indicators?.RSI0);
              stochd0.push(m.indicators?.stochd0);
              stochk0.push(m.indicators?.stochk0);
            } else if (template.id === 6) {
              EMA0.push(m.indicators?.EMA0);
              EMA1.push(m.indicators?.EMA1);
              EMA2.push(m.indicators?.EMA2);
              EMA3.push(m.indicators?.EMA3);
              EMA4.push(m.indicators?.EMA4);
              EMA5.push(m.indicators?.EMA5);
              HIST0.push(m.indicators?.HIST0);
              elder_impulse_system.push(m.indicators?.elder_impulse_system);
            }
          }
        });
        let tempLayout = layout;
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
            if (template.id === 0) {
              tempLayout = {
                ...tempLayout,
                yaxis: { ...layout.yaxis, domain: [0, 1] },
              };
            } else if (template.id === 1) {
              tempLayout = {
                ...tempLayout,
                yaxis: { ...layout.yaxis, domain: [0.3, 1] },
                yaxis2: { ...layout.yaxis, domain: [0, 0.25] },
              };
            } else if (template.id === 2) {
              tempLayout = {
                ...tempLayout,
                yaxis: { ...layout.yaxis, domain: [0, 1] },
              };
            } else if (template.id === 3) {
              R0.push(null);
              R1.push(null);
              donchian0.push(null);
              tempLayout = {
                ...tempLayout,
                yaxis: { ...layout.yaxis, domain: [0.55, 1] },
                yaxis2: { ...layout.yaxis, domain: [0.25, 0.5] },
                yaxis3: { ...layout.yaxis, domain: [0, 0.25] },
                xaxis: { ...layout.xaxis },
              };
            } else if (template.id === 4) {
              MACD0.push(null);
              MACD1.push(null);
              MACD2.push(null);
              MACDSIGNAL0.push(null);
              MACDHIST0.push(null);
              MACDSIGNAL2.push(null);
              stochd0.push(null);
              stochk0.push(null);
              tempLayout = {
                ...tempLayout,
                yaxis: { ...layout.yaxis, domain: [0.5, 1] },
                yaxis2: {
                  ...layout.yaxis,
                  domain: [0.3, 0.45],
                  range: [-5, 5],
                  autorange: false,
                },
                yaxis3: { ...layout.yaxis, domain: [0.15, 0.3] },
                yaxis4: { ...layout.yaxis, domain: [0, 0.15] },
                xaxis: { ...layout.xaxis },
              };
            } else if (template.id === 5) {
              MACD0.push(null);
              MACD1.push(null);
              MACD2.push(null);
              MACDHIST0.push(null);
              MACDHIST1.push(null);
              MACDHIST2.push(null);
              MACDSIGNAL0.push(null);
              MACDSIGNAL1.push(null);
              MACDSIGNAL2.push(null);
              EMA0.push(null);
              EMA1.push(null);
              EMA2.push(null);
              EMA3.push(null);
              stochd0.push(null);
              stochk0.push(null);
              tempLayout = {
                ...tempLayout,
                yaxis: { ...layout.yaxis, domain: [0.5, 1] },
                yaxis2: { ...layout.yaxis, domain: [0.3, 0.45] },
                yaxis3: { ...layout.yaxis, domain: [0.15, 0.3] },
                yaxis4: { ...layout.yaxis, domain: [0, 0.15] },
                xaxis: { ...layout.xaxis },
              };
            } else if (template.id === 7) {
              EMA0.push(null);
              MA0.push(null);
              MA1.push(null);
              RSI0.push(null);
              stochd0.push(null);
              stochk0.push(null);
              tempLayout = {
                ...tempLayout,
                yaxis: { ...layout.yaxis, domain: [0.55, 1] },
                yaxis2: {
                  ...layout.yaxis,
                  domain: [0.25, 0.5],
                  range: [20, 80],
                  autorange: false,
                },
                yaxis3: {
                  ...layout.yaxis,
                  domain: [0, 0.25],
                },
                xaxis: { ...layout.xaxis },
              };
            } else if (template.id === 6) {
              EMA0.push(null);
              EMA1.push(null);
              EMA2.push(null);
              EMA3.push(null);
              EMA4.push(null);
              EMA5.push(null);
              HIST0.push(null);
              tempLayout = {
                ...tempLayout,
                yaxis: { ...layout.yaxis, domain: [0.35, 1] },
                yaxis2: { ...layout.yaxis, domain: [0, 0.3] },
                xaxis: { ...layout.xaxis },
              };
            }
          }
        }

        if (template) {
          if (template.id === 0) {
            setSeparateGraphs([]);
          } else if (template.id === 1) {
            setSeparateGraphs([
              {
                x: x,
                y: volume,
                name: "Volume",
                marker: {
                  color: "#9fa5c5",
                },
                yaxis: "y2",
              },
            ]);
          } else if (template.id === 2) {
            setSeparateGraphs([]);
          } else if (template.id === 3) {
            setSeparateGraphs([
              {
                x: x,
                y: R0,
                name: "%R0",
                type: "bar",
                marker: {
                  color: "blue",
                },
                yaxis: "y2",
              },
              {
                x: x,
                y: R1,
                name: "%R1",
                type: "bar",
                marker: {
                  color: "red",
                },
                yaxis: "y3",
              },
            ]);
          } else if (template.id === 4) {
            setSeparateGraphs([
              {
                x: x,
                y: MACD0,
                name: "MACD0",
                marker: {
                  color: "blue",
                },
                xaxis: "x",
                yaxis: "y2",
                templates: [
                  {
                    x: x,
                    y: MACDSIGNAL0,
                    name: "MACD SIGNAL",
                    xaxis: "x",
                    yaxis: "y2",
                    marker: {
                      color: "black",
                    },
                  },
                ],
              },
              {
                x: x,
                y: MACDHIST0,
                name: "MACD HIST",
                type: "bar",
                xaxis: "x",
                yaxis: "y3",
                marker: {
                  color: MACDHIST0.map((m, i) => (m > 0 ? "green" : "red")), //"black",
                },
              },
              {
                x: x,
                y: stochd0,
                name: "stochd",
                marker: {
                  color: "rgb(153,42,173)",
                },
                xaxis: "x",
                yaxis: "y4",
                templates: [
                  {
                    x: x,
                    y: stochk0,
                    name: "stochk",
                    xaxis: "x",
                    yaxis: "y4",
                    marker: {
                      color: "rgb(13,0,255)",
                    },
                  },
                  {
                    x: x.slice(0, x.length - 4),
                    y: x.map((m) => 20),
                    mode: "lines",
                    xaxis: "x",
                    showlegend: false,
                    yaxis: "y4",
                    line: {
                      dash: "dash",
                      width: 2,
                      color: "red",
                    },
                  },
                  {
                    x: x.slice(0, x.length - 4),
                    y: x.map((m) => 80),
                    mode: "lines",
                    xaxis: "x",
                    showlegend: false,
                    yaxis: "y4",
                    line: {
                      color: "red",
                      dash: "dash",
                      width: 2,
                    },
                  },
                ],
              },
            ]);
          } else if (template.id === 5) {
            setSeparateGraphs([
              {
                x: x,
                y: MACD0,
                name: "MACD0",
                marker: {
                  color: "blue",
                },
                xaxis: "x",
                yaxis: "y2",
                templates: [
                  {
                    x: x,
                    y: MACDSIGNAL0,
                    name: "MACD SIGNAL",
                    xaxis: "x",
                    yaxis: "y2",
                    marker: {
                      color: "black",
                    },
                  },
                ],
              },
              {
                x: x,
                y: MACDHIST0,
                name: "MACDHIST",
                type: "bar",
                xaxis: "x",
                yaxis: "y3",
                marker: {
                  color: MACDHIST0.map((m, i) => (m > 0 ? "green" : "red")),
                },
              },
              {
                x: x,
                y: stochd0,
                name: "stochd",
                marker: {
                  color: "rgb(153,42,173)",
                },
                xaxis: "x",
                yaxis: "y4",
                templates: [
                  {
                    x: x,
                    y: stochk0,
                    name: "stochk",
                    xaxis: "x",
                    yaxis: "y4",
                    marker: {
                      color: "rgb(13,0,255)",
                    },
                  },
                  {
                    x: x.slice(0, x.length - 4),
                    y: x.map((m) => 20),
                    mode: "lines",
                    xaxis: "x",
                    showlegend: false,

                    yaxis: "y4",
                    line: {
                      dash: "dash",
                      width: 2,
                      color: "red",
                    },
                  },
                  {
                    x: x.slice(0, x.length - 4),
                    y: x.map((m) => 80),
                    mode: "lines",
                    xaxis: "x",
                    showlegend: false,
                    yaxis: "y4",
                    line: {
                      color: "red",
                      dash: "dash",
                      width: 2,
                    },
                  },
                ],
              },
            ]);
          } else if (template.id === 7) {
            setSeparateGraphs([
              {
                x: x,
                y: RSI0,
                name: "RSI0",
                marker: {
                  color: "blue",
                },
                xaxis: "x",
                yaxis: "y2",
                templates: [
                  {
                    x: x.slice(0, x.length - 4),
                    y: x.map((m) => 60),
                    mode: "lines",
                    xaxis: "x",
                    showlegend: false,
                    yaxis: "y2",
                    line: {
                      dash: "dashdot",
                      width: 2,
                      color: "green",
                    },
                  },
                  {
                    x: x.slice(0, x.length - 4),
                    y: x.map((m) => 40),
                    mode: "lines",
                    xaxis: "x",
                    showlegend: false,
                    yaxis: "y2",
                    line: {
                      color: "red",
                      dash: "dash",
                      width: 2,
                    },
                  },
                ],
              },
              {
                x: x,
                y: stochd0,
                name: "stochd",
                marker: {
                  color: "rgb(153,42,173)",
                },
                xaxis: "x",
                yaxis: "y3",
                templates: [
                  {
                    x: x,
                    y: stochk0,
                    name: "stochk",
                    xaxis: "x",
                    yaxis: "y3",
                    marker: {
                      color: "rgb(13,0,255)",
                    },
                  },
                  {
                    x: x.slice(0, x.length - 4),
                    y: x.map((m) => 20),
                    mode: "lines",
                    xaxis: "x",
                    showlegend: false,
                    yaxis: "y3",
                    line: {
                      dash: "dash",
                      width: 2,
                      color: "red",
                    },
                  },
                  {
                    x: x.slice(0, x.length - 4),
                    y: x.map((m) => 80),
                    mode: "lines",
                    xaxis: "x",
                    showlegend: false,
                    yaxis: "y3",
                    line: {
                      color: "green",
                      dash: "dashdot",
                      width: 2,
                    },
                  },
                ],
              },
            ]);
          } else if (template.id === 6) {
            setSeparateGraphs([
              {
                x: x,
                y: HIST0,
                type: "bar",
                name: "HIST0",
                marker: {
                  color: HIST0.map((m, i) =>
                    m > 0 ? "rgb(38,165,154)" : "rgb(254,82,82)"
                  ), //"black",
                },
                xaxis: "x",
                yaxis: "y2",
              },
            ]);
          }
          setSelectedTemp({ ...template, merged: resMerged });
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
