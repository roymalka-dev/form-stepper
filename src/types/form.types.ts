import * as yup from "yup";
export type IFieldTypes =
  | "text"
  | "number"
  | "email"
  | "password"
  | "date"
  | "time"
  | "select"
  | "radio"
  | "checkbox"
  | "textarea"
  | "multi-select"
  | "file"
  | "multi-input"
  | "auto-complete"
  | "conditional-select"
  | "search"
  | "radio";

export type IFieldInitalValues =
  | string
  | number
  | boolean
  | string[]
  | Date
  | File
  | null;

export type IFieldOptions = string | number | boolean | string[] | Date | File;

export interface IField {
  label: string;
  name: string;
  type: IFieldTypes;
  initialValues?: IFieldInitalValues;
  options?: IFieldOptions[];
  validations?: yup.AnySchema;
  disabled?: boolean;
  hidden?: boolean;
  info?: string;
  imageExample?: string;
  fileUploader?: (file: File) => any;
  fileDelete?: (...args: any) => void;
  searchHandler?: (search: string) => void;
  searchDebounceMs?: number;
  maxInputFields?: number;
  maxSelectFields?: number;
  fileUploadText?: string;
  fileRemoveText?: string;
  maxFileSize?: number;
  supportedFormats?: string[];
}

export interface ITab {
  name: string;
  fields: IField[];
  customField?: any;
}

export interface IFormInitialValues {
  [key: string]: string | number | boolean | string[] | Date | File | null;
}

export interface IForm {
  tabs: ITab[];
  submitFunction: (values: IFormInitialValues) => void;
  messageHandler?: (message: string) => void;
  submitText?: string;
  nextText?: string;
  useCache?: boolean;
  getStep?: (step: number) => void;
}
