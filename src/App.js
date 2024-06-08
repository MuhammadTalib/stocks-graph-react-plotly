import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import "./App.css";
import GraphRenderer from "./Components/GraphRenderer";
import Header from "./Components/Header";
import WatchList from "./Components/WatchList";
import { initialLayout, templates, times } from "./Utils/defaults";

const useStyles = makeStyles(() => ({
    container: (sidebarWidth) => {
        return { width: `calc(100% - ${sidebarWidth}px)` };
    },
}));

function App({ dataBaseUrl }) {
    const [stocks, setStocks] = useState([]);
    const [layout, setLayout] = useState({ ...initialLayout });
    const [sidebarWidth, setSidebarWidth] = useState(6);
    //Graph configuration data
    const [graphConfigs, setGraphConfigsState] = useState({
        graphType: "candlestick",
        stock: "MMM",
        time: times[11],
        template: templates[0],
        pattern: "",
    });
    //Graph Layout
    const [secondaryLayout, setSecondaryLayout] = useState({
        ...layout,
        width: "50%",
        height: window.innerHeight - 80,
    });

    const classes = useStyles(sidebarWidth);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [toggleFirstDayLine, setToggleFirstDayLine] = useState(true);
    const [enableDualChart, setEnableDualChart] = useState(false);
    const [strategiesData, setStrategiesData] = useState([]);

    const [switchToggle, setSwitchToggle] = useState("0");
    const [selectedStrategy, setSelectedStrategy] = useState([]);
    const [selectedTriggerFromPanel, setSelectedTriggerFromPanel] =
        useState(null);
    const [resizeFromWatchlistButton, setResizeFromWatchlistButton] =
        useState(false);

    const setGraphConfigs = (value) => {
        let time = value?.time;
        if (!time) {
            time = times[11];
        }
        if (value.toggleFirstDayLine) {
            setToggleFirstDayLine(time?.name === "1d");
        }
        setGraphConfigsState({ ...value, time });
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
        setSelectedStrategy([]);
        setStrategiesData([]);
        setGraphConfigs({
            ...graphConfigs,
            pattern: pattern,
        });
    };

    const hanldeSelectedTime = (time) => {
        if (!time) {
            time = times[11];
        }
        if (toggleFirstDayLine) {
            setToggleFirstDayLine(time?.name === "1d");
        }
        setGraphConfigs({
            ...graphConfigs,
            time,
        });
    };

    const handleChangeSelectedStrategy = (s) => {
        setSelectedStrategy([...s]);
        setGraphConfigs({
            ...graphConfigs,
            pattern: null,
        });
    };

    return (
        <div className="app-container">
            <div className={classes.container + " app-frame"}>
                <Header
                    graphConfigs={graphConfigs}
                    setGraphConfigs={setGraphConfigs}
                    setEnableDualChart={setEnableDualChart}
                    enableDualChart={enableDualChart}
                    setSidebarWidth={setSidebarWidth}
                    handlePatternChange={handlePatternChange}
                    hanldeSelectedTime={hanldeSelectedTime}
                    handlSwitchToggle={setSwitchToggle}
                    switchToggle={switchToggle}
                    toggleFirstDayLine={toggleFirstDayLine}
                    setToggleFirstDayLine={(v)=>{
                        console.log("v",v)
                        setToggleFirstDayLine(v)
                    }}
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
                        graphConfigs={graphConfigs}
                        layout={layout}
                        enableDualChart={enableDualChart}
                        toggleFirstDayLine={toggleFirstDayLine}
                        switchToggle={switchToggle}
                        setLayout={setLayout}
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
                graphConfigs={graphConfigs}
                stocks={stocks}
                setStocks={setStocks}
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
                setSelectedTriggerFromPanel={setSelectedTriggerFromPanel}
                resizeFromWatchlistButton={resizeFromWatchlistButton}
                setResizeFromWatchlistButton={setResizeFromWatchlistButton}
                setGraphConfigs={setGraphConfigs}
                toggleFirstDayLine={toggleFirstDayLine}
            />
        </div>
    );
}

export default App;
