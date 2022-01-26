import React, { useCallback, useState, useEffect } from "react";
import "./App.css";
import { Graph } from "./Components/Graph";
import Header from "./Components/Header";
import { getAllStocks } from "./services/api";
import { templatesOptions } from "./templates/templates";
import { useRef } from "react";
import { makeStyles } from "@mui/styles";

const dummy = {
  x: [],
  name: "main",
  close: [],
  decreasing: {
    fillcolor: "black",
    line: { color: "black", width: 1 },
  },
  high: [],
  increasing: { fillcolor: "white", line: { color: "black", width: 1 } },
  line: { color: "rgba(31,119,180,1)" },
  low: [],
  open: [],
  type: "candlestick",
  xaxis: "x",
  yaxis: "y",
};
const rightMargin = 23;
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const separateGraphLayout = {
  dragmode: "zoom",
  margin: {
    r: 10,
    t: 1,
    b: 40,
    l: 20,
  },
  showlegend: true,
  legend: { x: 1, xanchor: "right", y: 1 },
  xaxis: {
    domain: [0, 1],
    autorange: true,
    rangeslider: {
      visible: false,
    },
    type: "category",
    dtick: 30 * 24 * 60 * 60 * 1000,
    tickformat: "%d %B (%a)\n %Y",
    ticklen: 15,
    nticks: 10,
  },
  yaxis: {
    domain: [0, 1],
    autorange: true,
    rangeslider: {
      visible: false,
    },
    position: 1,
    side: "bottom",
  },
  opacity: 0.2,
  autosize: true,
};

