import React, { useState, useCallback } from "react";
import { useField, useFormikContext } from "formik";
import {
  TextField,
  Autocomplete,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import InformationTooltip from "../tooltip/InformationTooltip";
import ImageExampleTooltip from "../tooltip/ImageExampleTooltip";
import { IField } from "../../types/form.types";
import debounce from "lodash/debounce";

interface FormAsyncSearchFieldProps {
  props: IField;
}

const FormAsyncSearchField: React.FC<FormAsyncSearchFieldProps> = ({
  props,
}) => {
  const { setFieldValue } = useFormikContext<any>();
  const [field, meta] = useField(props.name);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isError = Boolean(meta.touched && meta.error);

  const searchHandler =
    props.searchHandler ||
    (() => {
      console.log("searchHandler not implemented");
    });

  const debouncedSearchHandler = useCallback(
    debounce(async (value: string) => {
      setLoading(true);
      try {
        await searchHandler(value);
      } finally {
        setLoading(false);
      }
    }, props.searchDebounceMs || 300),
    []
  );

  return (
    <Box sx={{ width: "100%", borderRadius: 3 }}>
      {props.label && (
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <Typography variant="h6">{props.label}</Typography>
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Autocomplete
          {...field}
          open={open}
          onInputChange={(_event, value, reason) => {
            if (reason === "input") debouncedSearchHandler(value);
          }}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={(_event, value: string | number | null) => {
            setFieldValue(props.name, value);
          }}
          isOptionEqualToValue={(option, value) => option === value}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.toString()
          }
          options={props.options || []}
          loading={loading}
          noOptionsText="No results"
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.label}
              error={isError}
              helperText={isError ? meta.error : ""}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.toString()}>
              {option}
            </li>
          )}
          sx={{ flex: 1 }}
        />
        <Box sx={{ display: "flex", ml: 2 }}>
          {props.info && <InformationTooltip information={props.info} />}
          {props.imageExample && (
            <ImageExampleTooltip imageUrl={props.imageExample} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FormAsyncSearchField;
