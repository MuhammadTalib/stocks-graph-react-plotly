import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Checkbox, Grid } from "@mui/material";
import React, { useState } from "react";
import { times } from "../Utils/defaults";
import AutocompleteWrapper from "./AutocompleteWrapper";
import FilterPanelTable from "./FilterPanelTable";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const PatternTriggers = ({
    filtersColumns,
    height,
    scrollableListRef,
    selectedStrategy,
    orderBy,
    createSortHandler,
    order,
    placeSelectedItemInTheMiddle,
    selectedStock,
    hanldeSelectedTime,
    handleStockChange,
    setSelectStockIndex,
    selectedTime,
    stocks,
    setStocks,
    strategiesData,
    selectedCategory,
    handleKeyDown,
    categories,
    setSelectedCategory,
    setSelectedTime,
}) => {
    const [symbolFilter, setSymbolFilter] = useState([]);
    const [timeFilter, setTimeFilter] = useState([]);

    return (
        <Grid container style={{ margin: "0px 6px" }}>
            <Grid container item md={12} sm={12} xs={12} spacing={2}>
                <Grid item md={4} sm={4} xs={4}>
                    <AutocompleteWrapper
                        options={stocks}
                        limitTags={1}
                        value={symbolFilter}
                        label="Symbol"
                        handleChange={(v) => {
                            if (v && v.length) {
                                setSymbolFilter([...v]);
                            } else {
                                setSymbolFilter([]);
                            }
                        }}
                        selectedStock={selectedStock}
                        multiple={true}
                        getOptionLabel={(option) => {
                            return option && option.name;
                        }}
                        renderOption={(props, option, s) => {
                            let selected = s?.selected;
                            return (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        checked={selected}
                                    />
                                    {option.name}
                                </li>
                            );
                        }}
                    />
                </Grid>
                <Grid item md={4} sm={4} xs={4}>
                    <AutocompleteWrapper
                        options={times}
                        limitTags={1}
                        id="multiple-limit-tags"
                        value={timeFilter}
                        label="Time"
                        handleChange={(v) => {
                            if (v && v.length) {
                                setTimeFilter([...v]);
                            } else {
                                setTimeFilter([]);
                            }
                        }}
                        selectedStock={selectedStock}
                        multiple={true}
                        getOptionLabel={(option) => {
                            return option && option.name;
                        }}
                        renderOption={(props, option, s) => {
                            let selected = s?.selected;
                            return (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        checked={selected}
                                    />
                                    {option.name}
                                </li>
                            );
                        }}
                    />
                </Grid>
                <Grid item md={7} sm={7} xs={7}>
                    {/* <DateRangePickerWrapper /> */}
                    {/* <AutocompleteWrapper
                        options={strategies}
                        value={selectedStrategy}
                        label="Strategies"
                        handleChange={(v) => {
                            if (v && v.length) {
                                setSelectedStrategy([...v]);
                            } else {
                                setSelectedStrategy([]);
                            }
                        }}
                        selectedStock={selectedStock}
                        multiple={true}
                        renderOption={(props, option, s) => {
                            let selected = s?.selected;
                            return (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        checked={selected}
                                    />
                                    {option}
                                </li>
                            );
                        }}
                    /> */}
                </Grid>
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
                <div onKeyPress={handleKeyDown}>
                    <FilterPanelTable
                        filtersColumns={filtersColumns}
                        height={height}
                        scrollableListRef={scrollableListRef}
                        selectedStrategy={selectedStrategy}
                        orderBy={orderBy}
                        createSortHandler={createSortHandler}
                        order={order}
                        selectedCategory={selectedCategory}
                        selectedStock={selectedStock}
                        hanldeSelectedTime={hanldeSelectedTime}
                        handleStockChange={handleStockChange}
                        setSelectStockIndex={setSelectStockIndex}
                        selectedTime={selectedTime}
                        stocks={stocks}
                        setStocks={setStocks}
                        symbolFilter={symbolFilter}
                        timeFilter={timeFilter}
                        strategiesData={strategiesData}
                        placeSelectedItemInTheMiddle={
                            placeSelectedItemInTheMiddle
                        }
                    />
                </div>
            </Grid>
        </Grid>
    );
};

export default PatternTriggers;
