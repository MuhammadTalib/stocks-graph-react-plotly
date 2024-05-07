import CloseIcon from "@mui/icons-material/Close";
import { IconButton, InputAdornment } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
    DateRangePicker,
    SingleInputDateRangeField,
} from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
    fullWidthPicker: {
        width: "100%", // Make the width 100% of its container
    },
}));

const DateRangePickerWrapper = ({ label, value, setValue }) => {
    const [selectedDate, setSelectedDate] = React.useState([null, null]);
    const classes = useStyles();

    const handleDateChange = ([start, end]) => {
        setSelectedDate([start, end]);
        setValue([
            start?.format("MM/DD/YYYY, HH:mm:ss"),
            end?.format("MM/DD/YYYY, HH:mm:ss"),
        ]);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: "100%" }}>
            {/* <DemoContainer components={["SingleInputDateRangeField"]}> */}
            <DemoItem component="DateRangePicker">
                <DateRangePicker
                    slots={{ field: SingleInputDateRangeField }}
                    slotProps={{
                        openPickerIcon: { fontSize: "large" },
                        openPickerButton: { color: "secondary" },
                        textField: {
                            fullWidth: true,
                            InputProps: {
                                endAdornment: (
                                    <InputAdornment
                                        className={classes.selectAdornment}
                                        position="end"
                                    >
                                       {selectedDate && selectedDate.length && selectedDate[0] && <IconButton
                                            onClick={(e)=>{
                                                e.stopPropagation()
                                                setSelectedDate([null, null])
                                                setValue([null, null])
                                            }}
                                            aria-label="delete"
                                            size="small"
                                        >   
                                            <CloseIcon />
                                        </IconButton>}
                                    </InputAdornment>
                                ),
                            },
                        },
                    }}
                    name="allowedRange"
                    onChange={handleDateChange}
                    value={selectedDate}
                    label={"Date Range"}
                />
            </DemoItem>
            {/* </DemoContainer> */}
        </LocalizationProvider>
    );
};

export default DateRangePickerWrapper;
