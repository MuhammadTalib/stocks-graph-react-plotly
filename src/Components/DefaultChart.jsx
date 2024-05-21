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

export function DefaultChart({
    onHover,
    onUnhover,
    onClick,
    pointIndex,
    graphType,
    style,
    layout,
    toggleFirstDayLine,
    switchToggle,
    selectedTemp,
    selectedPattern,
    type,
    onDoubleClick,
    selectedStock,
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
}) {
    const [data, setGraphData] = useState({ ...dummy });
    const [currentSelectedTemp, setCurrentSelectedTemp] = useState(selectedTemp);

    useEffect(() => {
        console.log("useEffect")
        setCurrentSelectedTemp(selectedTemp);
    }, [selectedTemp]);

    const [loader, setLoader] = useState(false);
    const prevCountRef = useRef();

    const getDataRequest = getDataRequestService(
        selectedCategory,
        setLoader,
        layout,
        setCurrentSelectedTemp,
        setGraphData,
        setLayout,
        graphType,
        enableDualChart,
        sidebarWidth,
        dataBaseUrl,
        selectedStrategy,
        setStrategiesData,
        strategiesData
    );

    useEffect(() => {
        console.log("currentSelectedTemp", currentSelectedTemp)
        console.log("selectedTemp", selectedTemp)

        let addPreviousStrategy = true;
        if (selectedStock !== prevCountRef.current) {
            addPreviousStrategy = false;
        }
        prevCountRef.current = selectedStock;

        selectedTime &&
            getDataRequest(
                selectedStock,
                selectedTime,
                currentSelectedTemp,
                selectedPattern,
                switchToggle,
                data,
                addPreviousStrategy
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        selectedStock,
        selectedTime,
        selectedCategory,
        selectedPattern,
        switchToggle,
        currentSelectedTemp.id,
        graphType,
        enableDualChart,
        selectedStrategy,
    ]);

    return data && data?.x?.length ? (
        <>
            <InfoLines
                selectedStock={selectedStock}
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
                          selectedPattern === "All Reversal Patterns" ||
                          selectedPattern === "R/F Combo Pattern" ||
                          selectedPattern === "All Failure Patterns" ||
                          selectedPattern === "S Combo Pattern" ||
                          selectedPattern === "All T3 Patterns" ||
                          isT3Pattern(selectedPattern) ||
                          isT3FailurePattern(selectedPattern) ||
                          selectedPattern === "All High/Low Patterns" ||
                          data.strategiesData
                            ? getOccuredReversalPatterns(
                                  data.patternData,
                                  pointIndex,
                                  selectedPattern,
                                  data
                              )
                            : selectedPattern
                        : undefined) ||
                    (selectedPattern !== "R/F Combo Pattern" &&
                    data?.patternTrigger[pointIndex]?.trigger_failure
                        ? selectedPattern
                        : undefined)
                }
                patternTrigger={
                    selectedPattern === "R/F Combo Pattern"
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
                style={{ ...style, border: "1px solid red" }}
                data={{ ...data, type: graphType }}
                layout={layout}
                toggleFirstDayLine={toggleFirstDayLine}
                selectedPattern={selectedPattern}
                templates={[
                    ...drawMergedChart(
                        currentSelectedTemp,
                        data,
                        pointIndex,
                        graphType
                    ), //templates T1 , T2 , T3
                    ...drawConfirmHighAndLow(switchToggle, data, pointIndex), //0 1 2 3
                    ...(drawPatternData(
                        data,
                        selectedPattern,
                        data.strategiesData
                    ) || []),
                    ...(drawPatternTriggers(
                        data,
                        data.strategiesData,
                        selectedPattern
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
                        graphType
                    ),
                ]}
                loader={loader}
                setLayout={setLayout}
                dualChartWidth={dualChartWidth}
                sidebarWidth={sidebarWidth}
                selectedStrategy={selectedStrategy}
            />
        </>
    ) : (
        <></>
    );
}
