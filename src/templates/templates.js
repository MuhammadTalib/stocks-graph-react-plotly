export const template1 = (data) => {
  return {
    graph: [
      {
        x: data.x,
        y: data.low,
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
        templateType: 1,
      },
    ],
    subGraphs: [
      {
        x: data.x,
        y: data.low,
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
        templateType: 1,
        mergedGraphs: [
          {
            x: data.x,
            y: data.a,
            xaxis: "x",
            yaxis: "y",
            marker: {
              color: "#90c7fc",
            },
            templateType: 1,
          },
          {
            x: data.x,
            y: data.high,
            xaxis: "x",
            yaxis: "y",
            type: "scatter",
            marker: {
              color: "red",
            },
            templateType: 1,
          },
          {
            x: data.x,
            y: data.open,
            type: "bar",
            marker: {
              color: data.open.map((m, i) =>
                m < data.close[i] ? "green" : "red"
              ),
            },
            xaxis: "x",
            yaxis: "y",
            templateType: 1,
          },
        ],
      },
    ],
  };
};

export const template2 = (data) => {
  return {
    graph: [
      {
        x: data.x,
        y: data.low.map((m, i) => (m + data.high[i]) / 2),
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "#90c7fc",
        },
        templateType: 2,
      },
      {
        x: data.x,
        y: data.low.map((m, i) => (m + data.high[i]) / 2 + 0.8999),
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "#90c7fc",
        },
        templateType: 2,
      },
    ],
    subGraphs: [],
  };
};

export const template3 = (data, axis) => {
  return {
    graph: [
      {
        x: data.x,
        y: data.low.map((m) => m + 10),
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
        templateType: 3,
      },
      {
        x: data.x,
        y: data.low.map((m) => m - 10),
        xaxis: "x",
        yaxis: "y",
        marker: {
          color: "blue",
        },
        templateType: 3,
      },
    ],
    subGraphs: [
      {
        x: data.x,
        y: data.open.map((m, i) => (m < data.close[i] ? m : m * -1)),
        type: "bar",
        marker: {
          color: "rgba(255,0,0,0.7)", // data.open.map((m, i) => (m < data.close[i] ? "green" : "red")),
        },
        xaxis: "x",
        yaxis: "y",
        templateType: 3,
        mergedGraphs: [
          {
            x: data.x,
            y: data.open.map((m, i) => (m < data.close[i] ? m : m * -1)),
            xaxis: "x",
            yaxis: "y",
            type: "scatter",
            marker: {
              color: "red",
            },
            templateType: 3,
          },
        ],
      },
      {
        x: data.x,
        y: data.open.map((m, i) => (m < data.close[i] ? m : m * -1)),
        type: "bar",
        marker: {
          color: "rgba(0,0,255,0.7)", // data.open.map((m, i) => (m < data.close[i] ? "green" : "red")),
        },
        xaxis: "x",
        yaxis: "y",
        templateType: 3,
        mergedGraphs: [
          {
            x: data.x,
            y: data.low,
            xaxis: "x",
            yaxis: "y",
            marker: {
              color: "blue",
            },
            templateType: 3,
          },
        ],
      },
    ],
  };
};
export const templatesOptions = (data) => [
  { name: "T1", id: 1, template: { ...template1(data) } },
  { name: "T2", id: 2, template: { ...template2(data) } },
  { name: "T3", id: 3, template: { ...template3(data) } },
  // { name: "T4", id: 4, template: template1 },
  // { name: "T5", id: 5, template: template1 },
  // { name: "T6", id: 6, template: template1 },
];
