import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { rightMargin } from "../Utils/defaults";
import { DefaultChart } from "./DefaultChart";
import { initialLayout } from "../Utils/utils";
const style = { width: "100%", height: "100%" };

const useStyles = makeStyles(() => ({
  container: (secondaryGraphWidth) => {
    return { width: `calc(100% - ${secondaryGraphWidth}px)` };
  },
}));

const GraphRenderer = ({
  data,
  layout,
  loader,
  enableDualChart,
  graphType,
  selectedTemp,
  separateGraphs,
  toggleFirstDayLine,
  switchToggle,
  selectedPattern,
  setLayout,
}) => {
  // const [secondaryGraphWidth, setSecondaryGraphWidth] = useState(6);
  // const classes = useStyles(secondaryGraphWidth);
  const [secondaryLayout, setSecondaryLayout] = useState({ ...initialLayout });

  const [cursor, setCursor] = useState("crosshair");
  const [currentSelected, setCurrentSelected] = useState("");
  const [pointIndex, setPointIndex] = useState(1);

  const onHover = ({ points: [point] }) => {
    setPointIndex(point.pointIndex);
    setCursor("pointer");
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
        let w =
          window.innerWidth -
          (sidebarRef.current.getBoundingClientRect().right -
            mouseMoveEvent.clientX) -
          10;

        if (enableDualChart) {
          w = w / 2;
        }

        setLayout({
          ...layout,
          width: w,
          height: window.innerHeight - 50,
        });
        setSecondaryLayout({
          ...secondaryLayout,
          width:
            sidebarRef.current.getBoundingClientRect().right -
            mouseMoveEvent.clientX,
          height: window.innerHeight - 50,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [layout, enableDualChart, isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return data && data?.x?.length && layout ? (
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
            rightMargin={rightMargin}
            onHover={onHover}
            onDoubleClick={(e) => setCurrentSelected(e)}
            onUnhover={onUnhover}
            onClick={onClick}
            pointIndex={pointIndex}
            graphType={graphType}
            style={style}
            data={data}
            enableDualChart={enableDualChart}
            selectedTemp={selectedTemp}
            layout={layout}
            toggleFirstDayLine={toggleFirstDayLine}
            switchToggle={switchToggle}
            selectedPattern={selectedPattern}
            separateGraphs={separateGraphs}
            loader={loader}
          />
        </div>
      </div>
      {enableDualChart && (
        <div
          ref={sidebarRef}
          className="app-sidebar"
          style={{ width: secondaryLayout.width + "px", marginTop: "52px" }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="app-sidebar-resizer" onMouseDown={startResizing} />
          <div className="app-sidebar-content">
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
                rightMargin={rightMargin}
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
                data={data}
                separateGraphs={separateGraphs}
                loader={loader}
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
