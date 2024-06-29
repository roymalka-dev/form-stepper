# Form Stepper Component Library

A dynamic and customizable form stepper component library built with React and TypeScript. This library allows users to define form steps and fields through a configuration object, and it generates the corresponding forms automatically.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Components](#components)
  - [FormStepper](#formstepper)
  - [DynamicField](#dynamicfield)
  - [Field Components](#field-components)
    - [FormMultiSelectField](#formmultiselectfield)
    - [FormAutocompleteField](#formautocompletefield)
    - [FormMultiInputField](#formmultiinputfield)
    - [FormFileUploadField](#formfileuploadfield)
    - [FormConditionalSelectField](#formconditionalselectfield)
    - [FormAsyncSearchField](#formasynsearchfield)
    - [FormRadioField](#formradiofield)
    - [FormTextField](#formtextfield)
- [Utilities](#utilities)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the package via NPM or Yarn:

\`\`\`bash
npm install your-package-name
\`\`\`

or

\`\`\`bash
yarn add your-package-name
\`\`\`

## Usage

Here's an example of how to use the \`FormStepper\` component from this package:

```tsx
import { FormStepper, IFormInitialValues, ITab } from "form-stepper";
import * as yup from "yup";
const tabs: ITab[] = [
  {
    name: "First Tab",
    fields: [
      {
        label: "Text Field",
        name: "text_field",
        type: "text",
        initialValues: "Sample text",
        validations: yup.string().required("Text field is required"),
        disabled: false,
        hidden: false,
        info: "Enter some text",
        imageExample: "https://via.placeholder.com/150",
      },
      {
        label: "Number Field",
        name: "number_field",
        type: "number",
        initialValues: 42,
        validations: yup.number().required("Number field is required"),
        info: "Enter a number",
      },
      {
        label: "Email Field",
        name: "email_field",
        type: "email",
        validations: yup
          .string()
          .email("Invalid email format")
          .required("Email field is required"),
        info: "Enter your email address",
      },
      {
        label: "Password Field",
        name: "password_field",
        type: "password",
        validations: yup.string().required("Password field is required"),
        info: "Enter your password",
      },
      {
        label: "Date Field",
        name: "date_field",
        type: "date",
        initialValues: new Date(),
        validations: yup.date().required("Date field is required"),
        info: "Select a date",
      },
      {
        label: "Time Field",
        name: "time_field",
        type: "time",
        validations: yup.string().required("Time field is required"),
        info: "Select a time",
      },
      {
        label: "Select Field",
        name: "select_field",
        type: "select",
        options: ["Option 1", "Option 2", "Option 3"],
        validations: yup.string().required("Select field is required"),
        info: "Select an option",
      },
      {
        label: "Radio Field",
        name: "radio_field",
        type: "radio",
        options: ["Option A", "Option B", "Option C"],
        validations: yup.string().required("Radio field is required"),
        info: "Select an option",
      },
      {
        label: "Checkbox Field",
        name: "checkbox_field",
        type: "checkbox",
        options: ["Option X", "Option Y", "Option Z"],
        validations: yup
          .array()
          .of(yup.string())
          .min(1, "Select at least one option"),
        info: "Select one or more options",
      },
      {
        label: "Textarea Field",
        name: "textarea_field",
        type: "textarea",
        validations: yup.string().required("Textarea field is required"),
        info: "Enter text",
      },
      {
        label: "Multi-Select Field",
        name: "multi_select_field",
        type: "multi-select",
        options: ["Option 1", "Option 2", "Option 3"],
        validations: yup
          .array()
          .of(yup.string())
          .min(1, "Select at least one option"),
        info: "Select one or more options",
      },
      {
        label: "File Upload Field",
        name: "file_upload_field",
        type: "file",
        validations: yup.mixed().required("File upload field is required"),
        info: "Upload a file",
        maxFileSize: 1024 * 1024, // 1MB
        supportedFormats: ["image/jpeg", "image/png"],
        fileUploadText: "Upload your file",
        fileRemoveText: "Remove the file",
      },
      {
        label: "Multi-Input Field",
        name: "multi_input_field",
        type: "multi-input",
        validations: yup
          .array()
          .of(yup.string())
          .min(1, "Enter at least one input"),
        info: "Enter multiple inputs",
        maxInputFields: 5,
      },
      {
        label: "Autocomplete Field",
        name: "autocomplete_field",
        type: "auto-complete",
        options: ["Option 1", "Option 2", "Option 3"],
        validations: yup.string().required("Autocomplete field is required"),
        info: "Start typing to see suggestions",
      },
      {
        label: "Conditional Select Field",
        name: "conditional_select_field",
        type: "conditional-select",
        options: ["Option 1", "Option 2", "Option 3"],
        validations: yup
          .string()
          .required("Conditional select field is required"),
        info: "Select an option",
      },
      {
        label: "Search Field",
        name: "search_field",
        type: "search",
        validations: yup.string().required("Search field is required"),
        info: "Enter search term",
        searchHandler: (search) => console.log(search),
        searchDebounceMs: 300,
      },
    ],
  },
  {
    name: "Second Tab",
    fields: [
      {
        label: "Username",
        name: "username",
        type: "text",
        validations: yup.string().required("Username is required"),
        info: "Enter your username",
      },
    ],
  },
];

const handleSubmit = (values: IFormInitialValues) => {
  console.log(values);
};
const messageHandler = (message: string) => {
  alert(message);
};

function App() {
  return (
    <>
      <FormStepper
        tabs={tabs}
        submitFunction={handleSubmit}
        submitText="Submit"
        nextText="Next"
        useCache={true}
        messageHandler={messageHandler}
      />
    </>
  );
}

export default App;
```

## Configuration

The \`FormStepper\` component takes a configuration object that defines the tabs and fields for the form. The configuration object should follow this structure:

```typescript
interface IField {
  label: string;
  name: string;
  type: string;
  initialValues?: any;
  options?: any[];
  validations?: any;
  disabled?: boolean;
  hidden?: boolean;
  info?: string;
  imageExample?: string;
  fileUploader?: (file: File) => void;
  fileDelete?: (fileUrl: string) => void;
  maxFileSize?: number;
  supportedFormats?: string[];
}

interface ITab {
  name: string;
  fields: IField[];
}

interface IForm {
  tabs: ITab[];
  submitFunction: (values: any) => void;
  messageHandler?: (message: string) => void;
  submitText?: string;
  nextText?: string;
  useCache?: boolean;
}
```

## Components

### FormStepper

The \`FormStepper\` component dynamically generates form steps based on the provided configuration object.

#### Props

| Prop Name          | Type         | Description                               |
| ------------------ | ------------ | ----------------------------------------- |
| \`tabs\`           | \`ITab[]\`   | An array of tab objects containing fields |
| \`submitFunction\` | \`function\` | Function to handle form submission        |
| \`messageHandler\` | \`function\` | Function to handle messages               |
| \`submitText\`     | \`string\`   | Text for the submit button                |
| \`nextText\`       | \`string\`   | Text for the next button                  |
| \`useCache\`       | \`boolean\`  | Whether to use cache for form values      |

### DynamicField

The \`DynamicField\` component renders different form fields based on the field type.

#### Props

| Prop Name          | Type                        | Description                                                       |
| ------------------ | --------------------------- | ----------------------------------------------------------------- |
| `label`            | `string`                    | The label for the field.                                          |
| `name`             | `string`                    | The name identifier for the field.                                |
| `type`             | `IFieldTypes`               | The type of the field (e.g., text, number, email, etc.).          |
| `initialValues`    | `IFieldInitalValues`        | The initial value(s) for the field.                               |
| `options`          | `IFieldOptions[]`           | Array of options for select, radio, or similar fields.            |
| `validations`      | `yup.AnySchema`             | Validation schema for the field using Yup.                        |
| `disabled`         | `boolean`                   | If true, the field will be disabled.                              |
| `hidden`           | `boolean`                   | If true, the field will be hidden.                                |
| `info`             | `string`                    | Additional information or tooltip text for the field.             |
| `imageExample`     | `string`                    | URL to an image example related to the field.                     |
| `fileUploader`     | `(file: File) => void`      | Function to handle file uploads for file-type fields.             |
| `fileDelete`       | `(fileUrl: string) => void` | Function to handle file deletion for file-type fields.            |
| `searchHandler`    | `(search: string) => void`  | Function to handle search queries for search-type fields.         |
| `searchDebounceMs` | `number`                    | Debounce delay in milliseconds for the search handler.            |
| `maxInputFields`   | `number`                    | Maximum number of input fields allowed for multi-input fields.    |
| `maxSelectFields`  | `number`                    | Maximum number of select options allowed for multi-select fields. |
| `fileUploadText`   | `string`                    | Custom text to display during file upload for file-type fields.   |
| `fileRemoveText`   | `string`                    | Custom text to display for file removal for file-type fields.     |
| `maxFileSize`      | `number`                    | Maximum file size allowed for file-type fields (in bytes).        |
| `supportedFormats` | `string[]`                  | Array of supported file formats for file-type fields.             |

### Field Components

Each field component is dynamically rendered by the \`DynamicField\` component based on the type specified in the configuration.

#### FormMultiSelectField

A multi-select field component.

#### FormAutocompleteField

An autocomplete field component.

#### FormMultiInputField

A multi-input field component.

#### FormFileUploadField

A file upload field component.

#### FormConditionalSelectField

A conditional select field component.

#### FormAsyncSearchField

An async search field component.

#### FormRadioField

A radio button field component.

#### FormTextField

A text input field component.

## Utilities

- \`generateValidationSchema.ts\`: Utility to generate validation schemas for the form fields.
- \`generateInitialValues.ts\`: Utility to generate initial values for the form fields.
- \`localStorageUtils.ts\`: Utility to handle local storage for form values.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
