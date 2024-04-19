import MenuIcon from "@mui/icons-material/Menu";
import { FormControlLabel, IconButton, Switch } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { templates, times } from "../Utils/defaults";
import { BAR_ICON, OHLC_ICON } from "../Utils/utils";
import { getAllStocks } from "../services/api";
import AutocompleteWrapper from "./AutocompleteWrapper";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Header = ({
    handleGrapthType,
    graphType,
    templateChange,
    setEnableDualChart,
    enableDualChart,
    handlePatternChange,
    selectedTime,
    hanldeSelectedTime,
    selectedTemp,
    selectedPattern,
    handlSwitchToggle,
    switchToggle,
    toggleFirstDayLine,
    setToggleFirstDayLine,
    selectedStock,
    dataBaseUrl,
    setSidebarWidth,
}) => {
    let linkRef = useRef();
    let [patterns, setPatterns] = useState([]);
    let [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        getAllStocks("stocks/patterns").then((res) => {
            setPatterns(res?.data?.list || []);
        });
    }, []);

    const openSidebar = () => {
        if (!sidebarOpen) setSidebarWidth(500);
        if (sidebarOpen) setSidebarWidth(6);

        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={2}
                style={{ position: "fixed", padding: "10px" }}
            >
                <Grid item xs={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <AutocompleteWrapper
                                options={patterns}
                                value={selectedPattern}
                                label={"Pattern"}
                                handleChange={handlePatternChange}
                                selectedStock={selectedStock}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        disabled={selectedTime.name !== "1d"}
                                        checked={toggleFirstDayLine}
                                        onChange={(e) => {
                                            setToggleFirstDayLine(
                                                e.target.checked
                                            );
                                        }}
                                    />
                                }
                                label="1st"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <ButtonGroup
                                variant="text"
                                aria-label="text button group"
                            >
                                <Button
                                    className={`btn ${
                                        graphType !== "ohlc"
                                            ? "templateBtn"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleGrapthType("candlestick")
                                    }
                                >
                                    {OHLC_ICON()}
                                </Button>
                                <Button
                                    className={`btn ${
                                        graphType === "ohlc"
                                            ? "templateBtn"
                                            : ""
                                    }`}
                                    onClick={() => handleGrapthType("ohlc")}
                                >
                                    {BAR_ICON()}
                                </Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item md={2}>
                            <AutocompleteWrapper
                                options={["0", 1, 2, 3, 4, 5]}
                                value={switchToggle}
                                label={"MT4"}
                                handleChange={handlSwitchToggle}
                                selectedStock={selectedStock}
                                getOptionLabel={(option) => {
                                    return option;
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <AutocompleteWrapper
                                options={times}
                                value={selectedTime}
                                label={"Time"}
                                handleChange={hanldeSelectedTime}
                                selectedStock={selectedStock}
                                getOptionLabel={(option) => {
                                    return option ? option?.name : "";
                                }}
                                isOptionEqualToValue={(option, value) =>
                                    option.name === value.name &&
                                    option.desc === value.desc &&
                                    option.ms === value.ms
                                }
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <AutocompleteWrapper
                                options={templates}
                                value={selectedTemp}
                                label={"Template"}
                                handleChange={templateChange}
                                selectedStock={selectedStock}
                                getOptionLabel={(option) => {
                                    return option ? option?.name : "";
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                onClick={() => {
                                    setEnableDualChart(!enableDualChart);
                                    document
                                        .querySelector(
                                            '[data-title="Autoscale"]'
                                        )
                                        ?.click();
                                }}
                                className={`btn ${
                                    enableDualChart ? "templateBtn" : ""
                                }`}
                            >
                                Dual Chart
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Grid container spacing={2}>
                        <Grid item md={11}>
                            {dataBaseUrl !== "/db_v1" ? (
                                <ButtonGroup
                                    variant="text"
                                    aria-label="text button group"
                                >
                                    {/* <React.Fragment> */}
                                    <Link
                                        style={{ display: "none" }}
                                        ref={linkRef}
                                        target={"_blank"}
                                        to="/db_v1"
                                    ></Link>

                                    <Button
                                        onClick={() => {
                                            linkRef.current.click();
                                        }}
                                        style={{ color: "white" }}
                                    >
                                        {"__"}
                                    </Button>
                                    {/* </React.Fragment> */}
                                </ButtonGroup>
                            ) : (
                                <></>
                            )}
                        </Grid>
                        <Grid item md={1}>
                            <IconButton onClick={openSidebar} color="primary">
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Header;
