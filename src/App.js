import React, { useState } from "react";
import "./App.css";
import { Graph } from "./Components/Graph";
import Header from "./Components/Header";
import { TempChart } from "./Components/TempChart";
import { getAllStocks } from "./services/api";
import { templatesOptions } from "./templates/templates";

const dummy = {
  x: [],
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
const candleDefault = 214 + rightMargin;

function App() {
  const [loader, setLoader] = useState(false);

  const [graphType, setGraphType] = useState("candlestick");
  const [subGraphs, setSubGraphs] = useState([]);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [templates, setTemplates] = useState([]);

  const [mergedGraphs, setMergedGraphs] = useState([]);
  const [separateGraphs, setSeparateGraphs] = useState([]);

  const style = { width: "100%", height: "100%" };

  const [layout, setLayout] = useState({
    dragmode: "zoom",
    margin: {
      r: 10,
      t: 25,
      b: 40,
      l: 60,
    },
    showlegend: false,
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
      // autorange: true,
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
  const addTemplate = (id, template) => {
    if (selectedTemplates.indexOf(id) !== -1) {
      setTemplates([...templates.filter((f) => f.templateType !== id)]);
      setSubGraphs([...subGraphs.filter((f) => f.templateType !== id)]);
      setSelectedTemplates([...selectedTemplates.filter((f) => f !== id)]);
    } else {
      setSelectedTemplates([...selectedTemplates, id]);
      setTemplates([...templates, ...template.graph]);
      setSubGraphs([...subGraphs, ...template.subGraphs]);
    }
  };
  const templateChange = (tempData) => {
    getDataRequest(selectedStock, selectedTime, tempData.id);
  };

  const [selectedStock, setSelectStock] = useState("MMM");
  const [selectedTime, setSelectTime] = useState({ name: "1d", ms: 86400000 });

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
        let MACDSIGNAL0 = [];
        let MACDHIST1 = [];
        let MACDSIGNAL2 = [];

        let MA0 = [];
        let MA1 = [];
        let RSI0 = [];

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
          } else if (template === 4) {
            MACD0.push(m.indicators?.MACD0);
            MACD1.push(m.indicators?.MACD1);
            MACD2.push(m.indicators?.MACD2);
            MACDSIGNAL0.push(m.indicators?.MACDSIGNAL0);
            MACDHIST1.push(m.indicators?.MACDHIST1);
            MACDSIGNAL2.push(m.indicators?.MACDSIGNAL2);
          } else if (template === 7) {
            EMA0.push(m.indicators?.EMA0);
            MA0.push(m.indicators?.MA0);
            MA1.push(m.indicators?.MA1);
            RSI0.push(m.indicators?.RSI0);
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
          } else if (template === 4) {
            MACD0.push(null);
            MACD1.push(null);
            MACD2.push(null);
            MACDSIGNAL0.push(null);
            MACDHIST1.push(null);
            MACDSIGNAL2.push(null);
          } else if (template === 7) {
            EMA0.push(null);
            MA0.push(null);
            MA1.push(null);
            RSI0.push(null);
          }
        }
        if (template === 1) {
          setMergedGraphs([
            {
              x: x,
              y: EMA0,
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: EMA1,
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: EMA2,
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
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: EMA1,
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: EMA2,
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: EMA3,
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "red",
              },
            },
            {
              x: x,
              y: EMA4,
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "red",
              },
            },
            {
              x: x,
              y: EMA5,
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "red",
              },
            },
          ]);
          setSeparateGraphs([]);
        } else if (template === 4) {
          setMergedGraphs([]);
          setSeparateGraphs([
            {
              x: x,
              y: MACD0,
              marker: {
                color: "blue",
              },
              xaxis: "x",
              yaxis: "y",
              templates: [
                {
                  x: x,
                  y: MACDSIGNAL0,
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
              y: MACD1,
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "black",
              },
              templates: [
                {
                  x: x,
                  y: MACDHIST1,
                  type: "bar",
                  xaxis: "x",
                  yaxis: "y",
                  marker: {
                    color: MACDHIST1.map((m, i) => (m > 0 ? "green" : "red")), //"black",
                  },
                },
              ],
            },
            {
              x: x,
              y: MACD2,
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
              templates: [
                {
                  x: x,
                  y: MACDSIGNAL2,
                  xaxis: "x",
                  yaxis: "y",
                  marker: {
                    color: "black",
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
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "blue",
              },
            },
            {
              x: x,
              y: MA0,
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "black",
              },
            },
            {
              x: x,
              y: MA1,
              xaxis: "x",
              yaxis: "y",
              marker: {
                color: "black",
              },
            },
          ]);
          setSeparateGraphs([]);
        }
        console.log("x", x);
        setGraphData({ ...dummy, high, low, open, close, x });
        setLayout({
          ...layout,
          yaxis: {
            ...layout.yaxis,
            rangeslider: {
              visible: false,
            },
            range: [lowest, highest],
          },
          // xaxis: {
          //   ...layout.xaxis,
          //   // autorange: true,
          //   // range: [
          //   //   // new Date(Date.now(x[x.length - 1]) - candleDefault * time.ms),
          //   //   // new Date(x[x.length - 1]),
          //   //   new Date(x[0]), // - candleDefault * time.ms),
          //   //   new Date(x[x.length - 1]),
          //   // ],
          //   // rangeslider: {
          //   //   visible: false,
          //   // },
          // },
        });
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  useState(() => {
    getDataRequest(selectedStock, selectedTime);
  }, []);

  const handleStockChange = (stock) => {
    setSelectStock(stock);
    getDataRequest(stock, selectedTime);
  };

  const hanldeSelectedTime = (time) => {
    setSelectTime(time);
    getDataRequest(selectedStock, time);
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
        />

        <div id="fullscreen">
          {/* <TempChart /> */}
          <Graph
            style={style}
            data={{ ...data, type: graphType }}
            layout={layout}
            templates={mergedGraphs.length ? [...mergedGraphs] : []}
            loader={loader}
          />
          {separateGraphs.map((m) => (
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
                  l: 60,
                },
                showlegend: false,
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
                height: 150,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
