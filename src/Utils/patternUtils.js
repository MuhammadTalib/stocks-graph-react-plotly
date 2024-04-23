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
    if (selectedPattern === "All Failure Patterns") {
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

export const drawPatternTriggers = (data, strategiesData, selectedPattern) => {
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
    switchToggle, data, pointIndex,
    // data,
    selectedTriggerFromPanel
) => {
    return selectedTriggerFromPanel? [
        {
            x: data?.x,
            y: data.x.map((m, i) => {
                let perc10 = ((data.max - data.min) / 100) * 2.5;
                console.log("talib--",selectedTriggerFromPanel, m, formatDate(new Date(m)) , selectedTriggerFromPanel.datetime)
                if(formatDate(new Date(m)) === selectedTriggerFromPanel.datetime){
                    console.log("talib", formatDate(m) , formatDate(selectedTriggerFromPanel.datetime))
                    if (data.close[i] > data.open[i]) {
                        return Number(data.low[i]) - perc10;
                    } else {
                        return Number(data.high[i]) + perc10;
                    }
                }
                return null
                
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
    ]:[]
    // let a =  selectedTriggerFromPanel ? [
    //     {
    //         x: data?.x,
    //         y: data.x.map((m,i) => {
    //             if (formatDate('Sun, 21 Apr 2024 21:00:00 GMT') === selectedTriggerFromPanel?.datetime) { return data.low[i]}
    //             else return null
    //         }),
    //         showlegend: false,
    //         // name: "Confirm Low " + data.low[pointIndex],
    //         mode: "markers",
    //         marker: {
    //             color: data.x?.map((m, i) => {
    //                 if (formatDate('Sun, 21 Apr 2024 21:00:00 GMT') === selectedTriggerFromPanel?.datetime) {
    //                     if (data.close[i] < data.open[i]) {
    //                         return "red";
    //                     }
    //                     return "green";
    //                 }
    //                 return null;
    //             }),
    //             symbol: data.x.map((m, i) => {
    //                 if (formatDate('Sun, 21 Apr 2024 21:00:00 GMT') === selectedTriggerFromPanel.datetime) {
    //                     if (data.close[i] < data.open[i]) {
    //                         return "triangle-down";
    //                     }
    //                     return "triangle-up";
    //                 }
    //                 return null;
    //             }),
    //             size: 7,
    //         },
    //         hoverinfo: "skip",
    //     },
    // ]:[];
    // console.log("atta", a)
    // return a
};
