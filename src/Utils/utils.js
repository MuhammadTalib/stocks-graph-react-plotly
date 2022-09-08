import { getAllStocks } from "../services/api";
import { dummy, months, rightMargin } from "./defaults";

function arrayMax(array) {
  return array.reduce(function (a, b) {
    return Math.max(a, b);
  });
}

function arrayMin(array) {
  return array.reduce(function (a, b) {
    return Math.min(a, b);
  });
}

export const drawConfirmHighAndLow = (switchToggle, data, pointIndex) => {
  return [
    ...(switchToggle
      ? [
          {
            x: data?.x,
            y: data?.ConfrimHigh.map((m, i) => {
              if (!m) return null;
              else return data.high[i];
            }),
            showlegend: false,
            name: data?.ConfrimHigh.map((m, i) => {
              if (!m) return null;
              else return "Confirm High " + data.high[pointIndex];
            }),
            mode: "markers",
            marker: {
              color: "blue",
              symbol: "diamond",
            },
            hoverinfo: "skip",
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
            showlegend: false,
            name: "Confirm Low " + data.low[pointIndex],
            mode: "markers",
            marker: {
              color: "red",
              symbol: "diamond",
            },
            hoverinfo: "skip",
          },
        ]
      : []),
  ];
};

export const drawMergedChart = (selectedTemp, data, a, graphType) => {
  let mergedCandles = [];
  if (selectedTemp.id === 6) {
    mergedCandles = [
      {
        ...dummy,
        type: graphType,
        name: "Red price",
        high:
          data.elder_impulse_system && data.elder_impulse_system.length
            ? data.realHigh &&
              data.realHigh.map((f_, iindex) => {
                if (!data.elder_impulse_system[iindex]) return f_;
                if (data.elder_impulse_system[iindex].is_red === 1) return f_;
                return null;
              })
            : data.realHigh,
        low: data.low,
        open: data.open,
        close: data.close,
        decreasing: {
          fillcolor: "red",
          line: { color: graphType === "ohlc" ? "red" : "black", width: 1 },
        },
        increasing: {
          fillcolor: "red",
          line: { color: graphType === "ohlc" ? "red" : "black", width: 1 },
        },
        x: data.x,
        ConfrimHigh: data.ConfrimHigh,
        ConfrimLow: data.ConfrimLow,
        patternData: data.patternData,
      },
      {
        ...dummy,
        type: graphType,
        name: "Green price",
        high:
          data.elder_impulse_system && data.elder_impulse_system.length
            ? data.realHigh &&
              data.realHigh.map((f_, iindex) => {
                if (!data.elder_impulse_system[iindex]) return f_;
                if (data.elder_impulse_system[iindex].is_green === 1) return f_;
                return null;
              })
            : data.realHigh,
        low: data.low,
        open: data.open,
        close: data.close,
        decreasing: {
          fillcolor: "green",
          line: { color: graphType === "ohlc" ? "green" : "black", width: 1 },
        },
        increasing: {
          fillcolor: "green",
          line: { color: graphType === "ohlc" ? "green" : "black", width: 1 },
        },
        x: data.x,
        ConfrimHigh: data.ConfrimHigh,
        ConfrimLow: data.ConfrimLow,
        patternData: data.patternData,
      },
    ];
  }
  return selectedTemp.merged && Object.keys(selectedTemp.merged).length
    ? [
        ...mergedCandles,
        ...Object.keys(selectedTemp.merged).map((key) => {
          return {
            ...selectedTemp.merged[key],
            x: data?.x,
            y: selectedTemp.merged[key].data.map((m) => {
              if (!m) return null;
              else return m;
            }),
            name: `${selectedTemp.merged[key].name} ${selectedTemp.merged[key].data[a]}`,
            hoverinfo: "x",
          };
        }),
      ]
    : [];
};

export const drawSeparateChart = (selectedTemp, data, pointIndex) => {
  return selectedTemp.separate && Object.keys(selectedTemp.separate).length
    ? [
        ...Object.keys(selectedTemp.separate).map((key) => {
          return {
            ...selectedTemp.separate[key],
            x: data?.x,
            y: selectedTemp.separate[key].data.map((m) => {
              if (!m) return null;
              else return m;
            }),
            ...(selectedTemp.separate[key].markerFn
              ? {
                  marker: selectedTemp.separate[key].markerFn(
                    selectedTemp.separate[key].data,
                    data
                  ),
                }
              : {}),
            name: `${selectedTemp.separate[key].name} ${selectedTemp.separate[key].data[pointIndex]}`,
            hoverinfo: "x",
          };
        }),
      ]
    : [];
};

