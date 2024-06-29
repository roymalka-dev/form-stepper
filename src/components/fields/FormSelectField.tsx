import React from "react";
import { useField, useFormikContext } from "formik";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import InformationTooltip from "../tooltip/InformationTooltip";
import ImageExampleTooltip from "../tooltip/ImageExampleTooltip";
import { IField } from "../../types/form.types";

interface FormSelectFieldProps {
  props: IField;
}

const FormSelectField: React.FC<FormSelectFieldProps> = ({ props }) => {
  const { setFieldValue } = useFormikContext<any>();
  const [field, meta] = useField(props.name);
  const isError = Boolean(meta.touched && meta.error);

  return (
    <FormControl fullWidth error={isError} variant="outlined" sx={{ mb: 2 }}>
      <InputLabel>{props.label}</InputLabel>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Select
          {...field}
          value={field.value || ""}
          onChange={(event) => setFieldValue(props.name, event.target.value)}
          label={props.label}
          inputProps={{
            name: props.name,
            id: `${props.name}-select`,
          }}
          sx={{ flex: 1 }}
        >
          {props.options?.map((option, index) => (
            <MenuItem key={index} value={option.toString()}>
              {option.toString()}
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ display: "flex", flexDirection: "row", ml: 2 }}>
          {props.info && <InformationTooltip information={props.info} />}
          {props.imageExample && (
            <ImageExampleTooltip imageUrl={props.imageExample} />
          )}
        </Box>
      </Box>
      {isError && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {meta.error}
        </Typography>
      )}
    </FormControl>
  );
};

export default FormSelectField;
