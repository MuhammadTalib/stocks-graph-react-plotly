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
    autorange: false,
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

export const times = [
  { name: "1h", desc: "1 Hour", ms: 3600000 * 1 },
  { name: "2h", desc: "2 Hour", ms: 3600000 * 2 },
  { name: "4h", desc: "4 Hour", ms: 3600000 * 4 },
  { name: "6h", desc: "6 Hour", ms: 3600000 * 6 },
  { name: "8h", desc: "8 Hour", ms: 3600000 * 8 },
  { name: "12h", desc: "12 Hour", ms: 3600000 * 12 },
  { name: "18h", desc: "18 Hour", ms: 3600000 * 18 },
  { name: "1d", desc: "1 Day", ms: 86400000 * 1 },
  { name: "2d", desc: "2 Day", ms: 86400000 * 2 },
  { name: "3d", desc: "3 Day", ms: 86400000 * 3 },
  { name: "1wk", desc: "1 Week", ms: 604800000 },
  { name: "2wk", desc: "2 Week", ms: 604800000 * 2 },
  { name: "1mo", desc: "1 Month", ms: 2629746000 * 1 },
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
        data: [],
        name: "Volume",
        marker: {
          color: "#9fa5c5",
        },
        yaxis: "y2",
        hoverinfo: "x",
        type: "bar",
        markerFn: (_, data) => {
          return {
            color: data.open.map((m, i) =>
              m < data.close[i] ? "green" : "red"
            ),
          };
        },
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
        name: "DONCHIAN AVG",
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
        name: "DONCHAIN MIN",
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
        name: "DONCHAIN MAX",
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
        name: "%R(5)",
        type: "bar",
        marker: {
          color: "blue",
        },
        yaxis: "y2",
      },
      "%R1": {
        data: [],
        name: "%R(20)",
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
        name: "MACD LINE",
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
      line3: {
        data: [],
        customLine: 10,
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
      line4: {
        data: [],
        customLine: 90,
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
        name: "MACD LINE",
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
      line3: {
        data: [],
        customLine: 10,
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
      line4: {
        data: [],
        customLine: 90,
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
        name: "RSI(14)",
        marker: {
          color: "blue",
        },
        xaxis: "x",
        yaxis: "y2",
      },
      line1: {
        customLine: 60,
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
        customLine: 10,
        mode: "lines",
        xaxis: "x",
        showlegend: false,
        yaxis: "y3",
        line: {
          color: "blue",
          dash: "dash",
          width: 2,
        },
      },
      line4: {
        data: [],
        customLine: 90,
        mode: "lines",
        xaxis: "x",
        showlegend: false,
        yaxis: "y3",
        line: {
          color: "blue",
          dash: "dash",
          width: 2,
        },
      },
      line5: {
        data: [],
        customLine: 20,
        mode: "lines",
        xaxis: "x",
        showlegend: false,
        yaxis: "y3",
        line: {
          color: "blue",
          dash: "dash",
          width: 2,
        },
      },
      line6: {
        data: [],
        customLine: 80,
        mode: "lines",
        xaxis: "x",
        showlegend: false,
        yaxis: "y3",
        line: {
          color: "blue",
          dash: "dash",
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

export const strategies = [
  { value: "double-close", name: "Double close", columns: ["Double close"] },
];

export const reversalPatterns = [
  "Abandoned Baby",
  "Bearish Double Close Outside Bar",
  "Bullish Double Close Outside Bar",
  "Long Line Candle",
  "Multiple Inside Bars Minus",
  "Multiple Inside Bars Plus",
  "Piercing Pattern",
  "Popgun Minus",
  "Popgun Plus",
  "Rising/Falling Three Methods",
  "Three Advancing White Soldiers",
  "Three Black Crows",
  "Three Inside Down Modified",
  "Three Inside Up Modified",
  "Three Inside Up/Down",
  "Three Outside Up/Down",
  "Tristar Pattern",
  "Windows/Gap",
  "bearish_key_reversal_day",
  "bullish_key_reversal_day",
  "engulifish_shadow_bearish",
  "engulifish_shadow_bullish",
  "evening_turn",
  "island_bottom",
  "island_top",
  "modified_evening_morning_star",
  "morning_turn",
  "one_black_crow",
  "one_black_crow_modified",
  "one_white_soldier",
  "one_white_soldier_modified",
  "talib.CDLCLOSINGMARUBOZU",
  "talib.CDLDARKCLOUDCOVER",
  "talib.CDLENGULFING",
  "talib.CDLEVENINGDOJISTAR",
  "talib.CDLEVENINGSTAR",
  "talib.CDLMARUBOZU",
  "talib.CDLMORNINGDOJISTAR",
  "talib.CDLMORNINGSTAR",
  "talib.CDLPIERCING",
  "talib.CDLRISEFALL3METHODS",
  "tower_bottom",
  "tower_top",
];
