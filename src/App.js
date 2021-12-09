import React, { useState } from "react";
import "./App.css";
import { Graph } from "./Components/Graph";
import Header from "./Components/Header";
import { getAllStocks } from "./services/api";
import { templatesOptions } from "./templates/templates";

const dummy = {
  x: [],
  close: [],
  decreasing: { fillcolor: "black", line: { color: "black" } },
  high: [],
  increasing: { fillcolor: "white", line: { color: "black" } },
  line: { color: "rgba(31,119,180,1)" },
  low: [],
  open: [],
  type: "candlestick",
  xaxis: "x",
  yaxis: "y",
};
const rightMargin = 10;
const candleDefault = 214;

function App() {
  const [loader, setLoader] = useState(false);

  const [graphType, setGraphType] = useState("candlestick");
  const [subGraphs, setSubGraphs] = useState([]);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [templates, setTemplates] = useState([]);
  const style = { width: "100%", height: "100%" };

  const [layout, setLayout] = useState({
    dragmode: "zoom",
    margin: { t: 0, l: 30, r: 0, b: 25 },
    showlegend: false,
    xaxis: {
      domain: [0, 1],
      range: [
        new Date("Tue, 16 Jan 2021 18:30:00 GMT"),
        new Date("Wed, 08 Feb 2021 14:32:32 GMT"),
      ],
      rangeslider: {
        visible: false,
      },
      title: "Date",
      type: "date",
    },
    yaxis: {
      domain: [0, 1],
      autorange: true,
      position: 1,
      side: "bottom",
    },

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
    console.log("Arr", template.subGraphs);
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
    addTemplate(tempData.id, tempData.template);
  };

  const [selectedStock, setSelectStock] = useState("MMM");
  const [selectedTime, setSelectTime] = useState({ name: "1d", ms: 86400000 });

  const [data, setGraphData] = useState({ ...dummy });

  const getDataRequest = (stock, time) => {
    setLoader(true);
    getAllStocks(`stocks?stock=${stock?.toLowerCase()}&interval=${time.name}`)
      .then((res) => {
        setLoader(false);
        let high = [],
          low = [],
          open = [],
          close = [],
          x = [];
        res?.data?.data?.forEach((m) => {
          high.push(m.high);
          low.push(m.low);
          open.push(m.open);
          close.push(m.close);
          x.push(new Date(m.date));
        });
        for (let i = 0; i < rightMargin; i++) {
          high.push(null);
          low.push(null);
          open.push(null);
          close.push(null);
          x.push(new Date(Date.now(x[x.length - 1]) + (i + 1) * time.ms));
        }
        setGraphData({ ...dummy, high, low, open, close, x });
        setLayout({
          ...layout,
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
      {/* <Container> */}
      <div>
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
            style={style}
            data={{ ...data, type: graphType }}
            layout={layout}
            templates={templates}
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
      {/* </Container> */}
    </>
  );
}

export default App;
