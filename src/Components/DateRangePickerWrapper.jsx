import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import * as React from "react";

const ProSpan = styled("span")({
    display: "inline-block",
    height: "1em",
    width: "1em",
    verticalAlign: "middle",
    marginLeft: "0.3em",
    marginBottom: "0.08em",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(https://mui.com/static/x/pro.svg)",
});

function Label({ componentName, valueType, isProOnly }) {
    const content = (
        <span>
            <strong>{componentName}</strong> for {valueType} editing
        </span>
    );

    if (isProOnly) {
        return (
            <Stack direction="row" spacing={0.5} component="span">
                <Tooltip title="Included on Pro package">
                    <a
                        href="https://mui.com/x/introduction/licensing/#pro-plan"
                        aria-label="Included on Pro package"
                    >
                        <ProSpan />
                    </a>
                </Tooltip>
                {content}
            </Stack>
        );
    }

    return content;
}

const DateRangePickerWrapper = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
                <DemoItem
                    label={
                        <Label
                            componentName="DateTimePicker"
                            valueType="date time"
                        />
                    }
                >
                    <DateTimePicker />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default DateRangePickerWrapper;
