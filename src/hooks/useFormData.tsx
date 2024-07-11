import { useState, useEffect } from "react";
import { IFormInitialValues } from "../types/form.types";

export const useFormData = () => {
  const [formData, setFormData] = useState<IFormInitialValues>(() => {
    const savedData = localStorage.getItem("form-stepper-data");
    return savedData ? JSON.parse(savedData) : {};
  });

  const setFieldValue = (name: string, value: any) => {
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      return newData;
    });
  };

  const getFieldValue = (name: string) => {
    return formData[name];
  };

  useEffect(() => {
    localStorage.setItem("form-stepper-data", JSON.stringify(formData));
  }, [formData]);

  const triggerRefetch = () => {
    const savedData = localStorage.getItem("form-stepper-data");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  };

  return { formData, setFieldValue, getFieldValue, triggerRefetch };
};
