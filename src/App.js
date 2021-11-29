import React, { useState } from "react";
import "./App.css";
import { Graph } from "./Components/Graph";
import Header from "./Components/Header";
import { getAllStocks } from "./services/api";
import { templatesOptions } from "./templates/templates";

const dummy = {
  x: [],
  close: [],
  decreasing: { line: { color: "black" } },
  high: [],
  increasing: { line: { color: "black" } },
  line: { color: "rgba(31,119,180,1)" },
  low: [],
  open: [],
  type: "candlestick",
  xaxis: "x",
  yaxis: "y",
};

function App() {
  const [graphType, setGraphType] = useState("candlestick");
  const [subGraphs, setSubGraphs] = useState([]);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [templates, setTemplates] = useState([]);
  const style = { width: "100%", height: "100%" };

  const [layout] = useState({
    dragmode: "zoom",
    margin: { t: 0, l: 30, r: 0, b: 25 },
    showlegend: false,
    xaxis: {
      domain: [0, 1],
      rangeslider: {
        visible: false,
      },
      title: "Date",
      type: "date",
    },
    yaxis: {
      domain: [0, 1],
      autorange: true,
    },
    autosize: true,
    height: 600,
    // xaxis2: { domain: [0, 1] },
    // yaxis2: { anchor: "y2", domain: [0.18, 0.38], range: [-140, 140] },

    // xaxis3: { domain: [0, 1] },
    // yaxis3: { anchor: "y3", domain: [0, 0.18], range: [115, 140] },
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
    console.log("template.subGraphs", tempData);
    addTemplate(tempData.id, tempData.template);
  };

  const [selectedStock, setSelectStock] = useState("MMM");
  const [selectedTime, setSelectTime] = useState("1h");

  const [data, setGraphData] = useState({ ...dummy });

  useState(() => {
    getAllStocks(
      `stocks?stock=${selectedStock?.toLowerCase()}&interval=${selectedTime}`
    ).then((res) => {
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
      console.log(x)
      setGraphData({ ...dummy, high, low, open, close, x });
    });
  }, []);

  const handleStockChange = (stock) => {
    setSelectStock(stock);
    stock &&
      getAllStocks(
        `stocks?stock=${stock?.toLowerCase()}&interval=${selectedTime}`
      ).then((res) => {
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
        setGraphData({ ...dummy, high, low, open, close, x });
      });
  };

  const hanldeSelectedTime = (time) => {
    setSelectTime(time);
    console.log(selectedTime)
    selectedStock &&
      getAllStocks(
        `stocks?stock=${selectedStock?.toLowerCase()}&interval=${time}`
      ).then((res) => {
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
        setGraphData({ ...dummy, high, low, open, close, x });
      });
  };
  return (
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
  );
}

export default App;
