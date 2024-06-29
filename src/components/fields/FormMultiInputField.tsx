import React from "react";
import { FieldArray, useField, useFormikContext } from "formik";
import { Box, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IField } from "../../types/form.types";
import ImageExampleTooltip from "../tooltip/ImageExampleTooltip";
import InformationTooltip from "../tooltip/InformationTooltip";

interface FormMultiInputFieldProps {
  props: IField;
}

const FormMultiInputField: React.FC<FormMultiInputFieldProps> = ({ props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField<string[]>(props.name);

  return (
    <FieldArray name={props.name}>
      {({ remove, insert }) => (
        <Box>
          {field?.value?.map((item, index) => (
            <Box
              key={`${props.name}-${index}`}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <TextField
                name={`${props.name}.${index}`}
                label={props.label}
                value={item}
                onChange={(e) =>
                  setFieldValue(`${props.name}.${index}`, e.target.value)
                }
                fullWidth
                variant="outlined"
                margin="dense"
              />
              <IconButton
                onClick={() => remove(index)}
                disabled={field.value.length === 1}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => insert(index + 1, "")}
                disabled={
                  field.value.length >= (props.maxInputFields || 10) ||
                  field.value[index] === "" ||
                  field.value[0] === ""
                }
              >
                <AddCircleIcon />
              </IconButton>
              {index === field.value.length - 1 && (
                <>
                  {props.info && (
                    <InformationTooltip information={props.info} />
                  )}
                  {props.imageExample && (
                    <ImageExampleTooltip imageUrl={props.imageExample} />
                  )}
                </>
              )}
            </Box>
          ))}
        </Box>
      )}
    </FieldArray>
  );
};

export default FormMultiInputField;