export const drawStrategiesBar = (strategiesData, data) => {
  let dateIndex =
    strategiesData &&
    data.patternData.findLastIndex((f) => {
      return Object.values(f).includes(1);
    });

  return strategiesData && dateIndex >= 0
    ? [
        {
          type: "rect",
          text: "ddd",
          x0: dateIndex - 0.5,
          y0: 0,
          x1: dateIndex + 0.5,
          yref: "paper",
          y1: 1,
          line: {
            color: "#ffff00",
            width: 1.5,
          },
          hoverinfo: "x",
          fillcolor: "#ffff00",
          opacity: 0.6,
        },
      ]
    : [];
};

export const drawFirstDateLine = (toggleFirstDayLine, data) => {
  return toggleFirstDayLine
    ? data.x.slice(0, data.x.length - rightMargin).map((dateStr, dateIndex) => {
        let date_ = new Date(dateStr);
        let date1 = date_.getDate();
        let date2 = new Date(data.x[dateIndex - 1]).getDate();
        let date3 = new Date(data.x[dateIndex - 2]).getDate();

        if (
          date1 === 1 ||
          (date1 === 2 && date2 !== 1) ||
          (date1 === 3 && date3 !== 1 && date2 !== 2)
        ) {
          return {
            type: "line",
            text: "ddd",
            x0: String(dateStr),
            y0: 0,
            x1: String(dateStr),
            yref: "paper",
            y1: 1,
            line: {
              color: "grey",
              width: 1.5,
              dash: "dot",
            },
            hoverinfo: "x",
          };
        }
        return null;
      })
    : [];
};

