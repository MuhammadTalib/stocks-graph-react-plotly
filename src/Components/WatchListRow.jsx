import { TableCell, TableRow } from "@mui/material";
import React from "react";

const WatchListRow = ({
    row,
    index,
    selectedStock,
    selectedTime,
    placeSelectedItemInTheMiddle,
    setSelectStockIndex,
    hanldeSelectedTime,
    selectedStrategy,
    strategiesData,
    graphConfigs,
    setGraphConfigs
}) => {
    return row && selectedStock ? (
        <TableRow
            className={
                row.name === selectedStock.name ? "selectedRowStyle" : ""
            }
            active={(row.name === selectedStock.name).toString()}
            key={index}
            onClick={() => {
                hanldeSelectedTime(selectedTime);
                placeSelectedItemInTheMiddle(index);
                setGraphConfigs({...graphConfigs, stock: row})
                setSelectStockIndex(index);
            }}
            focus={(row.name === selectedStock.name).toString()}
        >
            <TableCell align={"center"}>{row.name}</TableCell>
            <TableCell align={"center"}>
                {row?.sources?.length && row.sources[0]}
            </TableCell>
            <TableCell align={"center"}>{selectedTime.name}</TableCell>
            {strategiesData.map((m, i) =>
                m?.data?.[row?.name]?.value &&
                m?.data?.[row?.name]?.value !== "temp" ? (
                    <TableCell key={i} align={"center"}>
                        {m?.data?.[row?.name]?.value !== "temp"
                            ? m?.data?.[row?.name]?.value + ", "
                            : " "}
                        {m?.data?.[row?.name]?.time !== "temp"
                            ? m?.data?.[row?.name]?.time
                            : " "}
                    </TableCell>
                ) : (
                    <></>
                )
            )}
        </TableRow>
    ) : (
        <></>
    );
};

export default WatchListRow;
