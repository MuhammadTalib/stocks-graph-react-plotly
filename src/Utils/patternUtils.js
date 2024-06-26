import { isT3FailurePattern, isT3Pattern } from "./utils";

export const getPatternNameList = (patterns) => {
    let patternArr = patterns && Object.keys(patterns);
    return (
        Array.isArray(patternArr) &&
        patternArr.length &&
        patternArr?.filter((f) => {
            return ![
                "trigger",
                "trigger_failure",
                "trigger_failure_value",
                "trigger_value",
                "is_combo_pattern",
            ].find((t) => t === f);
        })
    );
};

export const drawPatternData = (data, selectedPattern, strategiesData) => {
    if (
        selectedPattern === "All Failure Patterns" ||
        selectedPattern === "FVG Up" ||
        selectedPattern === "FVG Down" ||
        (data.patternData && data.patternData.length && data.patternData[0].is_vicinity)
    ) {
        return [];
    }
    let patterns = data.patternData;
    let drawX = null;
    if (
        (data.patternData &&
            data.patternData[0] &&
            data.patternData[0].is_combo_pattern) ||
        selectedPattern === "All Reversal Patterns" ||
        selectedPattern === "S Combo Pattern" ||
        selectedPattern === "All T3 Patterns" ||
        isT3Pattern(selectedPattern) ||
        selectedPattern === "All High/Low Patterns" ||
        selectedPattern === "R/F Combo Pattern" ||
        strategiesData
    ) {
        patterns = data.patternData && data.patternData[0];
        let keys = data?.pattern_name_list || getPatternNameList(patterns);

        patterns = data.patternData.map((m) => {
            let ans = 0;
            if (Array.isArray(keys)) {
                for (let key of keys) {
                    if (m[key]) {
                        ans = isT3Pattern(selectedPattern)
                            ? m?.["pattern_end"]
                            : selectedPattern === "R/F Combo Pattern"
                            ? m?.["trigger"]
                            : 1;

                        break;
                    }
                }
            }

            return ans;
        });
    }

    if (isT3FailurePattern(selectedPattern)) {
        //for all failures
        drawX = data.patternData;
        patterns = data.patternData.map((m) => {
            let ans = 0;
            ans = m?.["failure_trigger"];
            return ans;
        });

        drawX = data.patternData.map((m) => {
            let ans = 0;
            ans = m?.["pattern_end"];
            return ans;
        });
    }

    return patterns?.length
        ? [
              ...(drawX && drawX.length
                  ? [
                        {
                            // to draw x on T3 Failures
                            x: data?.x,
                            y: drawX?.map((m, i) => {
                                let perc10 =
                                    ((data.max - data.min) / 100) * 2.5;
                                if (m) {
                                    if (data.close[i] > data.open[i]) {
                                        return Number(data.low[i]) - perc10;
                                    } else {
                                        return Number(data.high[i]) + perc10;
                                    }
                                }
                                return null;
                            }),
                            showlegend: false,
                            mode: "markers",
                            marker: {
                                color: drawX?.map((m, i) => {
                                    if (m) {
                                        return "red";
                                    }
                                    return null;
                                }),
                                symbol: drawX.map((m, i) => {
                                    if (m) {
                                        return "x";
                                    }
                                    return null;
                                }),
                                size: 7,
                            },
                            hoverinfo: "skip",
                        },
                    ]
                  : []),
              {
                  //to normal pattern draw including T3 Failure arrows
                  x: data?.x,
                  y: patterns?.map((m, i) => {
                      let perc10 = ((data.max - data.min) / 100) * 2.5;
                      if (m) {
                          if (data.close[i] > data.open[i]) {
                              return Number(data.low[i]) - perc10;
                          } else {
                              return Number(data.high[i]) + perc10;
                          }
                      }
                      return null;
                  }),
                  showlegend: false,
                  mode: "markers",
                  marker: {
                      color: patterns?.map((m, i) => {
                          if (m) {
                              if (selectedPattern === "All High/Low Patterns") {
                                  return "red";
                              }
                              if (data.close[i] < data.open[i]) {
                                  return "red";
                              }
                              return "green";
                          }
                          return null;
                      }),
                      symbol: patterns.map((m, i) => {
                          if (m) {
                              if (selectedPattern === "All High/Low Patterns") {
                                  return "x";
                              }
                              if (data.close[i] < data.open[i]) {
                                  return "triangle-down";
                              }
                              return "triangle-up";
                          }
                          return null;
                      }),
                      size: 7,
                  },
                  hoverinfo: "skip",
              },
          ]
        : [];
};

