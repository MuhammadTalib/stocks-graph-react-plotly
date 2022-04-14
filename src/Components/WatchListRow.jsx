import { TableCell, TableRow } from "@mui/material";
import React from "react";

const WatchListRow = ({
  row,
  index,
  selectedStock,
  handleStockChange,
  selectedTime,
  placeSelectedItemInTheMiddle,
  setSelectStockIndex,
  hanldeSelectedTime,
  selectedStrategy,
}) => {
  return (
    row &&
    selectedStock && (
      <TableRow
        className={row.name === selectedStock.name ? "selectedRowStyle" : ""}
        active={row.name === selectedStock.name}
        key={index}
        onClick={() => {
          hanldeSelectedTime(selectedTime);
          placeSelectedItemInTheMiddle(index);
          handleStockChange(row);
          setSelectStockIndex(index);
        }}
        focus={row.name === selectedStock.name}
      >
        <TableCell align={"center"}>{row.name}</TableCell>
        <TableCell align={"center"}>
          {row?.sources?.length && row.sources[0]}{" "}
        </TableCell>
        <TableCell align={"center"}>{selectedTime.name}</TableCell>
        {selectedStrategy.map((m) => (
          <TableCell align={"center"}>{m.value}</TableCell>
        ))}
      </TableRow>
    )
  );
};

export default WatchListRow;
