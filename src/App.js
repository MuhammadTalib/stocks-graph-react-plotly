import { makeStyles } from "@mui/styles";
import React, { useRef, useState } from "react";

import GraphRenderer from "./Components/GraphRenderer";
import Header from "./Components/Header";
import WatchList from "./Components/WatchList";
import { initialLayout, templates, times } from "./Utils/defaults";

import "./App.css";

const useStyles = makeStyles(() => ({
    container: (sidebarWidth) => {
        return { width: `calc(100% - ${sidebarWidth}px)` };
    },
}));



function App({ dataBaseUrl }) {
    const [stocks, setStocks] = useState([]);
    const [sidebarWidth, setSidebarWidth] = useState(6);
    const classes = useStyles(sidebarWidth);
    const [graphType, setGraphType] = useState("candlestick");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [toggleFirstDayLine, setToggleFirstDayLine] = useState(true);
    const [enableDualChart, setEnableDualChart] = useState(false);
    const [layout, setLayout] = useState({ ...initialLayout });
    const scrollableListRef = useRef(null);
    const [selectedStock, setSelectStock] = useState("MMM");
    const [selectedPattern, setSelectedPattern] = useState(null);
    const [strategiesData, setStrategiesData] = useState([]);
    const [selectedTime, setSelectTime] = useState(times[11]); //1DAY
    const [secondaryLayout, setSecondaryLayout] = useState({
        ...layout,
        width: "50%",
        height: window.innerHeight - 80,
    });
    const [selectedTemp, setSelectedTemp] = useState(templates[0]);
    const [switchToggle, setSwitchToggle] = useState("0");
    const [selectedStrategy, setSelectedStrategy] = useState([]);
    const [selectedTriggerFromPanel, setSelectedTriggerFromPanel] = useState(null);
    const [resizeFromWatchlistButton, setResizeFromWatchlistButton] = useState(false);

    const handleGrapthType = (type) => {
        setGraphType(type);
    };

    React.useEffect(() => {
        function handleResize() {
            if (
                layout.width !== window.innerWidth - 10 ||
                layout.height !== window.innerHeight - 80
            ) {
                document.querySelector('[data-title="Autoscale"]')?.click();
                setLayout({
                    ...layout,
                    width: window.innerWidth - 10,
                    height: window.innerHeight - 80,
                });
            }
        }
        window.addEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerWidth, window.innerHeight]);

    const handlePatternChange = (pattern) => {
        setSelectedPattern(pattern);
        setSelectedStrategy([]);
        setStrategiesData([]);
    };

    const handleStockChange = (stock) => {
        setSelectStock(stock);
    };

    const hanldeSelectedTime = (time) => {
        if (time?.name !== "1d") {
            setToggleFirstDayLine(false);
        }
        setSelectTime(time);
    };

    const templateChange = (tempData) => {
        console.log("template change called")
        setSelectedTemp(tempData);
    };

    const handlSwitchToggle = (v) => {
        setSwitchToggle(v);
    };

    const placeSelectedItemInTheMiddle = (index) => {
        const LIST_ITEM_HEIGHT = 21;
        const NUM_OF_VISIBLE_LIST_ITEMS = 15;
        const amountToScroll =
            LIST_ITEM_HEIGHT * NUM_OF_VISIBLE_LIST_ITEMS +
            index * LIST_ITEM_HEIGHT;
        scrollableListRef.current.scrollTo(amountToScroll, 0);
    };

    const handleChangeSelectedStrategy = (s) => {
        setSelectedStrategy([...s]);
        setSelectedPattern(null);
    };

    return (
        <div className="app-container">
            <div className={classes.container + " app-frame"}>
                <Header
                    setEnableDualChart={setEnableDualChart}
                    enableDualChart={enableDualChart}
                    handleGrapthType={handleGrapthType}
                    graphType={graphType}
                    templateChange={templateChange}
                    setSidebarWidth={setSidebarWidth}
                    selectedStock={selectedStock}
                    handleStockChange={handleStockChange}
                    handlePatternChange={handlePatternChange}
                    selectedTime={selectedTime}
                    hanldeSelectedTime={hanldeSelectedTime}
                    selectedTemp={selectedTemp}
                    selectedPattern={selectedPattern}
                    handlSwitchToggle={handlSwitchToggle}
                    switchToggle={switchToggle}
                    toggleFirstDayLine={toggleFirstDayLine}
                    setToggleFirstDayLine={setToggleFirstDayLine}
                    dataBaseUrl={dataBaseUrl}
                    setResizeFromWatchlistButton={setResizeFromWatchlistButton}
                />
                <div
                    style={{
                        height: "100vh",
                        overflowY: "hidden",
                    }}
                >
                    <GraphRenderer
                        layout={layout}
                        enableDualChart={enableDualChart}
                        graphType={graphType}
                        selectedTemp={selectedTemp}
                        toggleFirstDayLine={toggleFirstDayLine}
                        switchToggle={switchToggle}
                        selectedPattern={selectedPattern}
                        selectedStock={selectedStock}
                        setLayout={setLayout}
                        selectedTime={selectedTime}
                        selectedCategory={selectedCategory}
                        selectedStrategy={selectedStrategy}
                        sidebarWidth={sidebarWidth}
                        secondaryLayout={secondaryLayout}
                        setSecondaryLayout={setSecondaryLayout}
                        dataBaseUrl={dataBaseUrl}
                        setStrategiesData={setStrategiesData}
                        strategiesData={strategiesData}
                        selectedTriggerFromPanel={selectedTriggerFromPanel}
                    />
                </div>
            </div>

            <WatchList
                selectedStock={selectedStock}
                handleStockChange={handleStockChange}
                stocks={stocks}
                setStocks={setStocks}
                height={layout.height}
                scrollableListRef={scrollableListRef}
                placeSelectedItemInTheMiddle={placeSelectedItemInTheMiddle}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                hanldeSelectedTime={hanldeSelectedTime}
                setLayout={setLayout}
                layout={layout}
                setSidebarWidth={setSidebarWidth}
                sidebarWidth={sidebarWidth}
                enableDualChart={enableDualChart}
                selectedStrategy={selectedStrategy}
                setSelectedStrategy={handleChangeSelectedStrategy}
                secondaryLayout={secondaryLayout}
                setSecondaryLayout={setSecondaryLayout}
                strategiesData={strategiesData}
                selectedPattern={selectedPattern}
                setSelectedPattern={setSelectedPattern}
                setSelectedTriggerFromPanel={setSelectedTriggerFromPanel}
                handlePatternChange={handlePatternChange}
                resizeFromWatchlistButton={resizeFromWatchlistButton}
                setResizeFromWatchlistButton={setResizeFromWatchlistButton}
                templateChange={templateChange}
            />
        </div>
    );
}

export default App;
