import React from "react";
import { useField, useFormikContext } from "formik";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import InformationTooltip from "../tooltip/InformationTooltip";
import ImageExampleTooltip from "../tooltip/ImageExampleTooltip";
import { IField } from "../../types/form.types";

interface FormRadioFieldProps {
  props: IField;
}

const FormRadioField: React.FC<FormRadioFieldProps> = ({ props }) => {
  const { setFieldValue } = useFormikContext<any>();
  const [field, meta] = useField(props.name);
  const isError = Boolean(meta.touched && meta.error);

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
        <FormControl component="fieldset" error={isError} sx={{ flex: 1 }}>
          <FormLabel component="legend">{props.label}</FormLabel>
          <RadioGroup
            {...field}
            name={props.name}
            onChange={(event) => setFieldValue(props.name, event.target.value)}
          >
            {props.options?.map((option) => (
              <FormControlLabel
                key={option.toString()}
                value={option}
                control={<Radio />}
                label={option.toString()}
              />
            ))}
          </RadioGroup>
          {isError && (
            <Typography color="error" variant="body2">
              {meta.error}
            </Typography>
          )}
        </FormControl>
        <Box sx={{ display: "flex", flexDirection: "row", ml: 2 }}>
          {props.info && <InformationTooltip information={props.info} />}
          {props.imageExample && (
            <ImageExampleTooltip imageUrl={props.imageExample} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FormRadioField;
