import { IField, ITab } from "../types/form.types";
import * as yup from "yup";

export const generateValidationSchemas = (tabs: ITab[]): yup.AnySchema[] => {
  return tabs.map((tab) => {
    const shape: Record<string, yup.AnySchema> = {} as Record<
      string,
      yup.AnySchema
    >;
    tab.fields.forEach((field: IField) => {
      if (field.hidden) return;

      if (field.validations) {
        shape[field.name] = field.validations;
      }
    });
    return yup.object().shape(shape);
  });
};
