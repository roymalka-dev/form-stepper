import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import InformationTooltip from "../tooltip/InformationTooltip";
import ImageExampleTooltip from "../tooltip/ImageExampleTooltip";
import { IField } from "../../types/form.types";

interface FormConditionalSelectProps {
  props: IField;
}

const FormConditionalSelect: React.FC<FormConditionalSelectProps> = ({
  props,
}) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const [field, meta, helpers] = useField(props.name);
  const [showTextField, setShowTextField] = useState(
    values[props.name] ? true : false
  );
  const isError = Boolean(meta.touched && meta.error);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setShowTextField(value === "Other");
    helpers.setValue(value);
    if (value !== "Other") {
      setFieldValue(props.name, "");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ flex: 1 }}>
        <FormControl fullWidth error={isError} variant="outlined">
          <InputLabel>{props.label}</InputLabel>
          <Select
            {...field}
            label={props.label}
            onChange={handleSelectChange}
            value={field.value || ""}
          >
            {props.options?.map((option: any, index: number) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
            <MenuItem key="other" value="Other">
              Other
            </MenuItem>
          </Select>
        </FormControl>
        {isError && <Box sx={{ color: "error.main" }}>{meta.error}</Box>}
      </Box>
      <Box sx={{ ml: 2 }}>
        {props.info && <InformationTooltip information={props.info} />}
        {props.imageExample && (
          <ImageExampleTooltip imageUrl={props.imageExample} />
        )}{" "}
      </Box>

      {showTextField && (
        <TextField
          label={props.label || "Please specify"}
          fullWidth
          variant="outlined"
          margin="normal"
          value={values[`${props.name}Other`]}
          onChange={(e) => setFieldValue(props.name, e.target.value)}
        />
      )}
    </Box>
  );
};

export default FormConditionalSelect;
