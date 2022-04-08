import { initialLayout } from "./utils";

export const times = [
  { name: "1h", ms: 3600000 },
  { name: "1d", ms: 86400000 },
  { name: "1wk", ms: 604800000 },
  { name: "1mo", ms: 2629746000 },
];

export const rightMargin = 23;

export const months = [
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

export const T0 = {
  id: 0,
  name: "T0",
  merged: {},
  separate: {},
};

export const dummy = {
  x: [],
  name: "main",
  close: [],
  decreasing: {
    fillcolor: "black",
    line: { color: "black", width: 1 },
  },
  high: [],
  increasing: { fillcolor: "white", line: { color: "black", width: 1 } },
  low: [],
  open: [],
  type: "candlestick",
  hoverinfo: "x",
};

export const templates = [
  {
    name: "T0",
    id: 0,
    merged: {},
    separate: {},
  },
  {
    name: "T1",
    id: 1,
    merged: {
      EMA0: {
        data: [],
        xaxis: "x",
        name: `EMA 20`,
        yaxis: "y",
        mode: "line",
        type: "scatter",
        marker: {
          size: 4,
          color: "blue",
        },
        hoverinfo: "x",
      },
      EMA1: {
        data: [],
        name: "EMA 22",
        xaxis: "x",
        type: "scatter",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
      EMA2: {
        data: [],
        name: "EMA 26",
        type: "scatter",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
    },
    separate: {
      "Volume EMA": {
        // x: x,
        // y: volume,
        data: [],
        name: "Volume",
        marker: {
          color: "#9fa5c5",
        },
        yaxis: "y2",
        hoverinfo: "x",
      },
    },
    layout: {
      yaxis: { ...initialLayout.yaxis, domain: [0.3, 1] },
      yaxis2: { ...initialLayout.yaxis, domain: [0, 0.25] },
    },
  },
  {
    name: "T2",
    id: 2,
    merged: {
      EMA0: {
        data: [],
        xaxis: "x",
        name: `EMA 10`,
        yaxis: "y",
        mode: "line",
        type: "scatter",
        marker: {
          size: 4,
          color: "blue",
        },
      },
      EMA1: {
        data: [],
        name: "EMA 11",
        xaxis: "x",
        type: "scatter",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
      EMA2: {
        data: [],
        name: "EMA 13",
        type: "scatter",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
      EMA3: {
        data: [],
        xaxis: "x",
        yaxis: "y",
        name: "EMA 20",
        marker: {
          color: "red",
        },
      },
      EMA4: {
        data: [],
        name: "EMA 22",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "red",
        },
      },
      EMA5: {
        data: [],
        name: "EMA 26",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "red",
        },
      },
    },
    separate: {},
    layout: {
      yaxis: { ...initialLayout.yaxis, domain: [0, 1] },
    },
  },
  {
    name: "T3",
    id: 3,
    merged: {
      donchian_price0: {
        data: [],
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
      donchian_min0: {
        data: [],
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
      donchian_max0: {
        data: [],
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
    },
    separate: {
      "%R0": {
        data: [],
        name: "%R0",
        type: "bar",
        marker: {
          color: "blue",
        },
        yaxis: "y2",
      },
      "%R1": {
        data: [],
        name: "%R1",
        type: "bar",
        marker: {
          color: "red",
        },
        yaxis: "y3",
      },
    },
    layout: {
      yaxis: { ...initialLayout.yaxis, domain: [0.55, 1] },
      yaxis2: { ...initialLayout.yaxis, domain: [0.25, 0.5] },
      yaxis3: { ...initialLayout.yaxis, domain: [0, 0.25] },
      xaxis: { ...initialLayout.xaxis },
    },
  },
  {
    name: "T4",
    id: 4,
    merged: {
      SMA0: {
        data: [],
        name: "MMA 20",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "rgb(255,173,89)",
        },
      },
      SMA1: {
        data: [],
        name: "MMA 50",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "rgb(253,91,252)",
        },
      },
      SMA2: {
        data: [],
        name: "MMA 100",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "rgb(172,91,170)",
        },
      },
      SMA3: {
        data: [],
        name: "MMA 200",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "rgb(89,89,89)",
        },
      },
    },
    layout: {
      yaxis: { ...initialLayout.yaxis, domain: [0.5, 1] },
      yaxis2: {
        ...initialLayout.yaxis,
        domain: [0.3, 0.45],
        range: [-5, 5],
        autorange: false,
      },
      yaxis3: { ...initialLayout.yaxis, domain: [0.15, 0.3] },
      yaxis4: { ...initialLayout.yaxis, domain: [0, 0.15] },
      xaxis: { ...initialLayout.xaxis },
    },
    separate: {
      MACD0: {
        data: [],
        name: "MACD0",
        marker: {
          color: "blue",
        },
        xaxis: "x",
        yaxis: "y2",
      },
      MACDSIGNAL0: {
        data: [],
        name: "MACD SIGNAL",
        xaxis: "x",
        yaxis: "y2",
        marker: {
          color: "black",
        },
      },
      MACDHIST0: {
        data: [],
        name: "MACD HIST",
        type: "bar",
        xaxis: "x",
        yaxis: "y3",
        markerFn: (MACDHIST0) => {
          return {
            color: MACDHIST0.map((m, i) => (m > 0 ? "green" : "red")), //"black",
          };
        },
      },
      stochd0: {
        data: [],
        name: "stochd",
        marker: {
          color: "rgb(153,42,173)",
        },
        xaxis: "x",
        yaxis: "y4",
      },

      stochk0: {
        data: [],
        name: "stochk",
        xaxis: "x",
        yaxis: "y4",
        marker: {
          color: "rgb(13,0,255)",
        },
      },
      line1: {
        customLine: 20,
        data: [],
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
      line2: {
        data: [],
        customLine: 80,
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
    },
  },
  {
    name: "T5",
    id: 5,
    merged: {
      EMA0: {
        data: [],
        name: "EMA 20",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
      EMA1: {
        data: [],
        name: "EMA 50",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "rgb(255,0,56)",
        },
      },
      EMA2: {
        data: [],
        name: "EMA 100",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "rgb(13,190,58)",
        },
      },
      EMA3: {
        data: [],
        name: "EMA 200",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "black",
        },
      },
    },
    separate: {
      MACD0: {
        data: [],
        name: "MACD0",
        marker: {
          color: "blue",
        },
        xaxis: "x",
        yaxis: "y2",
      },
      MACDSIGNAL0: {
        data: [],
        name: "MACD SIGNAL",
        xaxis: "x",
        yaxis: "y2",
        marker: {
          color: "black",
        },
      },
      MACDHIST0: {
        data: [],
        name: "MACDHIST",
        type: "bar",
        xaxis: "x",
        yaxis: "y3",
        markerFn: (MACDHIST0) => {
          return {
            color: MACDHIST0.map((m, i) => (m > 0 ? "green" : "red")),
          };
        },
      },
      stochd0: {
        data: [],
        name: "stochd",
        marker: {
          color: "rgb(153,42,173)",
        },
        xaxis: "x",
        yaxis: "y4",
      },
      stochk0: {
        data: [],
        name: "stochk",
        xaxis: "x",
        yaxis: "y4",
        marker: {
          color: "rgb(13,0,255)",
        },
      },
      line1: {
        customLine: 20,
        data: [],
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
      line2: {
        customLine: 80,
        data: [],
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
    },
    layout: {
      yaxis: { ...initialLayout.yaxis, domain: [0.5, 1] },
      yaxis2: { ...initialLayout.yaxis, domain: [0.3, 0.45] },
      yaxis3: { ...initialLayout.yaxis, domain: [0.15, 0.3] },
      yaxis4: { ...initialLayout.yaxis, domain: [0, 0.15] },
      xaxis: { ...initialLayout.xaxis },
    },
  },
  {
    name: "T6",
    id: 6,
    merged: {
      EMA0: {
        data: [],
        name: "EMA 10",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
      EMA1: {
        data: [],
        name: "EMA 11",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
      EMA2: {
        data: [],
        name: "EMA 13",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
      EMA3: {
        data: [],
        name: "EMA 20",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "red",
        },
      },
      EMA4: {
        data: [],
        name: "EMA 22",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "red",
        },
      },
      EMA5: {
        data: [],
        name: "EMA 26",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "red",
        },
      },
    },
    layout: {
      yaxis: { ...initialLayout.yaxis, domain: [0.35, 1] },
      yaxis2: { ...initialLayout.yaxis, domain: [0, 0.3] },
      xaxis: { ...initialLayout.xaxis },
    },
    separate: {
      HIST0: {
        data: [],
        type: "bar",
        name: "HIST0",
        markerFn: (HIST0) => {
          return {
            color: HIST0.map((m, i) =>
              m > 0 ? "rgb(38,165,154)" : "rgb(254,82,82)"
            ), //"black",
          };
        },
        xaxis: "x",
        yaxis: "y2",
      },
    },
  },
  {
    name: "T7",
    id: 7,
    merged: {
      EMA0: {
        data: [],
        name: "EMA 5",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
      MA0: {
        data: [],
        name: "MA 10",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "black",
        },
      },
      MA1: {
        data: [],
        name: "MA 30",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "black",
        },
      },
    },
    separate: {
      RSI0: {
        data: [],
        name: "RSI0",
        marker: {
          color: "blue",
        },
        xaxis: "x",
        yaxis: "y2",
      },
      line1: {
        customLine: 80,
        data: [],

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
      line2: {
        customLine: 40,
        data: [],
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
      stochd0: {
        data: [],
        name: "stochd",
        marker: {
          color: "rgb(153,42,173)",
        },
        xaxis: "x",
        yaxis: "y3",
      },
      stochk0: {
        data: [],
        name: "stochk",
        xaxis: "x",
        yaxis: "y3",
        marker: {
          color: "rgb(13,0,255)",
        },
      },
      line3: {
        data: [],
        customLine: 20,
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
      line4: {
        data: [],
        customLine: 80,
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
    },
    layout: {
      yaxis: { ...initialLayout.yaxis, domain: [0.55, 1] },
      yaxis2: {
        ...initialLayout.yaxis,
        domain: [0.25, 0.5],
        range: [20, 80],
        autorange: false,
      },
      yaxis3: {
        ...initialLayout.yaxis,
        domain: [0, 0.25],
      },
      xaxis: { ...initialLayout.xaxis },
    },
  },
];
