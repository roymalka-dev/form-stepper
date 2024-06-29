// TextFieldWithInfo.tsx
import React, { useEffect, useState } from "react";
import { useField } from "formik";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IField } from "../../types/form.types";
import ImageExampleTooltip from "../tooltip/ImageExampleTooltip";
import InformationTooltip from "../tooltip/InformationTooltip";

interface FormTextFieldProps {
  props: IField;
}

const FormTextField: React.FC<FormTextFieldProps> = ({ props }) => {
  const [field, meta] = useField(props.name);
  const [hasValue, setHasValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isError = Boolean(meta.touched && meta.error);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const getInputType = () => {
    if (props.type === "password") {
      return showPassword ? "text" : "password";
    }
    return props.type;
  };

  useEffect(() => {
    {
      field.value && setHasValue(true);
    }
  }, [field.value]);

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
        type={getInputType()}
        InputLabelProps={{
          shrink: props.type === "date" || props.type === "time" || hasValue,
        }}
        InputProps={{
          endAdornment:
            props.type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "row", ml: 2 }}>
        {props.info && <InformationTooltip information={props.info} />}
        {props.imageExample && (
          <ImageExampleTooltip imageUrl={props.imageExample} />
        )}
      </Box>
    </Box>
  ) : (
    <></>
  );
};

export default FormTextField;
