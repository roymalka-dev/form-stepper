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
            currentValues[field.name] ?? field.initialValues ?? undefined ?? [];
          break;
        case "radio":
          acc[field.name] =
            currentValues[field.name] ?? field.initialValues ?? undefined ?? "";
          break;
        case "select":
          acc[field.name] =
            currentValues[field.name] ?? field.initialValues ?? undefined ?? "";
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
        case "time":
          acc[field.name] =
            currentValues[field.name] ?? field.initialValues ?? "00:00";
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
            currentValues[field.name] ?? field.initialValues ?? "";
      }
    });
    return acc;
  }, {});

  return { ...initialValues, ...currentValues };
};
