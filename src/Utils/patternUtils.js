import { reversalPatterns } from "./defaults";

export const drawPatternData = (data, selectedPattern, strategiesData) => {
  let patterns = data.patternData;
  if (selectedPattern === "All Reversal Patterns") {
    patterns = data.patternData.map((m) => {
      let ans = 0;

      for (let key of reversalPatterns) {
        if (m[key]) {
          ans = 1;
          break;
        }
      }
      return ans;
    });
  }
  patterns =
    strategiesData?.["bearish_data"]?.map(
      (m, i) =>
        m?.["Bearish Double Close Outside Bar"] ||
        strategiesData?.["bullish_data"]?.[i]?.[
          "Bullish Double Close Outside Bar"
        ]
    ) || patterns;

  return patterns?.length
    ? [
        {
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
                if (data.close[i] < data.open[i]) {
                  return "red";
                }
                return "green";
              }
              return null;
            }),
            symbol: patterns.map((m, i) => {
              if (m) {
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

export const drawPatternTriggers = (data) => {
  let patterns = data.patternTrigger;

  return patterns?.length
    ? [
        {
          x: data?.x,
          y: patterns?.map((m, i) => {
            if (m.trigger) {
              return Number(m.failure_position);
            }
            return null;
          }),
          showlegend: false,
          mode: "markers",
          marker: {
            color: patterns?.map((m, i) => {
              if (m.trigger) {
                return "red";
              }
              return null;
            }),
            symbol: patterns.map((m, i) => {
              if (m.trigger) {
                return "x";
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
