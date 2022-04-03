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
}) => {
  return (
    row && (
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
        <TableCell>{row.name}</TableCell>
        <TableCell>{row?.sources?.length && row.sources[0]} </TableCell>
        <TableCell>{selectedTime.name}</TableCell>
      </TableRow>
    )
  );
};

export default WatchListRow;
