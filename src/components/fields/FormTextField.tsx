// TextFieldWithInfo.tsx
import React from "react";
import { useField } from "formik";
import { Box, TextField } from "@mui/material";
import { IField } from "../../types/form.types";
import ImageExampleTooltip from "../tooltip/ImageExampleTooltip";
import InformationTooltip from "../tooltip/InformationTooltip";

interface FormTextFieldProps {
  props: IField;
}

const FormTextField: React.FC<FormTextFieldProps> = ({ props }) => {
  const [field, meta] = useField(props.name);
  const isError = Boolean(meta.touched && meta.error);

  return !props.hidden ? (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        {...field}
        error={isError}
        helperText={isError ? meta.error : ""}
        label={props.label}
        fullWidth
        variant="outlined"
        disabled={props.disabled}
        type={props.type}
        InputLabelProps={props.type === "date" ? { shrink: true } : {}}
      />
      {props.info && <InformationTooltip information={props.info} />}
      {props.imageExample && (
        <ImageExampleTooltip imageUrl={props.imageExample} />
      )}
    </Box>
  ) : (
    <></>
  );
};

export default FormTextField;
