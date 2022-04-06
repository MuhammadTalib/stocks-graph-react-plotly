import React from "react";
const InfoLines = ({
  selectedStock,
  ohlc: { high, low, open, close },
  selectedPattern,
}) => {
  return (
    <div style={{ marginLeft: "10px", fontSize: "12px" }}>
      <div>
        {selectedStock.name} - description -{" "}
        {selectedStock.sources.length &&
          String(selectedStock.sources[0]).toUpperCase()}
      </div>
      <div>
        Open: {open} High: {high} Low: {low} Close: {close}
      </div>
      {selectedPattern && <div>Pattern: {selectedPattern}</div>}
    </div>
  );
};

export default InfoLines;
