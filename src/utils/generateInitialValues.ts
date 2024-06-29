import { IField, IFormInitialValues, ITab } from "../types/form.types";

export const generateInitialValues = (
  tabs: ITab[],
  currentValues: IFormInitialValues = {}
): IFormInitialValues => {
  const initialValues = tabs.reduce<IFormInitialValues>((acc, tab) => {
    tab.fields.forEach((field: IField) => {
      switch (field.type) {
        case "checkbox":
          acc[field.name] =
            currentValues[field.name] ?? field.initialValues ?? false;
          break;
        case "radio":
          acc[field.name] =
            currentValues[field.name] ?? field.initialValues ?? "";
          break;
        case "select":
          acc[field.name] =
            currentValues[field.name] ?? field.initialValues ?? "";
          break;
        case "number":
          acc[field.name] =
            currentValues[field.name] ?? field.initialValues ?? 0;
          break;
        case "text":
          acc[field.name] =
            currentValues[field.name] ?? field.initialValues ?? "";
          break;

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
            currentValues[field.name] ?? field.initialValues ?? "";
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
