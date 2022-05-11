import React from "react";
const InfoLines = ({
  selectedStock,
  ohlc: { high, low, open, close, pattern, ConfrimLow, ConfrimHigh },
  selectedPattern,
}) => {
  return (
    <div style={{ marginLeft: "10px", fontSize: "12px" }}>
      <div>
        {selectedStock.name} - {selectedStock.description || "description"} -
        {selectedStock.sources.length &&
          String(selectedStock.sources[0]).toUpperCase()}
      </div>
      <div>
        Open: {open} High: {high} Low: {low} Close: {close}
      </div>
      {pattern ? <div>Pattern: {selectedPattern}</div> : <></>}
      {ConfrimLow ? <div>Confirm Low: {low}</div> : <></>}
      {ConfrimHigh ? <div>Confirm High: {high}</div> : <></>}
    </div>
  );
};

export default InfoLines;
