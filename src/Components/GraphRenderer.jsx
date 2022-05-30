import React, { useEffect, useRef, useState } from "react";
import { getTimeforSecondaryGraph } from "../Utils/utils";
import { DefaultChart } from "./DefaultChart";
const style = { width: "100%", height: "100%" };

const GraphRenderer = ({
  layout,
  enableDualChart,
  graphType,
  selectedTemp,
  separateGraphs,
  toggleFirstDayLine,
  switchToggle,
  selectedPattern,
  setLayout,
  selectedStock,
  selectedTime,
  selectedCategory,
  selectedStrategy,
  sidebarWidth,
  secondaryLayout,
  setSecondaryLayout,
}) => {
  const [secondaryChartTime, setSecondayChartTime] = useState(null);

  useEffect(() => {
    let t = getTimeforSecondaryGraph(selectedTime);
    setSecondayChartTime(enableDualChart ? t : selectedTime);
  }, [selectedTime, enableDualChart]);

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

  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

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
          (sidebarRef.current.getBoundingClientRect().right -
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
            sidebarRef.current.getBoundingClientRect().right -
            sidebarWidth -
            mouseMoveEvent.clientX -
            10,
          height: window.innerHeight - 80,
        });
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
            graphType={graphType}
            style={style}
            enableDualChart={enableDualChart}
            selectedTemp={selectedTemp}
            layout={layout}
            toggleFirstDayLine={toggleFirstDayLine}
            switchToggle={switchToggle}
            selectedPattern={selectedPattern}
            separateGraphs={separateGraphs}
            selectedStock={selectedStock}
            id={"default"}
            selectedTime={secondaryChartTime}
            selectedCategory={selectedCategory}
            setLayout={setLayout}
            selectedStrategy={selectedStrategy}
            sidebarWidth={sidebarWidth}
          />
        </div>
      </div>
      {enableDualChart && (
        <div
          ref={sidebarRef}
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
                graphType={graphType}
                style={style}
                enableDualChart={enableDualChart}
                selectedTemp={selectedTemp}
                layout={secondaryLayout}
                toggleFirstDayLine={toggleFirstDayLine}
                switchToggle={switchToggle}
                selectedPattern={selectedPattern}
                onUnhover={onUnhover}
                onClick={onClick}
                pointIndex={pointIndex}
                separateGraphs={separateGraphs}
                selectedStock={selectedStock}
                id={"secondary"}
                selectedTime={selectedTime}
                selectedCategory={selectedCategory}
                setLayout={setSecondaryLayout}
                selectedStrategy={selectedStrategy}
                sidebarWidth={sidebarWidth}
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
