import {
  IField,
  IFieldInitalValues,
  IFormInitialValues,
  ITab,
} from "../types/form.types";

export const generateInitialValues = (
  tabs: ITab[],
  currentValues: IFormInitialValues = {}
): IFormInitialValues => {
  const initialValues = tabs.reduce<IFormInitialValues>((acc, tab) => {
    tab.fields.forEach((field: IField) => {
      switch (field.type) {
        case "date":
          acc[field.name] =
            currentValues[field.name] ??
            field.initialValues ??
            new Date().toISOString().split("T")[0];
          break;
        case "multi-input":
          acc[field.name] = currentValues[field.name] ??
            field.initialValues ?? [""];
          break;
        case "multi-select":
          acc[field.name] =
            currentValues[field.name] ?? field.initialValues ?? [];
          break;
        case "search":
          acc[field.name] =
            currentValues[field.name] ?? field.initialValues ?? null;
          break;
        default:
          acc[field.name] =
            currentValues[field.name] ?? field.initialValues ?? null;
      }
    });
    return acc;
  }, {});

  return { ...initialValues, ...currentValues };
};
