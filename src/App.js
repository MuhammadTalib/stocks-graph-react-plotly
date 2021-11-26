import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Graph } from "./Components/Graph";
import Header from "./Components/Header";
import { templatesOptions } from "./templates/templates";
import { getAllStocks } from "./services/api";

const dummy = {
  x: [
    "2017-01-04",
    "2017-01-05",
    "2017-01-06",
    "2017-01-07",
    "2017-01-08",
    "2017-01-09",
    "2017-01-10",
    "2017-01-11",
    "2017-01-12",
    "2017-01-13",
    "2017-01-14",
    "2017-01-15",
    "2017-01-16",
    "2017-01-17",
    "2017-01-18",
    "2017-01-19",
    "2017-01-20",
    "2017-01-21",
    "2017-01-22",
    "2017-01-23",
    "2017-01-24",
    "2017-01-25",
    "2017-01-26",
    "2017-01-27",
    "2017-01-28",
    "2017-01-29",
    "2017-01-30",
    "2017-01-31",
    "2017-02-01",
    "2017-02-02",
    "2017-02-03",
    "2017-02-04",
    "2017-02-05",
    "2017-02-06",
    "2017-02-07",
    "2017-02-08",
    "2017-02-09",
    "2017-02-10",
    "2017-02-11",
    "2017-02-12",
    "2017-02-13",
    "2017-02-14",
    "2017-02-15",
    "2017-02-16",
    "2017-02-17",
    "2017-02-18",
    "2017-02-19",
    "2017-02-20",
    "2017-02-21",
    "2017-02-22",
    "2017-02-23",
    "2017-02-24",
    "2017-02-25",
    "2017-02-26",
    "2017-02-27",
    "2017-02-28",
    "2017-02-29",
    "2017-02-30",
    "2017-02-31",
  ],
  close: [
    116.019997, 116.610001, 117.910004, 118.989998, 119.110001, 119.75, 119.25,
    119.040001, 120, 119.989998, 119.779999, 120, 120.080002, 119.970001,
    121.879997, 121.940002, 121.949997, 121.629997, 121.349998, 128.75,
    128.529999, 129.080002, 130.289993, 131.529999, 132.039993, 132.419998,
    132.119995, 133.289993, 135.020004, 135.509995, 119.040001, 120, 119.989998,
    119.779999, 120, 120.080002, 119.970001, 116.019997, 116.610001, 117.910004,
    118.989998, 119.110001, 119.75, 119.25, 119.040001, 120, 119.989998,
    119.779999, 120, 120.080002, 119.970001, 121.879997, 121.940002, 121.949997,
    121.629997, 121.349998, 128.75, 128.529999, 129.080002, 130.289993,
    131.529999, 132.039993, 132.419998, 132.119995, 133.289993, 135.020004,
    135.509995, 119.040001, 120, 119.989998, 119.779999, 120, 120.080002,
    119.970001,
  ],
  decreasing: { line: { color: "black" } },
  high: [
    116.510002, 116.860001, 118.160004, 119.43, 119.379997, 119.93, 119.300003,
    119.620003, 120.239998, 120.5, 120.089996, 120.449997, 120.809998,
    120.099998, 122.099998, 122.440002, 122.349998, 121.629997, 130.389999,
    130.490005, 129.389999, 129.190002, 130.5, 132.089996, 132.220001,
    132.449997, 132.940002, 133.820007, 135.089996, 136.270004, 119.620003,
    120.239998, 120.5, 120.089996, 120.449997, 120.809998, 116.510002,
    116.860001, 118.160004, 119.43, 119.379997, 119.93, 119.300003, 119.620003,
    120.239998, 120.5, 120.089996, 120.449997, 120.809998, 120.099998,
    122.099998, 122.440002, 122.349998, 121.629997, 130.389999, 130.490005,
    129.389999, 129.190002, 130.5, 132.089996, 132.220001, 132.449997,
    132.940002, 133.820007, 135.089996, 136.270004, 119.620003, 120.239998,
    120.5, 120.089996, 120.449997, 120.809998,
  ],
  increasing: { line: { color: "black" } },
  line: { color: "rgba(31,119,180,1)" },
  low: [
    115.75, 115.809998, 116.470001, 117.940002, 118.300003, 118.599998,
    118.209999, 118.809998, 118.220001, 119.709999, 119.370003, 119.730003,
    119.769997, 119.5, 120.279999, 121.599998, 121.599998, 120.660004,
    120.620003, 127.010002, 127.779999, 128.160004, 128.899994, 130.449997,
    131.220001, 131.119995, 132.050003, 132.75, 133.25, 134.619995, 118.209999,
    118.809998, 118.220001, 119.709999, 119.370003, 119.730003, 115.75,
    115.809998, 116.470001, 117.940002, 118.300003, 118.599998, 118.209999,
    118.809998, 118.220001, 119.709999, 119.370003, 119.730003, 119.769997,
    119.5, 120.279999, 121.599998, 121.599998, 120.660004, 120.620003,
    127.010002, 127.779999, 128.160004, 128.899994, 130.449997, 131.220001,
    131.119995, 132.050003, 132.75, 133.25, 134.619995, 118.209999, 118.809998,
    118.220001, 119.709999, 119.370003, 119.730003,
  ],
  open: [
    115.849998, 115.919998, 116.779999, 117.949997, 118.769997, 118.739998,
    118.900002, 119.110001, 118.339996, 120, 119.400002, 120.449997, 120,
    119.550003, 120.419998, 121.669998, 122.139999, 120.93, 121.150002,
    127.029999, 127.980003, 128.309998, 129.130005, 130.539993, 131.350006,
    131.649994, 132.460007, 133.080002, 133.470001, 135.520004, 118.900002,
    119.110001, 118.339996, 120, 119.400002, 120.449997, 120, 115.849998,
    115.919998, 116.779999, 117.949997, 118.769997, 118.739998, 118.900002,
    119.110001, 118.339996, 120, 119.400002, 120.449997, 120, 119.550003,
    120.419998, 121.669998, 122.139999, 120.93, 121.150002, 127.029999,
    127.980003, 128.309998, 129.130005, 130.539993, 131.350006, 131.649994,
    132.460007, 133.080002, 133.470001, 135.520004, 118.900002, 119.110001,
    118.339996, 120, 119.400002, 120.449997, 120,
  ],
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
  const [selectedTime, setSelectTime] = useState("1d");

  const [data, setGraphData] = useState({ ...dummy });

  const handleStockChange = (stock) => {
    setSelectStock(stock);
    stock &&
      getAllStocks(`stocks?stock=${stock?.toLowerCase()}&interval=1h`).then(
        (res) => {
          let high = [],
            low = [],
            open = [],
            close = [],
            x = [];
          console.log(("res.data.data", res.data.data));
          res?.data?.data?.forEach((m) => {
            high.push(m.high);
            low.push(m.low);
            open.push(m.open);
            close.push(m.close);
            x.push(new Date(m.date));
          });
          setGraphData({ ...dummy, high, low, open, close, x });
        }
      );
  };

  const hanldeSelectedTime = (time) => {
    setSelectTime(time);
    selectedStock &&
      getAllStocks(
        `stocks?stock=${selectedStock?.toLowerCase()}&interval=${selectedTime}`
      ).then((res) => {
        let high = [],
          low = [],
          open = [],
          close = [],
          x = [];
        console.log(("res.data.data", res));
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
