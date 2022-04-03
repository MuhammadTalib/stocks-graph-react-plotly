import React, { useState } from "react";
import { rightMargin } from "../Utils/utils";
import { DefaultChart } from "./DefaultChart";
const style = { width: "100%", height: "100%" };

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
}) => {
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
  return data && data?.x?.length && layout ? (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        id="default-chart"
        style={{
          cursor,
          marginTop: "52px",
          border: currentSelected === "default" ? "4px solid #438695" : "none",
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
      {enableDualChart && (
        <div
          id="secondary-chart"
          style={{
            cursor,
            marginTop: "52px",
            border:
              currentSelected === "secondary" ? "4px solid #438695" : "none",
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
            layout={layout}
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
      )}
    </div>
  ) : (
    <></>
  );
};

export default GraphRenderer;
