import React, { useEffect, useRef, useState } from "react";

import { getTimeforSecondaryGraph } from "../Utils/utils";
import { DefaultChart } from "./DefaultChart";


const GraphRenderer = ({
  layout,
  enableDualChart,
  separateGraphs,
  toggleFirstDayLine,
  switchToggle,
  setLayout,
  selectedCategory,
  selectedStrategy,
  sidebarWidth,
  secondaryLayout,
  setSecondaryLayout,
  dataBaseUrl,
  setStrategiesData,
  strategiesData,
  selectedTriggerFromPanel,
  graphConfigs
}) => {
  // const [secondaryChartTime, setSecondayChartTime] = useState(null);

  // useEffect(() => {
  //   setSecondayChartTime(enableDualChart ? getTimeforSecondaryGraph(graphConfigs.time) : graphConfigs.time);
  // }, [graphConfigs.time, enableDualChart]);

  const [cursor, setCursor] = useState("crosshair");
  const [currentSelected, setCurrentSelected] = useState("");
  const [pointIndex, setPointIndex] = useState(1);

  const onHover = ({ points: [point] }) => {
    setPointIndex(point.pointIndex);
    setCursor("crosshair");
  };
  const onUnhover = () => {
    setCursor("crosshair");
  };
  const onClick = () => {
    setCursor("grabbing");
  };

  const dualChartRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [dualChartWidth, setDualChartWidth] = useState(0);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);
  const startResizing = React.useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        document.querySelector('[data-title="Autoscale"]')?.click();
        let w =
          window.innerWidth -
          (dualChartRef.current.getBoundingClientRect().right -
            mouseMoveEvent.clientX) -
          10;

        setLayout({
          ...layout,
          width: w,
          height: window.innerHeight - 80,
        });
        setSecondaryLayout({
          ...secondaryLayout,
          width:
            dualChartRef.current.getBoundingClientRect().right -
            mouseMoveEvent.clientX -
            10,
          height: window.innerHeight - 80,
        });
        setDualChartWidth(
          dualChartRef.current.getBoundingClientRect().right -
            mouseMoveEvent.clientX
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isResizing, sidebarWidth]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return layout ? (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          height: "100vh",
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >
        <div
          id="default-chart"
          style={{
            cursor,
            marginTop: "52px",
            border:
              currentSelected === "default" ? "4px solid #438695" : "none",
          }}
        >
          <DefaultChart
            type="default"
            onHover={onHover}
            onDoubleClick={(e) => setCurrentSelected(e)}
            onUnhover={onUnhover}
            onClick={onClick}
            pointIndex={pointIndex}
            enableDualChart={enableDualChart}
            graphConfigs={graphConfigs}
            layout={layout}
            toggleFirstDayLine={toggleFirstDayLine}
            switchToggle={switchToggle}
            separateGraphs={separateGraphs}
            id={"default"}
            selectedTime={enableDualChart ? getTimeforSecondaryGraph(graphConfigs.time) : graphConfigs.time}
            selectedCategory={selectedCategory}
            setLayout={setLayout}
            selectedStrategy={selectedStrategy}
            sidebarWidth={sidebarWidth}
            dualChartWidth={dualChartWidth}
            dataBaseUrl={dataBaseUrl}
            setStrategiesData={setStrategiesData}
            strategiesData={strategiesData}
            selectedTriggerFromPanel={selectedTriggerFromPanel}
          />
        </div>
      </div>
      {enableDualChart && (
        <div
          ref={dualChartRef}
          className="app-dualchart"
          style={{
            width: secondaryLayout.width + 10 + "px",
            marginTop: "52px",
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="app-dualchart-resizer" onMouseDown={startResizing} />
          <div className="app-dualchart-content">
            <div
              id="secondary-chart"
              style={{
                cursor,
                border:
                  currentSelected === "secondary"
                    ? "4px solid #438695"
                    : "none",
              }}
            >
              <DefaultChart
                type="secondary"
                onHover={onHover}
                onDoubleClick={(e) => setCurrentSelected(e)}
                enableDualChart={enableDualChart}
                layout={secondaryLayout}
                toggleFirstDayLine={toggleFirstDayLine}
                switchToggle={switchToggle}
                selectedPattern={graphConfigs.pattern}
                onUnhover={onUnhover}
                onClick={onClick}
                pointIndex={pointIndex}
                separateGraphs={separateGraphs}
                id={"secondary"}
                selectedTime={graphConfigs.time}
                selectedCategory={selectedCategory}
                setLayout={setSecondaryLayout}
                selectedStrategy={selectedStrategy}
                sidebarWidth={sidebarWidth}
                dualChartWidth={dualChartWidth}
                dataBaseUrl={dataBaseUrl}
                setStrategiesData={setStrategiesData}
                strategiesData={strategiesData}
                selectedTriggerFromPanel={selectedTriggerFromPanel}
                graphConfigs={graphConfigs}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default GraphRenderer;
