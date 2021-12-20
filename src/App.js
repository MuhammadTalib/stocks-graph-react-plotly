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
// const candleDefault = 214 + rightMargin;

function App() {
  const [loader, setLoader] = useState(false);

  const [graphType, setGraphType] = useState("candlestick");
  // const [subGraphs, setSubGraphs] = useState([]);
  // const [selectedTemplates, setSelectedTemplates] = useState([]);
  // const [templates, setTemplates] = useState([]);

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
      range: [],
      rangeslider: {
        visible: false,
      },
      type: "date",
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

    // shapes: [
    //   {
    //     type: "rect",
    //     xref: "x",
    //     yref: "y",
    //     x0: "2021-10-25",
    //     y0: 179,
    //     x1: "2021-10-26",
    //     y1: 180.5,
    //     fillcolor: "yellow",
    //     opacity: 0.6,
    //     line: {
    //       width: 1,
    //       color: "green",
    //       opacity: 1,
    //     },
    //   },
    // ],
    autosize: true,
    height: 550,
  });

  const handleGrapthType = (type) => {
    setGraphType(type);
  };
  // const addTemplate = (id, template) => {
  //   if (selectedTemplates.indexOf(id) !== -1) {
  //     setTemplates([...templates.filter((f) => f.templateType !== id)]);
  //     setSubGraphs([...subGraphs.filter((f) => f.templateType !== id)]);
  //     setSelectedTemplates([...selectedTemplates.filter((f) => f !== id)]);
  //   } else {
  //     setSelectedTemplates([...selectedTemplates, id]);
  //     setTemplates([...templates, ...template.graph]);
  //     setSubGraphs([...subGraphs, ...template.subGraphs]);
  //   }
  // };

  const [selectedStock, setSelectStock] = useState("MMM");
  const [selectedTime, setSelectTime] = useState({ name: "1d", ms: 86400000 });
  const [selectedTemp, setSelectedTemp] = useState(0);

  const [data, setGraphData] = useState({ ...dummy });

  const getDataRequest = (stock, time, template) => {
    setLoader(true);
    let url = `stocks?stock=${stock?.toLowerCase()}&interval=${time.name}`;
    if (template > 0) {
      url = url + `&template=${template}`;
    }
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

        responseData?.forEach((m) => {
          high.push(m.high);
          low.push(m.low);
          open.push(m.open);
          close.push(m.close);
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
            donchian0.push(m.indicators?.donchian0);
          } else if (template === 4) {
            MACD0.push(m.indicators?.MACD0);
            MACD1.push(m.indicators?.MACD1);
            MACD2.push(m.indicators?.MACD2);
            MACDSIGNAL0.push(m.indicators?.MACDSIGNAL0);
            MACDHIST1.push(m.indicators?.MACDHIST1);
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
            SMA0.push(m.indicators?.SMA0);
            SMA1.push(m.indicators?.SMA1);
            SMA2.push(m.indicators?.SMA2);
            SMA3.push(m.indicators?.SMA3);
            stochd0.push(m.indicators?.stochd0);
            stochk0.push(m.indicators?.stochk0);
          } else if (template === 6) {
          } else if (template === 7) {
            EMA0.push(m.indicators?.EMA0);
            MA0.push(m.indicators?.MA0);
            MA1.push(m.indicators?.MA1);
            RSI0.push(m.indicators?.RSI0);
            stochd0.push(m.indicators?.stochd0);
            stochk0.push(m.indicators?.stochk0);
          } else if (template === 8) {
            MACD0.push(m.indicators?.MACD0);
            MACDHIST0.push(m.indicators?.MACDHIST0);
            MACDSIGNAL0.push(m.indicators?.MACDSIGNAL0);
            RSI0.push(m.indicators?.RSI0);
            stochd0.push(m.indicators?.stochd0);
            stochk0.push(m.indicators?.stochk0);
          }
        });

        let lowLowest = Math.min(...low.filter((f) => f !== null));
        let closeLowest = Math.min(...close.filter((f) => f !== null));
        let lowest = lowLowest > closeLowest ? closeLowest : lowLowest;

        let highHighest = Math.min(...low.filter((f) => f !== null));
        let openHighest = Math.max(...close.filter((f) => f !== null));
        let highest = openHighest > highHighest ? openHighest : highHighest;

        console.log("lowest", lowest, highest);

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
          } else if (template === 4) {
            MACD0.push(null);
            MACD1.push(null);
            MACD2.push(null);
            MACDSIGNAL0.push(null);
            MACDHIST1.push(null);
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
            SMA0.push(null);
            SMA1.push(null);
            SMA2.push(null);
            SMA3.push(null);
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
          } else if (template === 8) {
            MACD0.push(null);
            MACDHIST0.push(null);
            MACDSIGNAL0.push(null);
            RSI0.push(null);
            stochd0.push(null);
            stochk0.push(null);
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
              type: "scatter",
              marker: {
                color: "blue",
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
              y: donchian0,
              name: "DONCHAIN",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
          ]);
          setSeparateGraphs([
            {
              x: x,
              y: R0,
              name: "%R0",
              type: "bar",
              marker: {
                color: "blue",
              },
              xaxis: "x",
              yaxis: "y",
            },
            {
              x: x,
              y: R1,
              type: "bar",
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
              y: MACDHIST1,
              name: "MACD HIST",
              type: "bar",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: MACDHIST1.map((m, i) => (m > 0 ? "green" : "red")), //"black",
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
              y: SMA0,
              name: "SMA0",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: SMA1,
              name: "SMA1",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "rgb(255,0,56)",
              },
            },
            {
              x: x,
              y: SMA2,
              name: "SMA2",
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "rgb(13,190,58)",
              },
            },
            {
              x: x,
              y: SMA3,
              name: "SMA3",
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
                  y: MACDHIST0,
                  name: "MACDHIST",
                  type: "bar",
                  xaxis: "x",
                  yaxis: "y",
                  marker: {
                    color: MACDHIST0.map((m, i) => (m > 0 ? "green" : "red")),
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
          setMergedGraphs([]);
          setSeparateGraphs([]);
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
        } else if (template === 8) {
          setMergedGraphs([]);
          setSeparateGraphs([
            {
              x: x,
              y: RSI0,
              name: "RSI0",
              marker: {
                color: "rgb(126,87,194)",
              },
              xaxis: "x",
              yaxis: "y",
            },
            {
              x: x,
              y: stochd0,
              name: "stochd",
              marker: {
                color: "rgb(255,109,0)",
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
                    color: "rgb(43,97,255)",
                  },
                },
              ],
            },
            {
              x: x,
              y: MACD0,
              name: "MACD0",
              marker: {
                color: "rgb(43,97,255)",
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
                    color: "rgb(255,109,0)",
                  },
                },
                {
                  x: x,
                  y: MACDHIST0,
                  type: "bar",
                  name: "MACD HIST",
                  xaxis: "x",
                  yaxis: "y",
                  marker: {
                    color: MACDHIST0.map((m, i) => (m > 0 ? "green" : "red")),
                  },
                },
              ],
            },
          ]);
        } else {
          setMergedGraphs([]);
          setSeparateGraphs([]);
        }
        setGraphData({ ...dummy, high, low, open, close, x });
        setLayout({
          ...layout,
          xaxis: {
            ...layout.xaxis,
            // range: [
            //   new Date(Date.now(x[x.length - 1]) - candleDefault * time.ms),
            //   new Date(x[x.length - 1]),
            //   // new Date(x[0]), // - candleDefault * time.ms),
            //   // new Date(x[x.length - 1]),
            // ],
          },
          yaxis: {
            ...layout.yaxis,
            rangeslider: {
              visible: false,
            },
            autorange: true,
            // range: [lowest, highest],
          },
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
    getDataRequest(stock, selectedTime, selectedTemp.id);
  };

  const hanldeSelectedTime = (time) => {
    setSelectTime(time);
    getDataRequest(selectedStock, time, selectedTemp.id);
  };

  const templateChange = (tempData) => {
    setSelectedTemp(tempData);
    getDataRequest(selectedStock, selectedTime, tempData.id);
  };

  return (
    <>
      {loader ? <div className="loader"></div> : <></>}
      <div style={{ padding: "10px" }}>
        <Header
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
        />

        <div id="fullscreen">
          <Graph
            style={style}
            data={{ ...data, type: graphType }}
            layout={layout}
            templates={mergedGraphs.length ? [...mergedGraphs] : []}
            loader={loader}
          />
          {!loader &&
            separateGraphs.map((m) => (
              <Graph
                key={m}
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
                    type: "date",
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
                  height: 190,
                }}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