export function getDataRequestService(
  selectedCategory,
  setLoader,
  layout,
  setSelectedTemp,
  setGraphData,
  setLayout,
  graphType,
  enableDualChart,
  sidebarWidth,
  dataBaseUrl,
  selectedStrategy
) {
  return async (
    stock,
    time,
    template,
    pattern,
    meta_trader_indicator,
    data
  ) => {
    let prevPatternData = data.patternData;
    let prevPatternTrigger = data.patternTrigger;

    document.querySelector('[data-title="Autoscale"]')?.click();
    if (!selectedCategory || !stock?.name || stock?.selectedSource) {
      return;
    }
    setLoader(true);

    let url = !selectedStrategy.length
      ? `stocks${
          dataBaseUrl || ""
        }?category=${selectedCategory}&symbol=${stock.name?.toLowerCase()}&source=${
          stock?.selectedSource || (stock?.sources?.length && stock.sources[0])
        }&interval=${time.name}`
      : `stocks/strategy_data_against_symbol?watch_list=${selectedCategory}&interval=${
          time.name
        }${
          selectedStrategy.length
            ? "&strategy_name=" + selectedStrategy[selectedStrategy.length - 1]
            : ""
        }&symbol=${stock.name?.toLowerCase()}&source=${
          stock?.selectedSource || (stock?.sources?.length && stock.sources[0])
        }`;
    if (template && template?.id > 0) {
      url = url + `&template=${template.id}`;
    }
    if (pattern?.length) {
      url = url + `&pattern=${pattern}`;
    }
    if (meta_trader_indicator) {
      url = url + `&meta_template=${meta_trader_indicator}`;
    }
    await getAllStocks(url)
      .then((res) => {
        setLoader(false);
        let pattern_name_list = res.data?.patterns_list;
        let responseData = [...res?.data?.data];

        let high = [];
        let low = [];
        let open = [];
        let close = [];
        let x = [];
        let patternData = [];
        let patternTrigger = [];

        let elder_impulse_system = [];
        let ConfrimHigh = [];
        let ConfrimLow = [];
        let tempMerged = template && template.merged;
        let resMerged = tempMerged;

        Object.keys(tempMerged).length &&
          Object.keys(tempMerged).forEach((key) => {
            resMerged[key].data = [];
          });

        let tempSeparate = template && template.separate;
        let resSeparate = tempSeparate;

        Object.keys(tempSeparate).length &&
          Object.keys(tempSeparate).forEach((key) => {
            resSeparate[key].data = [];
          });

        responseData?.forEach((_m, ith) => {
          let m = _m;
          high.push(m.high);
          low.push(m.low);
          open.push(m.open);
          close.push(m.close);

          if (meta_trader_indicator) {
            ConfrimHigh.push(m["meta-indicators"]["Confrim High"]);
            ConfrimLow.push(m["meta-indicators"]["Confrim Low"]);
          }

          if (
            (m[pattern]?.pattern_end !== undefined ||
              m[pattern]?.trigger_value !== undefined) &&
            m[pattern]?.trigger !== undefined
          ) {
            let patternObj = {
              trigger: m[pattern]?.trigger,
              trigger_value: m[pattern]?.trigger_value,
              trigger_value_max: m[pattern]?.trigger_value_max,
              trigger_value_min: m[pattern]?.trigger_value_min,
            };
            if (m[pattern]?.trigger_failure) {
              patternObj = {
                ...patternObj,
                trigger_failure: m[pattern]?.trigger_failure,
                trigger_failure_value: m[pattern]?.trigger_failure_value,
              };
            }
            patternData.push(m[pattern]?.pattern_end);
            patternTrigger.push(patternObj);
          } else if (m[pattern] !== undefined) {
            patternData.push(m[pattern]);
          }

          if (selectedStrategy.length) {
            let arrowPattern = {};
            let crossPattern = {};
            pattern_name_list.map((straIns) => {
              if (
                (m[straIns]?.pattern_end !== undefined ||
                  m[straIns]?.trigger_value !== undefined) &&
                m[straIns]?.trigger !== undefined
              ) {
                crossPattern[straIns] = {
                  trigger: m[straIns]?.trigger,
                  trigger_value: m[straIns]?.trigger_value,
                  trigger_value_max: m[straIns]?.trigger_value_max,
                  trigger_value_min: m[straIns]?.trigger_value_min,
                };
                arrowPattern[straIns] = m[straIns]?.pattern_end;
              }
            });
            patternData.push({ ...arrowPattern, ...data.patternData[ith] });
            patternTrigger.push({
              ...crossPattern,
              ...data.patternTrigger[ith],
            });
          }
          x.push(new Date(m.date).toUTCString());

          if (template) {
            tempMerged &&
              Object.keys(tempMerged).length &&
              Object.keys(tempMerged).forEach((key) => {
                resMerged[key].data = [
                  ...resMerged[key].data,
                  m.indicators[key],
                ];
              });

            tempSeparate &&
              Object.keys(tempSeparate).length &&
              Object.keys(tempSeparate).forEach((key) => {
                resSeparate[key].data = [
                  ...resSeparate[key].data,
                  resSeparate[key].customLine
                    ? resSeparate[key].customLine
                    : m.indicators[key],
                ];
              });

            if (template.id === 6) {
              elder_impulse_system.push(m.indicators?.elder_impulse_system);
            }
          }
        });
        let tempLayout = { ...layout, ...template.layout };
        for (let i = 0; i < rightMargin; i++) {
          high.push(null);
          low.push(null);
          open.push(null);
          close.push(null);
          x.push(
            new Date(
              Date.now(x[x.length - 1]) + (i + 1) * time.ms
            ).toUTCString()
          );
          if (template) {
            tempMerged &&
              Object.keys(tempMerged).forEach((key) => {
                resMerged[key].data = [...resMerged[key].data, null];
              });

            tempSeparate &&
              Object.keys(tempSeparate).forEach((key) => {
                resSeparate[key].data = [...resSeparate[key].data, null];
              });
          }
        }

        if (template) {
          setSelectedTemp({
            ...template,
            merged: resMerged,
            separate: resSeparate,
          });
        }

        setGraphData({
          ...dummy,
          realHigh: high,
          high: elder_impulse_system.length
            ? high.map((f_, iindex) => {
                if (!elder_impulse_system[iindex]) return f_;
                if (
                  elder_impulse_system[iindex].is_red !== 1 ||
                  elder_impulse_system[iindex].is_green !== 1
                )
                  return f_;
                return null;
              })
            : high,
          low,
          open,
          close,
          x,
          hovertext: high,
          increasing:
            template.id === 6
              ? {
                  fillcolor: "blue",
                  line: {
                    color: graphType === "ohlc" ? "blue" : "black",
                    width: 1,
                  },
                }
              : dummy.increasing,
          decreasing:
            template.id === 6
              ? {
                  fillcolor: "blue",
                  line: {
                    color: graphType === "ohlc" ? "blue" : "black",
                    width: 1,
                  },
                }
              : dummy.decreasing,
          ConfrimHigh,
          ConfrimLow,
          patternData,
          patternTrigger,
          pattern_name_list:
            selectedStrategy.length > 0
              ? [
                  ...(data?.pattern_name_list || []),
                  ...(pattern_name_list || []),
                ]
              : null,
          strategiesData: selectedStrategy.length ? true : false,
          elder_impulse_system,
          max: arrayMax(high),
          min: arrayMin(low.filter((f) => f !== 0 && f !== null)),
        });
        setLayout({
          ...tempLayout,
          width: enableDualChart
            ? (window.innerWidth - sidebarWidth) / 2
            : window.innerWidth - sidebarWidth,
          dualChartSet: enableDualChart,
          height: window.innerHeight - 80,
          xaxis: {
            ...layout.xaxis,
            rangeslider: {
              visible: false,
            },
            autorange: false,
            range: [x.length - 280, x.length - 1],
            tickvals: [
              ...x.filter((f, i) => {
                return i % 15 === 0;
              }),
            ],
            ticktext: [
              ...x
                .filter((f, i) => {
                  return i % 15 === 0;
                })
                .map((m) => {
                  let d = new Date(m);
                  return months[d.getMonth()] + " " + d.getUTCFullYear();
                }),
            ],
          },
          shapes: [
            ...high.map((shp, i) => {
              if (patternData[i]) {
                let lowP = Math.min(...[low[i], high[i], open[i], close[i]]);
                let highP = Math.max(...[low[i], high[i], open[i], close[i]]);
                let x0 = String(new Date(x[i - 1]).toUTCString());
                let x1 = String(new Date(x[i + 1]).toUTCString());
                return {
                  type: "rect",
                  xref: "x",
                  yref: "y",
                  x0: x0,
                  y0: lowP,
                  x1,
                  width: 1,
                  y1: highP,
                  fillcolor: "yellow",
                  opacity: 0.6,
                  rightMargin: 3,
                  line: {
                    width: 2,
                    color: open[i] < close[i] ? "green" : "red",
                    opacity: 1,
                  },
                  hoverinfo: "x",
                };
              }
              return null;
            }),
          ],
        });
      })
      .catch((err) => {
        console.log("err", err);
        setLoader(false);
        setGraphData(null);
      });
  };
}

