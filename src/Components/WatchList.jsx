import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Divider, Grid, Menu } from "@mui/material";
import Fade from "@mui/material/Fade";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { times } from "../Utils/utils";

const WatchList = () => {
  let categories = ["Watch List", "L1", "L2", "L3", "L4"];

  const [selectedCategory, setSelectedCategory] = useState("Watch List");
  const [selectedTime, setSelectedTime] = useState("1d");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [timeanchorEl, setTimeanchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const openTime = Boolean(timeanchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleTimeClick = (event) => {
    setTimeanchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleTimeClose = () => {
    setTimeanchorEl(null);
  };
  return (
    <Grid container>
      <Grid item md={12} sm={12} xs={12}>
        <Grid item md={6} sm={6} xs={6}>
          <Button
            id="fade-button"
            fullWidth
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {selectedCategory}
          </Button>
          <Menu
            id="fade-menu"
            fullWidth
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {categories.map((m, i) => {
              return (
                <div key={i}>
                  <MenuItem style={{ width: "220px" }} onClick={handleClose}>
                    {m}
                  </MenuItem>{" "}
                  <Divider />
                </div>
              );
            })}
          </Menu>
        </Grid>
        <Grid item md={2} sm={2} xs={2}>
          <Button
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleTimeClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {selectedTime}
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={timeanchorEl}
            open={openTime}
            onClose={handleTimeClose}
            TransitionComponent={Fade}
          >
            {times.map((m, i) => {
              return (
                <div key={i}>
                  <MenuItem
                    key={i}
                    style={{ width: "120px" }}
                    onClick={handleClose}
                  >
                    {m.name}
                  </MenuItem>{" "}
                  <Divider />
                </div>
              );
            })}
          </Menu>
        </Grid>
      </Grid>

      <Grid item md={12} sm={12} xs={12}>
        {/* <WatchListTable /> */}
      </Grid>
    </Grid>
  );
};

export default WatchList;
