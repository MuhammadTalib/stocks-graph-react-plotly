import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Checkbox, Grid, IconButton } from "@mui/material";
import React, { useState } from "react";
import { times } from "../Utils/defaults";
import AutocompleteWrapper from "./AutocompleteWrapper";
import FilterPanelTable from "./FilterPanelTable";
import DateRangePickerWrapper from "./DateRangePickerWrapper";
import ReplayIcon from '@mui/icons-material/Replay';

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
    selectedTime,
    stocks,
    setStocks,
    strategiesData,
    selectedCategory,
    setSelectedPattern,
    setSelectedTriggerFromPanel,
    handlePatternChange
}) => {
    const [symbolFilter, setSymbolFilter] = useState([]);
    const [timeFilter, setTimeFilter] = useState([]);
    const [selectedStockIndex, setSelectStockIndex] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [filterPattern, setFilterPatter] = useState([]);
    const [fetchTimeStamp, setTimeStamp] = useState(0)
    let [patterns] = useState([
        {
            name: "Reversal",
            key: "all reversal patterns",
            pattern: "All Reversal Patterns",
        },
        {
            name: "Double Close",
            key: "double close",
            pattern: "All Reversal Patterns",
        },
        {
            name: "Tower Patterns",
            key: "tower patterns",
            pattern: "All Reversal Patterns",
        },
        {
            name: "Failure",
            key: "all failure patterns",
            pattern: "All Failure Patterns",
        },
        {
            name: "MACD DIVERGENCE",
            key: "all divergence patterns",
            pattern: "All Divergence Patterns",
        },
        { name: "RSI DIVERGENCE", key: "rsi divergence combo" },
        { name: "S/L COMBO", key: "S/L combo patterns" },
        { name: "RSI-R", key: "RSI-R POI patterns" },
        { name: "ZLR", key: "zero line reversals" },
        { name: "T3", key: "all t3 patterns" },
        { name: "T3 FAILURES", key: "all t3 failures" },
        { name: "FIBONACCI", key: "all fibonacci retracements" },
        { name: "MOVING AVG", key: "moving average strategies" },
        { name: "SMT", key: "smt divergence patterns" },
    ]);

    const handlePatternFilterChange = (pattern) => {
        setFilterPatter(pattern);
    };

    return (
        <Grid container style={{ margin: "0px 6px" }}>
            <Grid container item md={12} sm={12} xs={12} spacing={2}>
                <Grid item md={3} sm={3} xs={3}>
                    <AutocompleteWrapper
                        options={stocks}
                        limitTags={2}
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
                <Grid item md={3} sm={3} xs={3}>
                    <AutocompleteWrapper
                        options={times}
                        limitTags={2}
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
                <Grid item md={3} sm={3} xs={3}>
                    <DateRangePickerWrapper
                        label="Date Range"
                        value={startDate}
                        setValue={setStartDate}
                    />
                </Grid>
                <Grid item container md={3} sm={3} xs={3}>
                    <Grid item md={9} sm={9} xs={9}>
                        <AutocompleteWrapper
                            options={patterns}
                            value={filterPattern}
                            label={"Pattern"}
                            getOptionLabel={(option) => {
                                return option ? option?.name : "";
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
                            multiple={true}
                            handleChange={handlePatternFilterChange}
                            selectedStock={selectedStock}
                        />
                    </Grid>
                    <Grid item md={3} sm={3} xs={3}>
                        <IconButton onClick={()=>{setTimeStamp(Date.now())}} style={{ padding: "11px" }} aria-label="replay" color="primary">
                            <ReplayIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
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
                    selectedStockIndex={selectedStockIndex}
                    placeSelectedItemInTheMiddle={placeSelectedItemInTheMiddle}
                    startDate={startDate}
                    setSelectedPattern={setSelectedPattern}
                    filterPattern={filterPattern}
                    setSelectedTriggerFromPanel={setSelectedTriggerFromPanel}
                    handlePatternChange={handlePatternChange}
                    patterns={patterns}
                    fetchTimeStamp={fetchTimeStamp}
                />
            </Grid>
        </Grid>
    );
};

export default PatternTriggers;
