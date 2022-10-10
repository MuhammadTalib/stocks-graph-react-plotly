import React from "react";

const InfoLines = ({
  selectedStock,
  ohlc: { high, low, open, close, ConfrimLow, ConfrimHigh },
  selectedPattern,
  selectedTime,
  patternTrigger,
}) => {
  return (
    <div style={{ marginLeft: "10px", fontSize: "12px" }}>
      {selectedStock && (
        <div>
          {selectedStock.name} - {selectedStock.description || "description"}
          {" - "}
          {selectedStock.sources.length &&
            String(selectedStock.sources[0]).toUpperCase()}
          {" - "}
          {selectedTime.desc}
        </div>
      )}
      <div>
        Open: {open} High: {high} Low: {low} Close: {close}
      </div>
      {selectedPattern || patternTrigger ? (
        <div>Pattern: {selectedPattern}</div>
      ) : (
        <></>
      )}
      {ConfrimLow ? (
        <div>
          Confirm Low: {ConfrimLow} - {low}
        </div>
      ) : (
        <></>
      )}
      {ConfrimHigh ? (
        <div>
          Confirm High: {ConfrimHigh} - {high}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default InfoLines;
