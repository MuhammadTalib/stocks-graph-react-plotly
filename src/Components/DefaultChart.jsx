import React, { useEffect, useRef, useState } from "react";

import { dummy } from "../Utils/defaults";
import {
    drawPatternData,
    drawPatternTriggers,
    drawSidePanelClickedPatternTrigger,
} from "../Utils/patternUtils";
import {
    drawConfirmHighAndLow,
    drawMergedChart,
    drawSeparateChart,
    getDataRequestService,
    getMetaIndicatorColorName,
    getOccuredReversalPatterns,
    isT3FailurePattern,
    isT3Pattern,
} from "../Utils/utils";
import { Graph } from "./Graph";
import InfoLines from "./InfoLines";
const style = { width: "100%", height: "100%", border: "1px solid red" };

export function DefaultChart({
    onHover,
    onUnhover,
    onClick,
    pointIndex,
    layout,
    toggleFirstDayLine,
    switchToggle,
    type,
    onDoubleClick,
    selectedTime,
    selectedCategory,
    id,
    setLayout,
    selectedStrategy,
    enableDualChart,
    sidebarWidth,
    dualChartWidth,
    dataBaseUrl,
    setStrategiesData,
    strategiesData,
    selectedTriggerFromPanel,
    graphConfigs,
}) {
    const [data, setGraphData] = useState({ ...dummy });
    const [currentSelectedTemp, setCurrentSelectedTemp] = useState(
        graphConfigs.template
    );
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setCurrentSelectedTemp(graphConfigs.template);
    }, [graphConfigs.template]);

    const prevCountRef = useRef();

    const getDataRequest = getDataRequestService(
        selectedCategory,
        setLoader,
        layout,
        setCurrentSelectedTemp,
        setGraphData,
        setLayout,
        graphConfigs.graphType,
        enableDualChart,
        sidebarWidth,
        dataBaseUrl,
        selectedStrategy,
        setStrategiesData,
        strategiesData
    );

    useEffect(() => {
        let addPreviousStrategy = true;
        if (graphConfigs.stock !== prevCountRef.current) {
            addPreviousStrategy = false;
        }
        prevCountRef.current = graphConfigs.stock;

        selectedTime &&
            getDataRequest(
                graphConfigs.stock,
                selectedTime,
                graphConfigs.template,
                graphConfigs.pattern,
                switchToggle,
                data,
                addPreviousStrategy
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        graphConfigs.stock,
        selectedTime,
        selectedCategory,
        graphConfigs,
        graphConfigs.pattern,
        switchToggle,
        graphConfigs.template.id,
        graphConfigs.graphType,
        enableDualChart,
        selectedStrategy,
    ]);

    return data && data?.x?.length ? (
        <>
            <InfoLines
                selectedStock={graphConfigs.stock}
                ohlc={{
                    high: data.high[pointIndex],
                    low: data.low[pointIndex],
                    open: data.open[pointIndex],
                    close: data.close[pointIndex],
                    ConfrimHigh: getMetaIndicatorColorName(
                        data,
                        pointIndex,
                        "ConfrimHigh"
                    ),
                    ConfrimLow: getMetaIndicatorColorName(
                        data,
                        pointIndex,
                        "ConfrimLow"
                    ),
                }}
                selectedPattern={
                    (data.patternData[pointIndex]
                        ? data.patternData[pointIndex].is_combo_pattern ||
                          graphConfigs.pattern === "All Reversal Patterns" ||
                          graphConfigs.pattern === "R/F Combo Pattern" ||
                          graphConfigs.pattern === "All Failure Patterns" ||
                          graphConfigs.pattern === "S Combo Pattern" ||
                          graphConfigs.pattern === "All T3 Patterns" ||
                          isT3Pattern(graphConfigs.pattern) ||
                          isT3FailurePattern(graphConfigs.pattern) ||
                          graphConfigs.pattern === "All High/Low Patterns" ||
                          data.strategiesData
                            ? getOccuredReversalPatterns(
                                  data.patternData,
                                  pointIndex,
                                  graphConfigs.pattern,
                                  data
                              )
                            : graphConfigs.pattern
                        : undefined) ||
                    (graphConfigs.pattern !== "R/F Combo Pattern" &&
                    data?.patternTrigger[pointIndex]?.trigger_failure
                        ? graphConfigs.pattern
                        : undefined)
                }
                patternTrigger={
                    graphConfigs.pattern === "R/F Combo Pattern"
                        ? 0
                        : data?.patternTrigger[pointIndex]?.trigger_failure
                }
                selectedTime={selectedTime}
                pointIndex={pointIndex}
                data={data}
            />
            <Graph
                id={id}
                onHover={onHover}
                onUnhover={onUnhover}
                onClick={onClick}
                onDoubleClick={() => onDoubleClick(type)}
                style={style}
                data={{ ...data, type: graphConfigs.graphType }}
                layout={layout}
                toggleFirstDayLine={toggleFirstDayLine}
                selectedPattern={graphConfigs.pattern}
                templates={[
                    ...drawMergedChart(
                        currentSelectedTemp,
                        data,
                        pointIndex,
                        graphConfigs.graphType
                    ), //templates T1 , T2 , T3
                    ...drawConfirmHighAndLow(switchToggle, data, pointIndex), //0 1 2 3
                    ...(drawPatternData(
                        data,
                        graphConfigs.pattern,
                        data.strategiesData
                    ) || []),
                    ...(drawPatternTriggers(
                        data,
                        data.strategiesData,
                        graphConfigs.pattern
                    ) || []),
                    ...(drawSidePanelClickedPatternTrigger(
                        data,
                        pointIndex,
                        selectedTriggerFromPanel
                    ) || []),
                ]}
                separateGraphs={[
                    ...drawSeparateChart(
                        currentSelectedTemp,
                        data,
                        pointIndex,
                        graphConfigs.graphType
                    ),
                ]}
                loader={loader}
                setLayout={setLayout}
                dualChartWidth={dualChartWidth}
                sidebarWidth={sidebarWidth}
                selectedStrategy={selectedStrategy}
                graphConfigs={graphConfigs}
            />
        </>
    ) : (
        <></>
    );
}
