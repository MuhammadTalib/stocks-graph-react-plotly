import { Autocomplete, Paper, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const CustomPaper = (props) => {
    return <Paper elevation={8} {...props} />;
};
const AutocompleteWrapper = ({
    options,
    value,
    label,
    handleChange,
    selectedStock,
    getOptionLabel,
    renderOption,
    multiple,
    renderInput,
    limitTags,
}) => {
    const [openPatternDropdown, setOpenPatternDropdown] = useState(false);
    let patternRef = useRef(null);

    useEffect(() => {
        setOpenPatternDropdown(false);
    }, [selectedStock]);

    const handleKeyDown = (e) => {
        if (e.keyCode === 38) {
            setOpenPatternDropdown(false);
        } else if (e.keyCode === 40) {
            setOpenPatternDropdown(false);
        }
    };

    return (
        <div
            ref={patternRef}
            onMouseLeave={() => {
                setOpenPatternDropdown(false);
            }}
            style={{ paddingTop: "6px" }}
        >
            <Autocomplete
                limitTags={limitTags}
                onKeyPress={handleKeyDown}
                selectOnFocus={false}
                blurOnSelect={"touch"}
                onChange={(_, newValue) => {
                    handleChange(newValue);
                }}
                fullWidth
                multiple={multiple ? true : false}
                open={openPatternDropdown}
                options={[...options]}
                onBlur={() => {
                    setOpenPatternDropdown(false);
                }}
                onMouseLeave={() => {
                    patternRef.current.click();
                }}
                onKeyDown={() => {
                    setOpenPatternDropdown(true);
                }}
                onClick={() => {
                    setOpenPatternDropdown(true);
                }}
                value={value}
                defaultValue={options.find((v) => v[0])}
                PaperComponent={CustomPaper}
                getOptionLabel={getOptionLabel && getOptionLabel}
                renderOption={renderOption && renderOption}
                renderInput={
                    renderInput
                        ? renderInput
                        : (params) => (
                              <TextField
                                  {...params}
                                  label={label}
                                  variant="standard"
                                  onClick={() => {
                                      setOpenPatternDropdown(
                                          !openPatternDropdown
                                      );
                                  }}
                              />
                          )
                }
            />
        </div>
    );
};

export default AutocompleteWrapper;
