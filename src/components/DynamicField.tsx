import React from "react";
import { IField } from "../types/form.types";
import { Field } from "formik";
import FormTextField from "./fields/FormTextField";
import FormMultiInputField from "./fields/FormMultiInputField";
import FormMultiSelectField from "./fields/FormMultiSelectField";
import FormAutocompleteField from "./fields/FormAutocompleteField";
import FormConditionalSelect from "./fields/FormConditionalSelectField";
import FormFileUploadField from "./fields/FormFileUploadField";
import FormAsyncSearchField from "./fields/FormAsyncSearchFieldProps";
import FormRadioField from "./fields/FormRadioField";
interface DynamicFieldProps {
  props: IField;
  messageHandler: (message: string) => void;
}
const DynamicField: React.FC<DynamicFieldProps> = ({
  props,
  messageHandler,
}) => {
  return (
    <Field name={props.name}>
      {() => {
        switch (props.type) {
          case "multi-select":
            return <FormMultiSelectField props={props} />;
          case "multi-input":
            return <FormMultiInputField props={props} />;
          case "auto-complete":
            return <FormAutocompleteField props={props} />;
          case "conditional-select":
            return <FormConditionalSelect props={props} />;
          case "file":
            return (
              <FormFileUploadField
                props={props}
                messageHandler={messageHandler}
              />
            );
          case "search":
            return <FormAsyncSearchField props={props} />;
          case "radio":
            return <FormRadioField props={props} />;
          default:
            return <FormTextField props={props} />;
        }
      }}
    </Field>
  );
};

export default DynamicField;
