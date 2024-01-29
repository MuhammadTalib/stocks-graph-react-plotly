import { createTheme, adaptV4Theme } from "@mui/material/styles";
let primary = "#901f61";

export const theme = createTheme(
    adaptV4Theme({
        palette: {
            primary: { main: primary, light: "#901f6117" },
            secondary: { main: "#829ae621" },
        },
        typography: {
            fontSize: 12,
            fontFamily: "Arial",
            fontWeightLight: 400,
            fontWeightRegular: 500,
            fontWeightMedium: 600,
            h1: {
                fontSize: 26,
                wordBreak: "break-all",
            },
            h2: {
                fontSize: 24,
                wordBreak: "break-all",
            },
            h3: {
                fontSize: 22,
                wordBreak: "break-all",
            },
            h4: {
                fontSize: 20,
                wordBreak: "break-all",
            },
            h5: {
                fontSize: 18,
                wordBreak: "break-all",
            },
            h6: {
                fontSize: 18,
                wordBreak: "break-all",
            },
            subtitle1: {
                fontSize: 20,
                fontWeight: "bold",
                wordBreak: "break-all",
            },
            subtitle2: {
                wordBreak: "break-all",
            },
            body1: {
                wordBreak: "break-all",
            },
            body2: {
                fontSize: 13,
                wordBreak: "break-all",
            },
        },
        props: {
            MuiTextField: {
                variant: "standard",
                margin: "none",
            },
            MuiTooltip: { placement: "bottom", arrow: true },
        },
        overrides: {
            MuiInput: {
                input: {
                    fontSize: 12,
                },
            },
            MuiInputLabel: {
                root: {
                    fontSize: 12,
                },
            },
            MuiTooltip: {
                tooltip: {
                    fontSize: "10px",
                    color: "white",
                    backgroundColor: primary,
                },
                arrow: {
                    color: primary,
                    backgroundColor: "white",
                },
            },
            MuiCheckbox: {
                colorSecondary: {
                    "&$checked": {
                        color: primary,
                    },
                },
            },
            MuiTableCell: {
                root: {
                    padding: "none",
                    fontSize: "12px",
                    minWidth: "10px",
                    maxWidth: "10px",
                    width: "10px",
                },
                head: {
                    background: "#484848",
                    color: "white",
                    minWidth: "10px",
                    maxWidth: "10px",
                    width: "10px",
                },
            },
        },
    })
);
