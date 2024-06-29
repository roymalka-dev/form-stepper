import React, { useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import {
  Box,
  Typography,
  useTheme,
  Button,
  CircularProgress,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import InformationTooltip from "../tooltip/InformationTooltip";
import ImageExampleTooltip from "../tooltip/ImageExampleTooltip";
import { IField } from "../../types/form.types";

interface FormFileUploadFieldProps {
  props: IField;
  messageHandler: (message: string) => void;
}

const FormFileUploadField: React.FC<FormFileUploadFieldProps> = ({
  props,
  messageHandler,
}) => {
  const theme = useTheme();
  const { setFieldValue, values } = useFormikContext<any>();
  const [, meta] = useField(props.name);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const isError = Boolean(meta.touched && meta.error);

  const fileUploader =
    props.fileUploader ||
    (async (file: File) => {
      messageHandler(`File uploaded successfully: ${file.name}`);
      return file.name;
    });
  const fileDelete =
    props.fileDelete ||
    (async (fileUrl: string) => {
      messageHandler(`File removed successfully: ${fileUrl}`);
    });

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const fileUrl = await fileUploader(file);
      setFieldValue(props.name, fileUrl);
      setSelectedFileName(file.name);
    } catch (error) {
      messageHandler(`Error uploading file: ${error}`);
    } finally {
      setUploading(false);
    }
  };

  const handleFileRemove = async () => {
    setUploading(true);
    try {
      if (fileDelete) {
        const fileUrl = values[props.name];
        await fileDelete(fileUrl);
      }
      setFieldValue(props.name, null);
      setSelectedFileName(null);
    } catch (error) {
      messageHandler(`Error removing file: ${error}`);
    } finally {
      setUploading(false);
    }
  };

  const validateFile = (file: File) => {
    const { maxFileSize, supportedFormats } = props;

    if (maxFileSize && file.size > maxFileSize) {
      messageHandler(
        `File size should be less than ${maxFileSize / (1024 * 1024)} MB`
      );
      return false;
    }

    if (supportedFormats && !supportedFormats.includes(file.type)) {
      messageHandler(
        `Unsupported file format. Supported formats are: ${supportedFormats.join(
          ", "
        )}`
      );
      return false;
    }

    return true;
  };

  const handleFileChange = async (file: File | null) => {
    if (file && validateFile(file)) {
      await handleFileUpload(file);
    } else {
      setSelectedFileName(null); // Clear selected file name
      setFieldValue(props.name, null); // Reset Formik field value
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    handleFileChange(file);
  };

  useEffect(() => {
    const fileUrl = (values as Record<string, string>)[props.name];
    if (fileUrl) {
      const fileName = fileUrl.split("/").pop();
      setSelectedFileName(fileName || null);
    }
  }, [values, props.name]);

  return (
    <Box>
      {props.label && (
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <Typography variant="h6">{props.label}</Typography>
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Box
          sx={{
            border: `2px dashed ${theme.palette.primary.main}`,
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: isDragging
              ? theme.palette.secondary.light
              : isError
              ? theme.palette.error.light
              : theme.palette.action.hover,
            marginBottom: "5px",
            flex: 1,
            "&:hover": {
              backgroundColor: theme.palette.grey[200],
            },
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() =>
            document.getElementById(`fileInput-${props.name}`)?.click()
          }
        >
          {uploading ? (
            <CircularProgress />
          ) : selectedFileName ? (
            <>
              <Typography sx={{ mt: 2 }}>{selectedFileName}</Typography>
              <Button
                startIcon={<ClearIcon />}
                onClick={handleFileRemove}
                sx={{ mt: 1 }}
              >
                {props.fileRemoveText ? props.fileRemoveText : "Remove File"}
              </Button>
            </>
          ) : (
            <Typography>
              {props.fileUploadText
                ? props.fileUploadText
                : "Drag and drop a file here, or click to select a file"}
            </Typography>
          )}
          <input
            id={`fileInput-${props.name}`}
            name={props.name}
            type="file"
            onChange={(e) => handleChange(e)}
            style={{ display: "none" }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", ml: 2 }}>
          {props.info && <InformationTooltip information={props.info} />}
          {props.imageExample && (
            <ImageExampleTooltip imageUrl={props.imageExample} />
          )}
        </Box>
      </Box>
      {isError && (
        <Typography color="error" variant="body2">
          {meta.error}
        </Typography>
      )}
    </Box>
  );
};

export default FormFileUploadField;
