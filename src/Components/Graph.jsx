import React, { useEffect, useState } from "react";
import { drawFirstDateLine, drawStrategiesBar } from "../Utils/utils";
import "../App.css";
import Plot from "react-plotly.js";
import { drawFVGPatterns, drawVicinityPatterns } from "../Utils/patternUtils";
import { CircularProgress } from "@mui/material";

export const Graph = ({
    data,
    layout,
    templates,
    loader,
    separateGraphs,
    onHover,
    onUnhover,
    onClick,
    toggleFirstDayLine,
    onDoubleClick,
    id,
    setLayout,
    dualChartWidth,
    sidebarWidth,
    selectedStrategy,
    graphConfigs
}) => {
    document
        .querySelector('[data-title="Autoscale"]')
        ?.addEventListener("onclick", function (event) {});

    let [bottomTemplate, setBottomTemplates] = useState([]);
    useEffect(() => {
        let temp = [];
        separateGraphs?.length &&
            separateGraphs.forEach((spG) => {
                temp.push(spG);
                spG?.templates?.length &&
                    spG.templates?.forEach((t) => {
                        temp.push(t);
                    });
            });
        setBottomTemplates(temp);
    }, [separateGraphs]);

    return (
        <div>
            {loader && (
                <div className="loadingLabel">
                    <div className="loadingAnimation">
                        <CircularProgress
                            style={{ width: "200px", height: "200px" }}
                            color="primary"
                        />
                    </div>
                </div>
            )}
            {data && layout && (
                <div style={{ display: loader ? "none" : "block" }}>
                    <Plot
                        id={id}
                        onClick={onClick}
                        onDoubleClick={onDoubleClick}
                        onHover={onHover}
                        onUnhover={onUnhover}
                        data={[data, ...(templates || []), ...bottomTemplate]}
                        layout={{
                            ...layout,
                            shapes: [
                                ...drawFirstDateLine(toggleFirstDayLine, data),
                                ...(selectedStrategy.length < 2
                                    ? drawStrategiesBar(
                                          data.strategiesData,
                                          data
                                      )
                                    : []),
                                ...drawFVGPatterns(data, graphConfigs.pattern),
                                ...drawVicinityPatterns(data, graphConfigs.pattern),
                            ],
                        }}
                        config={{
                            scrollZoom: true,
                        }}
                        useResizeHandler={true}
                        onRelayout={(e) => {
                            if (e && e["xaxis.autorange"]) {
                                setLayout({
                                    ...layout,
                                    xaxis: {
                                        ...layout.xaxis,
                                        autorange: false,
                                        range: [
                                            data.x.length - 280,
                                            data.x.length - 1,
                                        ],
                                    },
                                    width:
                                        window.innerWidth -
                                        dualChartWidth -
                                        sidebarWidth,
                                    shapes: [
                                        ...drawFirstDateLine(
                                            toggleFirstDayLine,
                                            data
                                        ),
                                        ...drawStrategiesBar(
                                            data.strategiesData,
                                            data
                                        ),
                                        ...drawFVGPatterns(
                                            data,
                                            graphConfigs.pattern
                                        ),
                                        ...drawVicinityPatterns(data, graphConfigs.pattern),
                                    ],
                                });
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
};
