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
};

export const templates = [
  {
    name: "T0",
    id: 0,
  },
  {
    name: "T1",
    id: 1,
    merged: {
      EMA0: {
        data: [],
        xaxis: "x",
        name: `EMA0`,
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
        name: "EMA1",
        xaxis: "x",
        type: "scatter",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
      EMA2: {
        data: [],
        name: "EMA2",
        type: "scatter",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
    },
  },
  {
    name: "T2",
    id: 2,
    merged: {
      EMA0: {
        data: [],
        xaxis: "x",
        name: `EMA0`,
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
        name: "EMA1",
        xaxis: "x",
        type: "scatter",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
      EMA2: {
        data: [],
        name: "EMA2",
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
        name: "EMA3",
        marker: {
          color: "red",
        },
      },
      EMA4: {
        data: [],
        name: "EMA4",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "red",
        },
      },
      EMA5: {
        data: [],
        name: "EMA5",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "red",
        },
      },
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
  },
  {
    name: "T4",
    id: 4,
    merged: {
      SMA0: {
        data: [],
        name: "SMA0",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "rgb(255,173,89)",
        },
      },
      SMA1: {
        data: [],
        name: "SMA1",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "rgb(253,91,252)",
        },
      },
      SMA2: {
        data: [],
        name: "SMA2",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "rgb(172,91,170)",
        },
      },
      SMA3: {
        data: [],
        name: "SMA3",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "rgb(89,89,89)",
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
        name: "EMA0",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
      EMA1: {
        data: [],
        name: "EMA1",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "rgb(255,0,56)",
        },
      },
      EMA2: {
        data: [],
        name: "EMA2",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "rgb(13,190,58)",
        },
      },
      EMA3: {
        data: [],
        name: "EMA3",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "black",
        },
      },
    },
  },
  {
    name: "T6",
    id: 6,
    merged: {
      EMA0: {
        data: [],
        name: "EMA0",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
      EMA1: {
        data: [],
        name: "EMA1",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
      EMA2: {
        data: [],
        name: "EMA2",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
      EMA3: {
        data: [],
        name: "EMA3",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "red",
        },
      },
      EMA4: {
        data: [],
        name: "EMA4",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "red",
        },
      },
      EMA5: {
        data: [],
        name: "EMA5",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "red",
        },
      },
    },
  },
  {
    name: "T7",
    id: 7,
    merged: {
      EMA0: {
        data: [],
        name: "EMA0",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
      },
      MA0: {
        data: [],
        name: "MA0",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "black",
        },
      },
      MA1: {
        data: [],
        name: "MA1",
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "black",
        },
      },
    },
  },
];
