import React, { useState } from "react";
import "./App.css";
import { Graph } from "./Components/Graph";
import Header from "./Components/Header";
import { getAllStocks } from "./services/api";
import { templatesOptions } from "./templates/templates";

const dummy = {
  x: [],
  close: [],
  decreasing: {
    size: 8,
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
const candleDefault = 215 + rightMargin;

function App() {
  const [loader, setLoader] = useState(false);

  const [graphType, setGraphType] = useState("candlestick");
  const [subGraphs, setSubGraphs] = useState([]);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [templates, setTemplates] = useState([]);
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
      title: "Date",
      type: "date",
    },
    yaxis: {
      domain: [0, 1],
      // autorange: true,
      range: [169, 187],
      rangeslider: {
        visible: false,
      },
      position: 1,
      side: "bottom",
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
    // addTemplate(tempData.id, tempData.template);
    getDataRequest(selectedStock, selectedTime, tempData.id);
  };

  const [selectedStock, setSelectStock] = useState("MMM");
  const [selectedTime, setSelectTime] = useState({ name: "1d", ms: 86400000 });

  const [data, setGraphData] = useState({ ...dummy });

  const getDataRequest = (stock, time, template) => {
    setLoader(true);
    let url = `stocks?stock=${stock?.toLowerCase()}&interval=${time.name}`;
    if (template) {
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
        // if (responseData.length < candleDefault) {
        //   let startNull = candleDefault - responseData.length;
        //   console.log("startNull", startNull);
        //   console.log(
        //     "responseData[0]",
        //     responseData[0].date,
        //     new Date(Date.now(new Date(responseData[0].date)))
        //   );
        //   console.log(
        //     "responseData[0]",
        //     new Date(Date.now(responseData[0].date) - (0 + 1) * time.ms)
        //   );
        //   let candle = {};
        //   Object.entries(responseData[0]).map((m) => {
        //     candle[m[0]] = m[1];
        //   });
        //   console.log("candle", candle);

        //   for (let i = 0; i < startNull; i++) {
        //     let d = new Date(
        //       Date.now(responseData[0].date) - (i + 1) * time.ms
        //     );
        //     console.log("candle[ ", d);
        //     responseData.unshift({ ...candle, date: d });
        //   }
        // }
        let high = [],
          low = [],
          open = [],
          close = [],
          x = [];
        let EMA0 = [];
        let EMA1 = [];
        let EMA2 = [];
        responseData?.forEach((m) => {
          high.push(m.high);
          low.push(m.low);
          open.push(m.open);
          close.push(m.close);
          EMA0.push(m.indicators?.EMA0);
          EMA1.push(m.indicators?.EMA1);
          EMA2.push(m.indicators?.EMA2);
          x.push(new Date(m.date));
        });

        let lowLowest = Math.min(...low.filter((f) => f !== null));
        let closeLowest = Math.min(...close.filter((f) => f !== null));
        let lowest = lowLowest > closeLowest ? closeLowest : lowLowest;

        let highHighest = Math.min(...low.filter((f) => f !== null));
        let openHighest = Math.max(...close.filter((f) => f !== null));
        let highest = openHighest > highHighest ? openHighest : highHighest;

        for (let i = 0; i < rightMargin; i++) {
          high.push(null);
          low.push(null);
          open.push(null);
          close.push(null);
          EMA0.push(null);
          EMA1.push(null);
          EMA2.push(null);
          x.push(new Date(Date.now(x[x.length - 1]) + (i + 1) * time.ms));
        }

        setGraphData({ ...dummy, high, low, open, close, x, EMA0, EMA1, EMA2 });
        setLayout({
          ...layout,
          yaxis: { ...layout.yaxis, range: [lowest, highest] },
          xaxis: {
            ...layout.xaxis,
            range: [
              new Date(Date.now(x[x.length - 1]) - candleDefault * time.ms),
              new Date(x[x.length - 1]),
            ],
            rangeslider: {
              visible: false,
            },
          },
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
          <Graph
            time={selectedTime}
            style={style}
            data={{ ...data, type: graphType }}
            layout={layout}
            templates={
              data.EMA0
                ? [
                    {
                      x: data.x,
                      y: data.EMA0,
                      xaxis: "x",
                      yaxis: "y",
                      marker: {
                        color: "blue",
                      },
                    },
                    {
                      x: data.x,
                      y: data.EMA1,
                      xaxis: "x",
                      yaxis: "y",
                      marker: {
                        color: "blue",
                      },
                    },
                    {
                      x: data.x,
                      y: data.EMA2,
                      xaxis: "x",
                      yaxis: "y",
                      marker: {
                        color: "blue",
                      },
                    },
                  ]
                : []
            }
            loader={loader}
          />
          {subGraphs.map((m) => (
            <Graph
              key={m}
              style={{ width: "100%" }}
              data={{ ...m }}
              layout={{ ...layout, autosize: true, height: 150 }}
              templates={m.mergedGraphs}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