export const drawFVGPatternsMarker = (
    data,
    selectedPattern,
    strategiesData
) => {
    if (selectedPattern === "All Failure Patterns") {
        return [];
    }
    let patterns = data.patternData;
    return patterns?.length
        ? [
              {
                  //to normal pattern draw including T3 Failure arrows
                  x: data?.x,
                  y: patterns?.map((m, i) => {
                      let perc10 = ((data.max - data.min) / 100) * 2.5;
                      if (m) {
                          if (data.close[i] > data.open[i]) {
                              return Number(data.low[i]) - perc10;
                          } else {
                              return Number(data.high[i]) + perc10;
                          }
                      }
                      return null;
                  }),
                  showlegend: false,
                  mode: "markers",
                  marker: {
                      color: patterns?.map((m, i) => {
                          if (m) {
                              return "red";
                          }
                          return null;
                      }),
                      symbol: patterns.map((m, i) => {
                          if (m) {
                              return "square-open";
                          }
                          return null;
                      }),
                      size: 7,
                  },
                  hoverinfo: "skip",
              },
          ]
        : [];
};

export const drawFVGPatterns = (data, selectedPattern) => {
    if (selectedPattern !== "FVG Down" && selectedPattern !== "FVG Up") {
        return [];
    }
    let frames = [];
    data?.patternData?.forEach((d, i) => {
        if (d.pattern_end) {
            frames.push({
                type: "rect",
                x0: i - 2,
                x1: i,
                y1: d.point_1,
                y0: d.point_4,
                line: {
                    color: "red",
                    width: 1.5,
                },
                hoverinfo: "x",
            });
            frames.push({
                type: "line",
                x0: i - 2,
                x1: i,
                y1: d.point_1 + (d.point_4 - d.point_1) / 2,
                y0: d.point_1 + (d.point_4 - d.point_1) / 2,
                line: {
                    color: "red",
                    width: 1.5,
                    dash: "dot",
                },
                hoverinfo: "x",
            });
        }
    });
    return frames;
};

export const drawVicinityPatterns = (data, selectedPattern) => {
    let isVicinity =
        data &&
        data.patternData &&
        data.patternData.length &&
        data.patternData[0].is_vicinity;


    if (!isVicinity) {
        return [];
    }
    let frames = [];
    data?.patternData?.forEach((d, i) => {
        if (d.pattern_end && d.is_vicinity) {
            frames.push({
                type: "line",
                x0: i - d.vicinity_distance,
                x1: i + 1,
                y1: d.vicinity_upper_point,
                y0: d.vicinity_upper_point,
                line: {
                    color: "red",
                    width: 1.5,
                },
                hoverinfo: "x",
            });
            frames.push({
                type: "line",
                x0: i - d.vicinity_distance,
                x1: i + 1,
                y1: d.vicinity_mid_point,
                y0: d.vicinity_mid_point,
                line: {
                    color: "red",
                    width: 1.5,
                    dash: "dot",
                },
                hoverinfo: "x",
            });
            frames.push({
                type: "line",
                x0: i - d.vicinity_distance,
                x1: i + 1,
                y1: d.vicinity_lower_point,
                y0: d.vicinity_lower_point,
                line: {
                    color: "red",
                    width: 1.5,
                },
                hoverinfo: "x",
            });
        }
    });
    return frames;
};

