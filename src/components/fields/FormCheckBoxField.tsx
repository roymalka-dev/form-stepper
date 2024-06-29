import React from "react";
import { useField, useFormikContext } from "formik";
import {
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import InformationTooltip from "../tooltip/InformationTooltip";
import ImageExampleTooltip from "../tooltip/ImageExampleTooltip";
import { IField } from "../../types/form.types";

interface FormCheckBoxFieldProps {
  props: IField;
}

const FormCheckBoxField: React.FC<FormCheckBoxFieldProps> = ({ props }) => {
  const { setFieldValue } = useFormikContext<any>();
  const [field, meta] = useField(props.name);
  const isError = Boolean(meta.touched && meta.error);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueArray = [...field.value] as string[];
    if (event.target.checked) {
      valueArray.push(event.target.name);
    } else {
      const index = valueArray.indexOf(event.target.name);
      valueArray.splice(index, 1);
    }
    setFieldValue(props.name, valueArray);
  };

  return (
    <FormControl component="fieldset" error={isError} sx={{ mb: 2 }}>
      {props.label && (
        <Typography variant="h6" gutterBottom>
          {props.label}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {props.options?.map((option, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    name={option.toString()}
                    checked={(field.value as string[]).includes(
                      option.toString()
                    )}
                    onChange={handleChange}
                  />
                }
                label={option.toString()}
              />
            </Box>
          ))}
        </Box>

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

export default FormCheckBoxField;
