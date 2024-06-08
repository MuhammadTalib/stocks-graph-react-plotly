import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Box, Checkbox, Grid, Tab, Tabs } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "../App.css";
import { times } from "../Utils/defaults";
import { getComparator, stableSort } from "../Utils/sorting";
import { getAllStocks } from "../services/api";
import AutocompleteWrapper from "./AutocompleteWrapper";
import PatternTriggers from "./PatternTriggers";
import WatchListTable from "./WatchListTable";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div>{children}</div>}
        </div>
    );
}

const WatchList = ({
    graphConfigs,
    stocks,
    setStocks,
    selectedCategory,
    setSelectedCategory,
    hanldeSelectedTime,
    setLayout,
    layout,
    setSidebarWidth,
    sidebarWidth,
    enableDualChart,
    selectedStrategy,
    setSelectedStrategy,
    secondaryLayout,
    setSecondaryLayout,
    strategiesData,
    setSelectedTriggerFromPanel,
    resizeFromWatchlistButton,
    setResizeFromWatchlistButton,
    setGraphConfigs,
    toggleFirstDayLine
}) => {
    const scrollableListRef = useRef(null);

    const [strategies, setStrategies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedStockIndex, setSelectStockIndex] = useState(0);
    const [loader, setLoader] = useState(false);
    const [selectedTime, setSelectedTime] = useState(times[11]);
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("Symbol");

    useEffect(()=>{
        if(resizeFromWatchlistButton){
            console.log(resizeFromWatchlistButton)
            setResizeFromWatchlistButton(false)
             let wGraph = window.innerWidth - sidebarWidth - 10;
    
            setLayout({
                ...layout,
                width: wGraph,
                height: window.innerHeight - 80,
            });
            setSecondaryLayout({ ...secondaryLayout, width: sidebarWidth });
            setSidebarWidth( sidebarWidth );
        }
    },[resizeFromWatchlistButton])

    useEffect(() => {
        setLoader(true);
        getAllStocks("/stocks/watchlish")
            .then((res) => {
                if (res?.data?.list?.length) {
                    setCategories(res.data.list || []);
                    setSelectedCategory(res.data.list[0]);
                }
                setLoader(false);
            })
            .catch(() => {
                setLoader(false);
            });

        getAllStocks("/stocks/active_strategies")
            .then((res) => {
                setStrategies(res?.data?.list || []);
                setLoader(false);
            })
            .catch(() => {
                setLoader(false);
            });
    }, [setSelectedCategory]);

    useEffect(() => {
        getAllStocks("stocks/watchlish/" + selectedCategory).then((res) => {
            setStocks(res?.data?.list || []);
            setSelectStockIndex(0);
            setGraphConfigs({...graphConfigs, stock: res?.data?.list[0]})
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory]);

    const handleKeyDown = (e) => {
        if (e.keyCode === 38) {
            hanldeSelectedTime(selectedTime);
            setGraphConfigs({...graphConfigs, stock: stocks[selectedStockIndex - 1]})
            setSelectStockIndex(selectedStockIndex - 1);
            placeSelectedItemInTheMiddle(selectedStockIndex - 1);
        } else if (e.keyCode === 40) {
            hanldeSelectedTime(selectedTime);
            setGraphConfigs({...graphConfigs, stock: stocks[selectedStockIndex + 1]})
            setSelectStockIndex(selectedStockIndex + 1);
            placeSelectedItemInTheMiddle(selectedStockIndex + 1);
        }
    };

    const placeSelectedItemInTheMiddle = (index) => {
        const LIST_ITEM_HEIGHT = 21;
        const NUM_OF_VISIBLE_LIST_ITEMS = 15;
        const amountToScroll =
            LIST_ITEM_HEIGHT * NUM_OF_VISIBLE_LIST_ITEMS +
            index * LIST_ITEM_HEIGHT;
        scrollableListRef.current.scrollTo(amountToScroll, 0);
    };

    const createSortHandler = (property) => () => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);

        setStocks(
            stableSort(
                stocks.map((m) => {
                    let obj = {};
                    selectedStrategy.forEach((s, i) => {
                        let t = strategiesData?.[i]?.data?.[m.name]?.time;
                        obj[s] = t ? new Date(t) : null;
                    });

                    return {
                        ...m,
                        Symbol: m.name,
                        Sources: m.sources[0],
                        Description: m.description,
                        Time: selectedTime.name,
                        ...obj,
                    };
                }),
                getComparator(
                    isAsc ? "desc" : "asc",
                    property,
                    selectedStrategy
                )
            )
        );
    };

    const stock = useMemo(() => {
        return (
            <Grid container style={{ margin: "0px 6px" }}>
                <Grid container item md={12} sm={12} xs={12} spacing={2}>
                    <Grid item md={3} sm={3} xs={3}>
                        <AutocompleteWrapper
                            options={categories}
                            value={selectedCategory}
                            label={"Categrories"}
                            handleChange={setSelectedCategory}
                            selectedStock={graphConfigs.stock}
                        />
                    </Grid>
                    <Grid item md={2} sm={2} xs={2}>
                        <AutocompleteWrapper
                            options={times}
                            value={selectedTime}
                            label={"Time"}
                            handleChange={(newValue) => {
                                setSelectedTime(newValue);
                                hanldeSelectedTime(newValue);
                            }}
                            selectedStock={graphConfigs.stock}
                            getOptionLabel={(option) => {
                                return option ? option?.name : "";
                            }}
                        />
                    </Grid>
                    <Grid item md={7} sm={7} xs={7}>
                        <AutocompleteWrapper
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
                            selectedStock={graphConfigs.stock}
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
                        />
                    </Grid>
                </Grid>

                <Grid item md={12} sm={12} xs={12}>
                    <div onKeyDown={handleKeyDown}>
                        <WatchListTable
                            height={layout.height}
                            scrollableListRef={scrollableListRef}
                            selectedStrategy={selectedStrategy}
                            orderBy={orderBy}
                            createSortHandler={createSortHandler}
                            order={order}
                            placeSelectedItemInTheMiddle={
                                placeSelectedItemInTheMiddle
                            }
                            hanldeSelectedTime={hanldeSelectedTime}
                            setSelectStockIndex={setSelectStockIndex}
                            selectedTime={selectedTime}
                            stocks={stocks}
                            setStocks={setStocks}
                            strategiesData={strategiesData}
                            graphConfigs={graphConfigs}
                            setGraphConfigs={setGraphConfigs}
                        />
                    </div>
                </Grid>
            </Grid>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        stocks,
        graphConfigs,
        graphConfigs.stock,
        graphConfigs.pattern,
        order,
        orderBy,
        selectedCategory,
        categories,
        stocks,
        selectedTime,
        selectedStrategy,
        strategiesData,
        strategies,
        strategiesData.length,
    ]);

    const filters = useMemo(() => {
        return (
            <PatternTriggers
                height={layout.height}
                scrollableListRef={scrollableListRef}
                selectedStrategy={selectedStrategy}
                orderBy={orderBy}
                order={order}
                selectedCategory={selectedCategory}
                selectedStock={graphConfigs.stock}
                hanldeSelectedTime={hanldeSelectedTime}
                setSelectStockIndex={setSelectStockIndex}
                selectedTime={selectedTime}
                stocks={stocks}
                setStocks={setStocks}
                strategiesData={strategiesData}
                handleKeyDown={handleKeyDown}
                categories={categories}
                setSelectedCategory={setSelectedCategory}
                setSelectedTime={setSelectedTime}
                placeSelectedItemInTheMiddle={placeSelectedItemInTheMiddle}
                selectedPattern={graphConfigs.pattern}
                setSelectedTriggerFromPanel={setSelectedTriggerFromPanel}
                graphConfigs={graphConfigs}
                setGraphConfigs={setGraphConfigs}
                toggleFirstDayLine={toggleFirstDayLine}
            />
        );
    }, [graphConfigs.stock, selectedTime, toggleFirstDayLine]);

    const sidebarRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);

    const resize = React.useCallback(
        (mouseMoveEvent) => {
            if (isResizing) {
                let w =
                    window.innerWidth -
                    (sidebarRef.current.getBoundingClientRect().right -
                        mouseMoveEvent.clientX) -
                    10;

                if (enableDualChart) {
                    w = Math.floor(w / 2);
                }

                setLayout({
                    ...layout,
                    width: w,
                    height: window.innerHeight - 80,
                });
                setSecondaryLayout({ ...secondaryLayout, width: w });
                setSidebarWidth(
                    sidebarRef.current.getBoundingClientRect().right -
                        mouseMoveEvent.clientX
                );
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isResizing]
    );

    const stopResizing = React.useCallback(() => {
        setIsResizing(false);
    }, []);
    const startResizing = React.useCallback((mouseDownEvent) => {
        setIsResizing(true);
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSelectedTriggerFromPanel(null)
    };

    return (
        <div
            ref={sidebarRef}
            className="app-sidebar"
            style={{
                width: sidebarWidth + "px",
                height: `calc(100vh - ${52}px`,
            }}
            onMouseDown={(e) => e.preventDefault()}
        >
            {loader ? <div className="watchListLoader"></div> : <></>}
            <div className="app-sidebar-resizer" onMouseDown={startResizing} />
            <div className="app-sidebar-content" style={{ overflowX: "clip" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Symbol" {...a11yProps(0)} />
                        <Tab label="Pattern Triggers" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    {stock}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    {filters}
                </CustomTabPanel>
            </div>
        </div>
    );
};

export default WatchList;
