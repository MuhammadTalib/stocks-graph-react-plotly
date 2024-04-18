import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
    fullWidthPicker: {
        width: "100%", // Make the width 100% of its container
    },
}));

const DateRangePickerWrapper = ({ label, value, setValue }) => {
    const [selectedDate, setSelectedDate] = React.useState(null);
    const classes = useStyles();

    const handleDateChange = (date) => {
        setSelectedDate(date)
        setValue(date.format('MM/DD/YYYY, HH:mm:ss'))
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
            <DateTimePicker
                className={classes.fullWidthPicker}
                value={selectedDate}
                onChange={handleDateChange}
                label={label}
                ampm={false} // Setting ampm to false for 24-hour format
                format="MM-DD-YYYY, HH:mm:ss" // 24-hour format example 04/04/2024, 21:20:00
            />
        </LocalizationProvider>
    );
};

export default DateRangePickerWrapper;
