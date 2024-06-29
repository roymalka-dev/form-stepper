import React from "react";
import { useField, useFormikContext } from "formik";
import {
  Box,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import InformationTooltip from "../tooltip/InformationTooltip";
import ImageExampleTooltip from "../tooltip/ImageExampleTooltip";
import { IField } from "../../types/form.types";

interface FormMultiSelectFieldProps {
  props: IField;
}

const FormMultiSelectField: React.FC<FormMultiSelectFieldProps> = ({
  props,
}) => {
  const { setFieldValue } = useFormikContext<string[]>();
  const [field, meta] = useField<string[]>(props.name);
  const isError = Boolean(meta.touched && meta.error);

  const handleDelete = (valueToRemove: string) => {
    const newValue = (field.value as string[]).filter(
      (value) => value !== valueToRemove
    );
    setFieldValue(props.name, newValue);
  };

  return (
    <FormControl fullWidth error={isError} variant="outlined" sx={{ mb: 2 }}>
      <InputLabel>{props.label}</InputLabel>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Select
          {...field}
          multiple
          value={field.value || []}
          onChange={(event) =>
            setFieldValue(props.name, event.target.value as string[])
          }
          input={
            <OutlinedInput id={`${props.name}-select`} label={props.label} />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((value: string) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={(event) => {
                    event.stopPropagation();
                    handleDelete(value);
                  }}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={{
            MenuListProps: { disableListWrap: true },
          }}
          sx={{ flex: 1 }}
        >
          {props.options?.map((option: any, index: number) => (
            <MenuItem key={index} value={option}>
              {option}
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

export default FormMultiSelectField;
