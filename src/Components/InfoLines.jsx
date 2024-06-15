import React from "react";

const InfoLines = ({
    graphConfigs,
    selectedStock,
    ohlc: { high, low, open, close, ConfrimLow, ConfrimHigh },
    selectedPattern,
    selectedTime,
    patternTrigger,
    switchToggle,
}) => {
    return (
        <div style={{ marginLeft: "10px", fontSize: "12px" }}>
            {selectedStock && (
                <div>
                    {selectedStock.name} -{" "}
                    {selectedStock.description || "description"}
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
            {graphConfigs.pattern ? (
                (selectedPattern && selectedPattern.length) ||
                patternTrigger ? (
                    <div>Pattern: {selectedPattern}</div>
                ) : (
                    <div style={{ width: "300px", height: "14px" }}></div>
                )
            ) : (
                <></>
            )}
            {switchToggle && switchToggle !== "0" ? (
                ConfrimLow ? (
                    <div>
                        Confirm Low: {ConfrimLow} - {low}
                    </div>
                ) : ConfrimHigh ? (
                    <div>
                        Confirm High: {ConfrimHigh} - {high}
                    </div>
                ) : (
                    <div style={{ width: "300px", height: "14px" }}></div>
                )
            ) : (
                <></>
            )}
        </div>
    );
};

export default InfoLines;