export const OHLC_ICON = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 28"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path d="M17 11v6h3v-6h-3zm-.5-1h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5z"></path>
    <path d="M18 7h1v3.5h-1zm0 10.5h1V21h-1z"></path>
    <path d="M9 8v12h3V8H9zm-.5-1h4a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5z"></path>
    <path d="M10 4h1v3.5h-1zm0 16.5h1V24h-1z"></path>
  </svg>
);

export const BAR_ICON = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 28"
    width="24"
    height="24"
  >
    <g fill="none" stroke="currentColor" stroke-linecap="square">
      <path d="M10.5 7.5v15M7.5 20.5H10M13.5 11.5H11M19.5 6.5v15M16.5 9.5H19M22.5 16.5H20"></path>
    </g>
  </svg>
);

export const getTimeforSecondaryGraph = (time) => {
  switch (time.name) {
    case "1d":
    case "2d":
    case "3d":
      return { name: "1wk", desc: "1 Week", ms: 604800000 };
    case "1wk":
    case "2wk":
      return { name: "1mo", desc: "1 Month", ms: 2629746000 * 1 };
    default:
      return { name: "1d", desc: "1 Day", ms: 86400000 * 1 };
  }
};

export const getOccuredReversalPatterns = (patternData, pointIndex) => {
  let keys = patternData && patternData.length && Object.keys(patternData[0]);
  let occured = "";
  patternData.length &&
    Array.isArray(keys) &&
    keys.forEach((key, i) => {
      if (patternData?.[pointIndex]?.[key]) {
        if (occured.length > 0) occured += ", ";
        occured += key;
      }
    });
  return occured;
};
