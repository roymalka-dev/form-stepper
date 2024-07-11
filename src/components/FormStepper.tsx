import React, { useEffect } from "react";
import { IForm, IFormInitialValues, ITab } from "../types/form.types";
import { generateValidationSchemas } from "../utils/generateValidationSchema";
import { generateInitialValues } from "../utils/generateInitialValues";
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import DynamicField from "./DynamicField";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../utils/localStorageUtils";

const FormStepper: React.FC<IForm> = ({
  tabs,
  messageHandler = (message: string) => {
    console.log(message);
  },
  submitFunction,
  submitText = "submit",
  nextText = "next",
  getStep = () => {},
  useCache = false,
}) => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const isLastStep = activeStep === tabs.length - 1;
  const validationSchemas = generateValidationSchemas(tabs);
  const initialValues = generateInitialValues(tabs);
  const storageKey = "form-stepper-data";

  useEffect(() => {
    if (useCache) {
      const cachedValues = getFromLocalStorage(storageKey);
      if (cachedValues) {
        Object.assign(initialValues, cachedValues);
      }
    }
  }, [useCache]);

  useEffect(() => {
    getStep(activeStep);
  }, [activeStep]);

  const handleResetForm = () => {
    setActiveStep(0);
    if (useCache) {
      removeFromLocalStorage(storageKey);
    }
  };

  const handleSaveToCache = (values: IFormInitialValues) => {
    if (useCache) {
      saveToLocalStorage(storageKey, values);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[activeStep]}
      onSubmit={(
        values: IFormInitialValues,
        actions: FormikHelpers<IFormInitialValues>
      ) => {
        if (!isLastStep) {
          setActiveStep((prev) => prev + 1);
          handleSaveToCache(values);
        } else {
          try {
            submitFunction(values);
            handleResetForm();
          } catch (error: any) {
            messageHandler(error.message);
          }
        }
        actions.setTouched({});
        actions.setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form>
          <Stepper activeStep={activeStep} alternativeLabel>
            {tabs?.map((tab: ITab, index: number) => (
              <Step key={index}>
                <StepLabel>{tab.name}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {tabs?.length > 0 && (
            <Box>
              <Box sx={{ mt: 2 }}>
                {tabs[activeStep]?.fields.map((field, index) => (
                  <Box key={`${field.name}-${index}`} sx={{ mt: 2 }}>
                    <DynamicField
                      props={field}
                      messageHandler={messageHandler}
                    />
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={() => {
                    setActiveStep((prev) => prev - 1);
                    handleSaveToCache(values);
                  }}
                >
                  Back
                </Button>
                <Button onClick={handleResetForm}>Reset</Button>
                <Button type="submit">
                  {isLastStep ? submitText : nextText}
                </Button>
              </Box>
            </Box>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default FormStepper;
