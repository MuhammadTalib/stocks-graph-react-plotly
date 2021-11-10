export const template1 = (data, axis) => [
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
  {
    x: data.x,
    y: data.low,
    xaxis: "x" + axis,
    yaxis: "y" + axis,
    marker: {
      color: "blue",
    },
    templateType: 1,
  },
  {
    x: data.x,
    y: data.a,
    xaxis: "x" + axis,
    yaxis: "y" + axis,
    marker: {
      color: "#90c7fc",
    },
    templateType: 1,
  },
  {
    x: data.x,
    y: data.high,
    xaxis: "x" + axis,
    yaxis: "y" + axis,
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
      color: data.open.map((m, i) => (m < data.close[i] ? "green" : "red")),
    },
    xaxis: "x" + axis,
    yaxis: "y" + axis,
    templateType: 1,
  },
];

export const template2 = (data) => [
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
];

export const template3 = (data, axis) => [
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
  {
    x: data.x,
    y: data.low,
    xaxis: "x" + axis,
    yaxis: "y" + axis,
    marker: {
      color: "blue",
    },
    templateType: 1,
  },
  {
    x: data.x,
    y: data.a,
    xaxis: "x" + axis,
    yaxis: "y" + axis,
    marker: {
      color: "#90c7fc",
    },
    templateType: 1,
  },
  {
    x: data.x,
    y: data.open.map((m, i) => (m < data.close[i] ? m : m * -1)),
    xaxis: "x" + axis,
    yaxis: "y" + axis,
    type: "scatter",
    marker: {
      color: "red",
    },
    templateType: 1,
  },
  {
    x: data.x,
    y: data.open.map((m, i) => (m < data.close[i] ? m : m * -1)),
    type: "bar",
    marker: {
      color: data.open.map((m, i) => (m < data.close[i] ? "green" : "red")),
    },
    xaxis: "x" + axis,
    yaxis: "y" + axis,
    templateType: 1,
  },
];
export const templatesOptions = [
  { name: "T1", id: 1, template: template1 },
  { name: "T2", id: 2, template: template2 },
  { name: "T3", id: 3, template: template3 },
  { name: "T4", id: 4, template: template1 },
  { name: "T5", id: 5, template: template1 },
  { name: "T6", id: 6, template: template1 },
];