const useStyles = makeStyles((theme) => ({
  container: (sidebarWidth) => {
    return { width: `calc(100% - ${sidebarWidth}px)` };
  },
}));

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(6);
  const classes = useStyles(sidebarWidth);

  const [loader, setLoader] = useState(false);

  const [a, setA] = useState(1);

  const [graphType, setGraphType] = useState("candlestick");

  const [separateGraphs, setSeparateGraphs] = useState([]);

  const style = { width: "100%", height: "100%" };

  const [layout, setLayout] = useState({
    dragmode: "zoom",
    margin: {
      r: 10,
      t: 25,
      b: 40,
      l: 20,
    },
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
      borderwidth: 2,
    },
    xaxis: {
      domain: [0, 1],
      rangeslider: {
        visible: false,
      },
      type: "category",
      tickmode: "array",
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
    },
    opacity: 0.2,

    autosize: true,
    height: 630,
  });

  const handleGrapthType = (type) => {
    setGraphType(type);
  };

  const [selectedStock, setSelectStock] = useState("MMM");
  const [selectedPattern, setSelectedPattern] = useState("");

  const [selectedTime, setSelectTime] = useState({ name: "1d", ms: 86400000 });
  const [selectedTemp, setSelectedTemp] = useState({
    id: 0,
    name: "T0",
    merged: {},
  });
  const [switchToggle, setSwitchToggle] = useState(0);

  const [data, setGraphData] = useState({ ...dummy });

  const getDataRequest = useCallback(
    async (stock, time, template, pattern, meta_trader_indicator) => {
      setLoader(true);
      let url = `stocks?stock=${stock?.toLowerCase()}&interval=${time.name}`;
      if (template && template?.id > 0) {
        url = url + `&template=${template.id}`;
      }
      if (pattern?.length) {
        url = url + `&pattern=${pattern}`;
      }
      if (meta_trader_indicator) {
        url = url + `&meta_template=${meta_trader_indicator}`;
      }
      getAllStocks(url)
        .then((res) => {
          console.log("res=-=-=-=-", res.data?.data);
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

          let ConfrimHigh = [];
          let ConfrimLow = [];
          let tempMerged = template && template.merged;
          let resMerged = tempMerged;

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
              if (template.id === 3 && m.indicators) {
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
              }
            }
          });

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
              if (template.id === 1) {
              } else if (template.id === 2) {
              } else if (template.id === 3) {
                R0.push(null);
                R1.push(null);
                donchian0.push(null);
              } else if (template.id === 4) {
                MACD0.push(null);
                MACD1.push(null);
                MACD2.push(null);
                MACDSIGNAL0.push(null);
                MACDHIST0.push(null);
                MACDSIGNAL2.push(null);
                stochd0.push(null);
                stochk0.push(null);
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
              } else if (template.id === 7) {
                EMA0.push(null);
                MA0.push(null);
                MA1.push(null);
                RSI0.push(null);
                stochd0.push(null);
                stochk0.push(null);
              } else if (template.id === 6) {
                EMA0.push(null);
                EMA1.push(null);
                EMA2.push(null);
                EMA3.push(null);
                EMA4.push(null);
                EMA5.push(null);
                HIST0.push(null);
              }
            }
          }

          if (template) {
            if (template.id === 0) {
              setSeparateGraphs([]);
            } else if (template.id === 1) {
              setSeparateGraphs([]);
            } else if (template.id === 2) {
              setSeparateGraphs([]);
            } else if (template.id === 3) {
              setSeparateGraphs([
                {
                  x: x,
                  y: R0,
                  name: "%R0",
                  marker: {
                    color: "blue",
                  },
                  xaxis: "x",
                  yaxis: "y",
                },
                {
                  x: x,
                  y: R1,
                  name: "%R1",
                  xaxis: "x",
                  yaxis: "y",
                  marker: {
                    color: "red",
                  },
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
                  yaxis: "y",
                  template: [
                    {
                      x: x,
                      y: MACDSIGNAL0,
                      name: "MACD SIGNAL",
                      xaxis: "x",
                      yaxis: "y",
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
                  yaxis: "y",
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
                  yaxis: "y",
                  templates: [
                    {
                      x: x,
                      y: stochk0,
                      name: "stochk",
                      xaxis: "x",
                      yaxis: "y",
                      marker: {
                        color: "rgb(13,0,255)",
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
                  yaxis: "y",
                  templates: [
                    {
                      x: x,
                      y: MACDSIGNAL0,
                      name: "MACD SIGNAL",
                      xaxis: "x",
                      yaxis: "y",
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
                  yaxis: "y",
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
                  yaxis: "y",
                  templates: [
                    {
                      x: x,
                      y: stochk0,
                      name: "stochk",
                      xaxis: "x",
                      yaxis: "y",
                      marker: {
                        color: "rgb(13,0,255)",
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
                  yaxis: "y",
                },
                {
                  x: x,
                  y: stochd0,
                  name: "stochd",
                  marker: {
                    color: "rgb(153,42,173)",
                  },
                  xaxis: "x",
                  yaxis: "y",
                  templates: [
                    {
                      x: x,
                      y: stochk0,
                      name: "stochk",
                      xaxis: "x",
                      yaxis: "y",
                      marker: {
                        color: "rgb(13,0,255)",
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
                  yaxis: "y",
                },
              ]);
            }
            setSelectedTemp({ ...template, merged: resMerged });
          }

          setGraphData({
            ...dummy,
            high,
            low,
            open,
            close,
            x,
            ConfrimHigh,
            ConfrimLow,
          });
          setLayout({
            ...layout,
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
                    let datee = months[d.getMonth()] + " " + d.getUTCFullYear();
                    return datee;
                  }),
              ],
            },
            yaxis: {
              ...layout.yaxis,
              rangeslider: {
                visible: false,
              },
              autorange: true,
            },
            shapes: [
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
    }
  );

  useEffect(() => {
    getDataRequest(selectedStock, selectedTime);
  }, [selectedStock, selectedTime]);

  const handleStockChange = (stock) => {
    setSelectStock(stock);
    getDataRequest(
      stock,
      selectedTime,
      selectedTemp,
      selectedPattern,
      switchToggle
    );
  };

  const handlePatternChange = (pattern) => {
    setSelectedPattern(pattern);
    getDataRequest(
      selectedStock,
      selectedTime,
      selectedTemp,
      pattern,
      switchToggle
    );
  };

  const hanldeSelectedTime = (time) => {
    setSelectTime(time);
    getDataRequest(
      selectedStock,
      time,
      selectedTemp,
      selectedPattern,
      switchToggle
    );
  };

  const templateChange = (tempData) => {
    setSelectedTemp(tempData);
    getDataRequest(
      selectedStock,
      selectedTime,
      tempData,
      selectedPattern,
      switchToggle
    );
  };

  const handlSwitchToggle = (v) => {
    getDataRequest(
      selectedStock,
      selectedTime,
      selectedTemp,
      selectedPattern,
      v
    );
    setSwitchToggle(v);
  };
  const onHover = ({ points: [point] }) => {
    setA(point.pointIndex);
  };

  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = React.useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(
          sidebarRef.current.getBoundingClientRect().right -
            mouseMoveEvent.clientX
        );
      }
    },
    [isResizing]
  );

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div className="app-container">
      <div className={classes.container + " app-frame"}>
        <div
          style={{ height: "100vh", overflowY: "scroll", overflowX: "hidden" }}
        >
          {loader ? <div className="loader"></div> : <></>}
          <div>
            <Header
              switchToggle={switchToggle}
              handlSwitchToggle={handlSwitchToggle}
              graphType={graphType}
              handleGrapthType={handleGrapthType}
              templateChange={templateChange}
              templatesOptions={templatesOptions}
              data={data}
              selectedStock={selectedStock}
              selectedTime={selectedTime}
              hanldeSelectedTime={hanldeSelectedTime}
              handleStockChange={handleStockChange}
              selectedTemp={selectedTemp}
              selectedPattern={selectedPattern}
              handlePatternChange={handlePatternChange}
            />

            {data ? (
              <div>
                <Graph
                  onHover={onHover}
                  style={style}
                  data={{ ...data, type: graphType }}
                  layout={layout}
                  templates={[
                    ...(selectedTemp.merged &&
                    Object.keys(selectedTemp.merged).length
                      ? [
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
                      : []),
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
                  ]}
                  loader={loader}
                />
                {!loader &&
                  separateGraphs.map((m, i) => (
                    <Graph
                      key={i + "subGraph"}
                      templates={m.templates}
                      style={{ width: "100%" }}
                      data={{ ...m }}
                      layout={separateGraphLayout}
                    />
                  ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div
        ref={sidebarRef}
        className="app-sidebar"
        style={{ width: sidebarWidth + "px" }}
        onMouseDown={(e) => e.preventDefault()}
      >
        <div className="app-sidebar-resizer" onMouseDown={startResizing} />
        <div className="app-sidebar-content"></div>
      </div>
    </div>
  );
}

export default App;
