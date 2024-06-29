import React from "react";
import { useField, useFormikContext } from "formik";
import { Autocomplete, Chip, TextField, FormControl, Box } from "@mui/material";
import InformationTooltip from "../tooltip/InformationTooltip";
import ImageExampleTooltip from "../tooltip/ImageExampleTooltip";
import { IField } from "../../types/form.types";

interface FormAutocompleteFieldProps {
  props: IField;
}

const FormAutocompleteField: React.FC<FormAutocompleteFieldProps> = ({
  props,
}) => {
  const { setFieldValue } = useFormikContext<string[]>();
  const [field, meta] = useField<string[]>(props.name);
  const isError = Boolean(meta.touched && meta.error);

  const formatOption = (option: any): string => {
    if (option instanceof Date) {
      return option.toISOString().split("T")[0];
    }
    return option.toString();
  };

  return (
    <FormControl fullWidth error={isError} variant="outlined" sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Autocomplete
          multiple
          options={props.options?.map(formatOption) || []}
          value={field.value || []}
          onChange={(_event, value) => setFieldValue(props.name, value)}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                label={option}
                {...getTagProps({ index })}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={props.label}
              error={isError}
              helperText={isError ? meta.error : ""}
            />
          )}
          sx={{ flex: 1 }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            ml: 2,
            alignItems: "center",
          }}
        >
          {props.info && <InformationTooltip information={props.info} />}
          {props.imageExample && (
            <ImageExampleTooltip imageUrl={props.imageExample} />
          )}
        </Box>
      </Box>
    </FormControl>
  );
};

export default FormAutocompleteField;
