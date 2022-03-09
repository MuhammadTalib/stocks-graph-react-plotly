export const times = [
  { name: "1h", ms: 3600000 },
  { name: "1d", ms: 86400000 },
  { name: "1wk", ms: 604800000 },
  { name: "1mo", ms: 2629746000 },
];

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
  line: { color: "rgba(31,119,180,1)" },
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

export const drawPatternData = (data, selectedPattern) => {
  return data.patternData?.length
    ? [
        {
          x: data?.x,
          y: data.patternData.map((m, i) => {
            let perc10 = (data.high[i] - data.low[i]) / 10;
            if (m) {
              return data.close[i] < data.open[i]
                ? data.low[i] - perc10
                : data.high[i] + perc10;
            }
            return null;
          }),
          hovertemplate: `${selectedPattern}`,

          mode: "text",
          type: "scatter",
          name: " ",
          text: selectedPattern?.slice(0, 2),
          textfont: {
            family: "Times New Roman",
            color: "blue",
          },
          textposition: "bottom center",
          marker: { size: 12 },
        },
      ]
    : [];
};

export const drawConfirmHighAndLow = (switchToggle, data) => {
  return [
    ...(switchToggle
      ? [
          {
            x: data?.x,
            y: data?.ConfrimHigh.map((m, i) => {
              if (!m) return null;
              else return data.high[i];
            }),
            name: "Confirm High",
            mode: "markers",
            marker: {
              color: "blue",
              symbol: "diamond",
            },
          },
        ]
      : []),
    ...(switchToggle
      ? [
          {
            x: data?.x,
            y: data.ConfrimLow.map((m, i) => {
              if (!m) return null;
              else return data.low[i];
            }),
            name: "Confirm Low",
            mode: "markers",
            marker: {
              color: "red",
              symbol: "diamond",
            },
          },
        ]
      : []),
  ];
};
export const T0 = {
  id: 0,
  name: "T0",
  merged: {},
};

export const initialLayout = {
  dragmode: "pan",
  margin: {
    r: 10,
    t: 25,
    b: 40,
    l: 20,
  },
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
  width: window.innerWidth - 10,
  height: window.innerHeight - 50,
};
export const drawMergedChart = (selectedTemp, data, a) => {
  return selectedTemp.merged && Object.keys(selectedTemp.merged).length
    ? [
        ...Object.keys(selectedTemp.merged).map((key) => {
          return {
            ...selectedTemp.merged[key],
            x: data?.x,
            y: selectedTemp.merged[key].data.map((m) => {
              if (!m) return null;
              else return m;
            }),
            name: `${selectedTemp.merged[key].name} ${selectedTemp.merged[key].data[a]}`,
          };
        }),
      ]
    : [];
};