export const drawPatternTriggers = (data, strategiesData, selectedPattern) => {
    if (selectedPattern === "R/F Combo Pattern") {
        return;
    }
    if (selectedPattern === "R/F Combo Pattern") {
        return;
    }
    let patterns = data.patternTrigger;

    if (strategiesData) {
        let keys = data?.pattern_name_list || getPatternNameList(patterns);
        patterns = data.patternTrigger.map((m) => {
            let ans = null;
            if (Array.isArray(keys)) {
                for (let key of keys) {
                    if (m[key]?.trigger) {
                        ans = m[key];
                        break;
                    }
                }
            }
            return ans;
        });
    }

    return patterns?.length
        ? [
              {
                  x: data?.x,
                  y: patterns?.map((m, i) => {
                      if (m?.trigger) {
                          return Number(m.trigger_value);
                      }
                      return null;
                  }),
                  showlegend: false,
                  mode: "markers",
                  marker: {
                      color: patterns?.map((m, i) => {
                          if (m?.trigger) {
                              return "red";
                          }
                          return null;
                      }),
                      symbol: patterns.map((m, i) => {
                          if (m?.trigger) {
                              return "x";
                          }
                          return null;
                      }),
                      size: 7,
                  },
                  hoverinfo: "skip",
              },
              {
                  x: data?.x,
                  y: patterns?.map((m, i) => {
                      let perc10 = ((data.max - data.min) / 100) * 2.5;
                      if (m?.trigger_failure) {
                          if (data.close[i] > data.open[i]) {
                              return m?.trigger_failure_value - perc10;
                          } else {
                              return m.trigger_failure_value + perc10;
                          }
                      }
                      return null;
                  }),
                  showlegend: false,
                  mode: "markers",
                  marker: {
                      color: patterns?.map((m, i) => {
                          if (m?.trigger_failure) {
                              if (data.close[i] < data.open[i]) {
                                  return "red";
                              }
                              return "green";
                          }
                          return null;
                      }),
                      symbol: patterns.map((m, i) => {
                          if (m?.trigger_failure) {
                              if (data.close[i] < data.open[i]) {
                                  return "triangle-down";
                              }
                              return "triangle-up";
                          }
                          return null;
                      }),
                      size: 7,
                  },
                  hoverinfo: "skip",
              },
          ]
        : [];
};
const formatDate = (originalDateStr) => {
    var originalDate = new Date(originalDateStr);
    originalDate.setHours(originalDate.getHours() - 5);
    // Format the date as "MM/DD/YYYY, HH:mm:ss"
    return (
        ("0" + (originalDate.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + originalDate.getDate()).slice(-2) +
        "/" +
        originalDate.getFullYear() +
        ", " +
        ("0" + originalDate.getHours()).slice(-2) +
        ":" +
        ("0" + originalDate.getMinutes()).slice(-2) +
        ":" +
        ("0" + originalDate.getSeconds()).slice(-2)
    );
};

export const drawSidePanelClickedPatternTrigger = (
    data,
    pointIndex,
    selectedTriggerFromPanel
) => {
    return selectedTriggerFromPanel
        ? [
              {
                  x: data?.x,
                  y: data.x.map((m, i) => {
                      let perc10 = ((data.max - data.min) / 100) * 2.5;
                      if (
                          formatDate(new Date(m)) ===
                          selectedTriggerFromPanel.date
                      ) {
                          if (data.close[i] > data.open[i]) {
                              return Number(data.low[i]) - perc10;
                          } else {
                              return Number(data.high[i]) + perc10;
                          }
                      }
                      return null;
                  }),
                  showlegend: false,
                  name: "Confirm Low " + data.low[pointIndex],
                  mode: "markers",
                  marker: {
                      color: data?.x.map((m, i) => {
                          if (!m) return null;
                          else {
                              if (data.close[i] < data.open[i]) {
                                  return "red";
                              }
                              return "green";
                          }
                      }),
                      symbol: data?.x.map((m, i) => {
                          if (!m) return null;
                          else {
                              if (data.close[i] < data.open[i]) {
                                  return "triangle-down";
                              }
                              return "triangle-up";
                          }
                      }),
                  },
                  hoverinfo: "skip",
              },
          ]
        : [];
};
