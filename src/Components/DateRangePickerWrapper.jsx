import * as React from "react";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers-pro";
// import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const DateRangePickerWrapper = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <></>
        // <LocalizationProvider dateAdapter={AdapterDayjs}>
        //     {/* <DemoContainer components={["DateRangePicker"]}>
        //         <DateRangePicker
        //             localeText={{ start: "Check-in", end: "Check-out" }}
        //         />
        //     </DemoContainer> */}
        // </LocalizationProvider>
    );
};

export default DateRangePickerWrapper;
