import { DefaultChart } from "./DefaultChart";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import WatchList from "./Components/WatchList";
import { theme } from "./theme";
import { getDataRequestService, rightMargin, dummy, defaultLayout } from "./AppServices";

const useStyles = makeStyles((theme) => ({
  container: (sidebarWidth) => {
    return { width: `calc(100% - ${sidebarWidth}px)` };
  },
}));

function App() {
  const [stocks, setStocks] = useState([]);
  const [cursor, setCursor] = useState("crosshair");
  const [currentSelected, setCurrentSelected] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(6);
  const classes = useStyles(sidebarWidth);
  const [loader, setLoader] = useState(false);
  const [a, setA] = useState(1);
  const [graphType, setGraphType] = useState("candlestick");
  const [separateGraphs, setSeparateGraphs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("FOREX");
  const [toggleFirstDayLine, setToggleFirstDayLine] = useState(true);
  const [enableDualChart, setEnableDualChart] = useState(false);

  const style = { width: "100%", height: "100%" };
  const scrollableListRef = useRef(null);

  const [layout, setLayout] = useState({...defaultLayout});

  const handleGrapthType = (type) => {
    setGraphType(type);
  };

  const [selectedStock, setSelectStock] = useState("MMM");
  const [selectedStockIndex, setSelectStockIndex] = useState(0);

  const [selectedPattern, setSelectedPattern] = useState(null);

  const [selectedTime, setSelectTime] = useState({ name: "1d", ms: 86400000 });
  const [selectedTemp, setSelectedTemp] = useState({
    id: 0,
    name: "T0",
    merged: {},
  });
  const [switchToggle, setSwitchToggle] = useState(0);

  const [data, setGraphData] = useState({ ...dummy });

  const getDataRequest = getDataRequestService(
    selectedCategory,
    setLoader,
    layout,
    setSeparateGraphs,
    setSelectedTemp,
    setGraphData,
    setLayout
  );

  useEffect(() => {
    getDataRequest(
      selectedStock,
      selectedTime,
      selectedTemp,
      selectedPattern,
      switchToggle
    );
  }, [selectedStock, selectedTime, selectedCategory]);

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  React.useEffect(() => {
    function handleResize() {
      if (
        layout.width !== window.innerWidth - 10 ||
        layout.height !== window.innerHeight - 50
      ) {
        setLayout({
          ...layout,
          width: window.innerWidth - 10,
          height: window.innerHeight - 50,
        });
      }
    }
    window.addEventListener("resize", handleResize);
  }, [window.innerWidth, window.innerHeight]);

  const handleStockChange = (stock) => {
    setSelectStock(stock);
    // getDataRequest(
    //   stock,
    //   selectedTime,
    //   selectedTemp,
    //   selectedPattern,
    //   switchToggle
    // );
  };

  const handlePatternChange = (pattern) => {
    setSelectedPattern(pattern);
    getDataRequest(
      selectedStock,
      selectedTime,
      selectedTemp,
      pattern,
      switchToggle
    );
  };

  const hanldeSelectedTime = (time) => {
    setSelectTime(time);
    getDataRequest(
      selectedStock,
      time,
      selectedTemp,
      selectedPattern,
      switchToggle
    );
  };

  const templateChange = (tempData) => {
    setSelectedTemp(tempData);
    getDataRequest(
      selectedStock,
      selectedTime,
      tempData,
      selectedPattern,
      switchToggle
    );
  };

  const handlSwitchToggle = (v) => {
    getDataRequest(
      selectedStock,
      selectedTime,
      selectedTemp,
      selectedPattern,
      v
    );
    setSwitchToggle(v);
  };
  const onHover = ({ points: [point] }) => {
    setA(point.pointIndex);
    setCursor("pointer");
  };
  const onUnhover = () => {
    setCursor("crosshair");
  };
  const onClick = () => {
    setCursor("grabbing");
  };

  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = React.useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        console.log(
          "sodebar resizing",
          window.innerWidth -
            (sidebarRef.current.getBoundingClientRect().right -
              mouseMoveEvent.clientX) -
            10
        );
        let w =
          window.innerWidth -
          (sidebarRef.current.getBoundingClientRect().right -
            mouseMoveEvent.clientX) -
          10;

        if (enableDualChart) {
          w = w / 2;
        }

        setLayout({
          ...layout,
          width: w,
          height: window.innerHeight - 50,
        });
        setSidebarWidth(
          sidebarRef.current.getBoundingClientRect().right -
            mouseMoveEvent.clientX
        );
      }
    },
    [isResizing]
  );

  useEffect(() => {
    let n = enableDualChart ? 2 : 1;
    let w;
    if (enableDualChart) {
      w = layout.width / n;
    } else {
      w = (window.innerWidth - 10) / n;
    }

    setLayout({
      ...layout,
      width: w,
    });
  }, [enableDualChart]);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const handleKeyDown = (e) => {
    if (e.keyCode === 38) {
      handleStockChange(stocks[selectedStockIndex - 1]);
      setSelectStockIndex(selectedStockIndex - 1);
      placeSelectedItemInTheMiddle(selectedStockIndex - 1);
    } else if (e.keyCode === 40) {
      handleStockChange(stocks[selectedStockIndex + 1]);
      setSelectStockIndex(selectedStockIndex + 1);
      placeSelectedItemInTheMiddle(selectedStockIndex + 1);
    }
  };
  const placeSelectedItemInTheMiddle = (index) => {
    const LIST_ITEM_HEIGHT = 21;
    const NUM_OF_VISIBLE_LIST_ITEMS = 15;

    const amountToScroll =
      LIST_ITEM_HEIGHT * NUM_OF_VISIBLE_LIST_ITEMS + index * LIST_ITEM_HEIGHT;
    scrollableListRef.current.scrollTo(amountToScroll, 0);
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });


  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="app-container">
          <div className={classes.container + " app-frame"}>
            <div
              style={{
                height: "100vh",
                overflowY: "hidden",
                overflowX: "hidden",
              }}
            >
              <div>
                <Header
                  setEnableDualChart={setEnableDualChart}
                  enableDualChart={enableDualChart}
                  handleGrapthType={handleGrapthType}
                  graphType={graphType}
                  templateChange={templateChange}
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
                />

                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div
                    id="default-chart"
                    style={{
                      cursor,
                      border:
                        currentSelected === "default"
                          ? "4px solid #438695"
                          : "none",
                    }}
                    onMouseUp={() => {}}
                  >
                    <DefaultChart
                      type="default"
                      onHover={onHover}
                      onDoubleClick={(e) => setCurrentSelected(e)}
                      rightMargin={rightMargin}
                      onUnhover={onUnhover}
                      onClick={onClick}
                      a={a}
                      graphType={graphType}
                      style={style}
                      data={data}
                      enableDualChart={enableDualChart}
                      selectedTemp={selectedTemp}
                      layout={layout}
                      toggleFirstDayLine={toggleFirstDayLine}
                      switchToggle={switchToggle}
                      selectedPattern={selectedPattern}
                      separateGraphs={separateGraphs}
                      loader={loader}
                    />
                  </div>
                  {enableDualChart && (
                    <div
                      id="secondary-chart"
                      style={{
                        cursor,
                        border:
                          currentSelected === "secondary"
                            ? "4px solid #438695"
                            : "none",
                      }}
                      onMouseUp={() => {}}
                    >
                      <DefaultChart
                        type="secondary"
                        onHover={onHover}
                        onDoubleClick={(e) => setCurrentSelected(e)}
                        rightMargin={rightMargin}
                        onUnhover={onUnhover}
                        onClick={onClick}
                        a={a}
                        graphType={graphType}
                        style={style}
                        data={data}
                        enableDualChart={enableDualChart}
                        selectedTemp={selectedTemp}
                        layout={layout}
                        toggleFirstDayLine={toggleFirstDayLine}
                        switchToggle={switchToggle}
                        selectedPattern={selectedPattern}
                        separateGraphs={separateGraphs}
                        loader={loader}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            onKeyDown={handleKeyDown}
            ref={sidebarRef}
            className="app-sidebar"
            style={{ width: sidebarWidth + "px" }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <div className="app-sidebar-resizer" onMouseDown={startResizing} />
            <div className="app-sidebar-content">
              <WatchList
                selectedStock={selectedStock}
                handleStockChange={handleStockChange}
                stocks={stocks}
                setStocks={setStocks}
                selectedStockIndex={selectedStockIndex}
                setSelectStockIndex={setSelectStockIndex}
                height={layout.height}
                scrollableListRef={scrollableListRef}
                placeSelectedItemInTheMiddle={placeSelectedItemInTheMiddle}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
