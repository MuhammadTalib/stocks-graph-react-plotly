import React, { useState } from "react";
import "./App.css";
import { Graph } from "./Components/Graph";
import Header from "./Components/Header";
import { getAllStocks } from "./services/api";
import { templatesOptions } from "./templates/templates";

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
const rightMargin = 20;
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
// const candleDefault = 214 + rightMargin;

function App() {
  const [loader, setLoader] = useState(false);

  const [graphType, setGraphType] = useState("candlestick");

  const [mergedGraphs, setMergedGraphs] = useState([]);
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
    legend: { orientation: "h" },
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
    height: 550,
  });

  const handleGrapthType = (type) => {
    setGraphType(type);
  };

  const [selectedStock, setSelectStock] = useState("MMM");
  const [selectedPattern, setSelectedPattern] = useState("");

  const [selectedTime, setSelectTime] = useState({ name: "1d", ms: 86400000 });
  const [selectedTemp, setSelectedTemp] = useState(0);
  const [switchToggle, setSwitchToggle] = useState(false);

  const [data, setGraphData] = useState({ ...dummy });

  const getDataRequest = (
    stock,
    time,
    template,
    pattern,
    meta_trader_indicator
  ) => {
    console.log("meta_trader_indicator", meta_trader_indicator);
    setLoader(true);
    let url = `stocks?stock=${stock?.toLowerCase()}&interval=${time.name}`;
    if (template > 0) {
      url = url + `&template=${template}`;
    }
    if (pattern?.length) {
      url = url + `&pattern=${pattern}`;
    }
    if (meta_trader_indicator) {
      url = url + `&meta_trader_indicator=${meta_trader_indicator}`;
    }
    setMergedGraphs([]);
    getAllStocks(url)
      .then((res) => {
        console.log(
          "Total candles on time ",
          time.name,
          " is ",
          res?.data?.data.length
        );
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

        let SMA0 = [];
        let SMA1 = [];
        let SMA2 = [];
        let SMA3 = [];

        let stochd0 = [];
        let stochk0 = [];

        let MA0 = [];
        let MA1 = [];
        let RSI0 = [];

        let R0 = [];
        let R1 = [];
        let donchian0 = [];

        let donchian_price0 = [];
        let donchian_min0 = [];
        let donchian_max0 = [];

        let HIST0 = [];

        let patternData = [];

        let ConfrimHigh = [];
        let ConfrimLow = [];

        responseData?.forEach((m) => {
          high.push(m.high);
          low.push(m.low);
          open.push(m.open);
          close.push(m.close);

          if (meta_trader_indicator) {
            console.log("switchToggleswitchToggle");
            ConfrimHigh.push(m.indicators["Confrim High"]);
            ConfrimLow.push(m.indicators["Confrim Low"]);
          }

          if (m[pattern] !== undefined) {
            patternData.push(m[pattern]);
          }
          x.push(new Date(m.date));
          if (template === 1) {
            EMA0.push(m.indicators?.EMA0);
            EMA1.push(m.indicators?.EMA1);
            EMA2.push(m.indicators?.EMA2);
          } else if (template === 2) {
            EMA0.push(m.indicators?.EMA0);
            EMA1.push(m.indicators?.EMA1);
            EMA2.push(m.indicators?.EMA2);
            EMA3.push(m.indicators?.EMA3);
            EMA4.push(m.indicators?.EMA4);
            EMA5.push(m.indicators?.EMA5);
          } else if (template === 3 && m.indicators) {
            R0.push(m.indicators["%R0"]);
            R1.push(m.indicators["%R1"]);
            donchian_price0.push(m.indicators["donchian_price0"]);
            donchian_min0.push(m.indicators["donchian_min0"]);
            donchian_max0.push(m.indicators["donchian_max0"]);
            donchian0.push(m.indicators?.donchian0);
          } else if (template === 4) {
            MACD0.push(m.indicators?.MACD0);
            MACD1.push(m.indicators?.MACD1);
            MACD2.push(m.indicators?.MACD2);
            MACDSIGNAL0.push(m.indicators?.MACDSIGNAL0);
            MACDHIST0.push(m.indicators?.MACDHIST0);
            MACDSIGNAL2.push(m.indicators?.MACDSIGNAL2);
            SMA0.push(m.indicators?.SMA0);
            SMA1.push(m.indicators?.SMA1);
            SMA2.push(m.indicators?.SMA2);
            SMA3.push(m.indicators?.SMA3);
            stochd0.push(m.indicators?.stochd0);
            stochk0.push(m.indicators?.stochk0);
          } else if (template === 5) {
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
          } else if (template === 7) {
            EMA0.push(m.indicators?.EMA0);
            MA0.push(m.indicators?.MA0);
            MA1.push(m.indicators?.MA1);
            RSI0.push(m.indicators?.RSI0);
            stochd0.push(m.indicators?.stochd0);
            stochk0.push(m.indicators?.stochk0);
          } else if (template === 6) {
            EMA0.push(m.indicators?.EMA0);
            EMA1.push(m.indicators?.EMA1);
            EMA2.push(m.indicators?.EMA2);
            EMA3.push(m.indicators?.EMA3);
            EMA4.push(m.indicators?.EMA4);
            EMA5.push(m.indicators?.EMA5);
            HIST0.push(m.indicators?.HIST0);
          }
        });

        // let lowLowest = Math.min(...low.filter((f) => f !== null));
        // let closeLowest = Math.min(...close.filter((f) => f !== null));
        // let lowest = lowLowest > closeLowest ? closeLowest : lowLowest;

        // let highHighest = Math.min(...low.filter((f) => f !== null));
        // let openHighest = Math.max(...close.filter((f) => f !== null));
        // let highest = openHighest > highHighest ? openHighest : highHighest;

        for (let i = 0; i < rightMargin; i++) {
          high.push(null);
          low.push(null);
          open.push(null);
          close.push(null);
          x.push(new Date(Date.now(x[x.length - 1]) + (i + 1) * time.ms));
          if (template === 1) {
            EMA0.push(null);
            EMA1.push(null);
            EMA2.push(null);
          } else if (template === 2) {
            EMA0.push(null);
            EMA1.push(null);
            EMA2.push(null);
            EMA3.push(null);
            EMA4.push(null);
            EMA5.push(null);
          } else if (template === 3) {
            R0.push(null);
            R1.push(null);
            donchian0.push(null);
            donchian_price0.push(null);
            donchian_min0.push(null);
            donchian_max0.push(null);
          } else if (template === 4) {
            MACD0.push(null);
            MACD1.push(null);
            MACD2.push(null);
            MACDSIGNAL0.push(null);
            MACDHIST0.push(null);
            MACDSIGNAL2.push(null);
            SMA0.push(null);
            SMA1.push(null);
            SMA2.push(null);
            SMA3.push(null);
            stochd0.push(null);
            stochk0.push(null);
          } else if (template === 5) {
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
          } else if (template === 7) {
            EMA0.push(null);
            MA0.push(null);
            MA1.push(null);
            RSI0.push(null);
            stochd0.push(null);
            stochk0.push(null);
          } else if (template === 6) {
            EMA0.push(null);
            EMA1.push(null);
            EMA2.push(null);
            EMA3.push(null);
            EMA4.push(null);
            EMA5.push(null);
            HIST0.push(null);
          }
        }

        if (template === 0) {
          setMergedGraphs([]);
          setSeparateGraphs([]);
        } else if (template === 1) {
          setMergedGraphs([
            {
              x: x,
              y: EMA0.map((m) => {
                if (!m) return null;
                else return m;
              }),
              xaxis: "x",
              name: "EMA0",
              yaxis: "y",
              mode: "line",
              type: "scatter",
              marker: {
                size: 4,
                color: "blue",
                symbol: "diamond",
              },
            },
            {
              x: x,
              y: EMA1.map((m) => {
                if (!m) return null;
                else return m;
              }),
              name: "EMA1",
              xaxis: "x",
              type: "scatter",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: EMA2.map((m) => {
                if (!m) return null;
                else return m;
              }),
              name: "EMA2",
              type: "scatter",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
          ]);
          setSeparateGraphs([]);
        } else if (template === 2) {
          setMergedGraphs([
            {
              x: x,
              y: EMA0,
              name: "EMA0",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: EMA1,
              name: "EMA1",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: EMA2,
              name: "EMA2",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: EMA3,
              name: "EMA3",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "red",
              },
            },
            {
              x: x,
              y: EMA4,
              name: "EMA4",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "red",
              },
            },
            {
              x: x,
              y: EMA5,
              name: "EMA5",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "red",
              },
            },
          ]);
          setSeparateGraphs([]);
        } else if (template === 3) {
          setMergedGraphs([
            {
              x: x,
              y: donchian_price0,
              name: "DONCHAIN",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
                size: 12,
              },
              line: {
                width: 1,
              },
            },
            {
              x: x,
              y: donchian_min0,
              name: "donchian min",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
              line: {
                width: 2,
              },
            },
            {
              x: x,
              y: donchian_max0,
              name: "donchian max",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
              line: {
                width: 2,
              },
            },
          ]);
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
        } else if (template === 4) {
          setMergedGraphs([
            {
              x: x,
              y: SMA0,
              name: "SMA0",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "rgb(255,173,89)",
              },
            },
            {
              x: x,
              y: SMA1,
              name: "SMA1",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "rgb(253,91,252)",
              },
            },
            {
              x: x,
              y: SMA2,
              name: "SMA2",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "rgb(172,91,170)",
              },
            },
            {
              x: x,
              y: SMA3,
              name: "SMA3",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "rgb(89,89,89)",
              },
            },
          ]);
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
        } else if (template === 5) {
          setMergedGraphs([
            {
              x: x,
              y: EMA0,
              name: "EMA0",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: EMA1,
              name: "EMA1",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "rgb(255,0,56)",
              },
            },
            {
              x: x,
              y: EMA2,
              name: "EMA2",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "rgb(13,190,58)",
              },
            },
            {
              x: x,
              y: EMA3,
              name: "EMA3",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "black",
              },
            },
          ]);
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
        } else if (template === 7) {
          setMergedGraphs([
            {
              x: x,
              y: EMA0,
              name: "EMA0",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: MA0,
              name: "MA0",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "black",
              },
            },
            {
              x: x,
              y: MA1,
              name: "MA1",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "black",
              },
            },
          ]);
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
        } else if (template === 6) {
          setMergedGraphs([
            {
              x: x,
              y: EMA0,
              name: "EMA0",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: EMA1,
              name: "EMA1",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: EMA2,
              name: "EMA2",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: EMA3,
              name: "EMA3",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "red",
              },
            },
            {
              x: x,
              y: EMA4,
              name: "EMA4",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "red",
              },
            },
            {
              x: x,
              y: EMA5,
              name: "EMA5",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "red",
              },
            },
          ]);
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
                let s = i % 15 === 0;
                let d = new Date(f);
                return i % 15 === 0; //d.getDate() === 15 || d.getDate() === 30;
              }),
            ],
            ticktext: [
              ...x
                .filter((f, i) => {
                  // let s = i % 15 === 0;
                  // let d = new Date(f);
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

                console.log("x0x1", x0, x1);
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
            // ...high.map((shp, i) => {
            //   if (true && i % 10 == 0) {
            //     return {
            //       type: "path",
            //       path:
            //         "M 150 100 L " +
            //         new Date(x[i].getTime() + 0.5 * time.ms) +
            //         " 300 L 200 70 Z",
            //       fillcolor: "rgba(255, 140, 184, 0.5)",
            //       line: {
            //         color: "rgb(255, 140, 184)",
            //       },
            //     };
            //   }
            // }),
          ],
        });
      })
      .catch((err) => {
        setLoader(false);
        setMergedGraphs([]);
        setSeparateGraphs([]);
        setGraphData(null);
      });
  };

  useState(() => {
    getDataRequest(selectedStock, selectedTime);
  }, []);

  const handleStockChange = (stock) => {
    setSelectStock(stock);
    getDataRequest(
      stock,
      selectedTime,
      selectedTemp.id,
      selectedPattern,
      switchToggle
    );
  };

  const handlePatternChange = (pattern) => {
    console.log("pattern", pattern);
    setSelectedPattern(pattern);
    getDataRequest(
      selectedStock,
      selectedTime,
      selectedTemp.id,
      pattern,
      switchToggle
    );
  };

  const hanldeSelectedTime = (time) => {
    setSelectTime(time);
    getDataRequest(
      selectedStock,
      time,
      selectedTemp.id,
      selectedPattern,
      switchToggle
    );
  };

  const templateChange = (tempData) => {
    setSelectedTemp(tempData);
    getDataRequest(
      selectedStock,
      selectedTime,
      tempData.id,
      selectedPattern,
      switchToggle
    );
  };

  const handlSwitchToggle = (v) => {
    getDataRequest(
      selectedStock,
      selectedTime,
      selectedTemp.id,
      selectedPattern,
      v
    );
    setSwitchToggle(v);
  };

  return (
    <>
      {loader ? <div className="loader"></div> : <></>}
      <div style={{ padding: "10px" }}>
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

        <div id="fullscreen">
          <Graph
            style={style}
            data={{ ...data, type: graphType }}
            layout={layout}
            templates={[
              ...(mergedGraphs.length ? [...mergedGraphs] : []),
              ...(switchToggle
                ? [
                    {
                      x: data?.x.map((m) => {
                        if (!m) return null;
                        else return String(m);
                      }),
                      y: data?.ConfrimHigh.map((m, i) => {
                        if (!m) return null;
                        else return data.high[i];
                      }),
                      xaxis: "x",
                      name: "Confrim High",
                      yaxis: "y",
                      mode: "markers",
                      type: "scatter",
                      marker: {
                        size: 4,
                        color: "green",
                        symbol: "diamond",
                      },
                    },
                  ]
                : []),
              ...(switchToggle
                ? [
                    {
                      x: data.x.map((m) => {
                        if (!m) return null;
                        else return new Date(m);
                      }),
                      y: data.ConfrimLow.map((m, i) => {
                        if (!m) return null;
                        else return data.low[i];
                      }),
                      xaxis: "x",
                      name: "Confrim Low",
                      yaxis: "y",
                      mode: "markers",
                      marker: {
                        size: 4,
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
                layout={{
                  dragmode: "zoom",
                  margin: {
                    r: 10,
                    t: 1,
                    b: 40,
                    l: 20,
                  },
                  showlegend: true,
                  legend: { orientation: "h" },
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
                }}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
