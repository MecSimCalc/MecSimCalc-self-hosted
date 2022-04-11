import { UploadFile } from "@mui/icons-material";
import { ListItem, ListItemText } from "@mui/material";
import { set } from "lodash";
import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  useSnackbar,
} from "notistack";
import React from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { commonProps, DefaultProps } from "./constants";

interface Props {
  label: string;
  accept: string;
  onChange?: (file: string | string[]) => void;
  disabled: boolean;
  required: boolean;
  multiple: boolean;
}

export default function FileInput({ label = "", onChange, ...rest }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const onDropRejected =
    (
      enqueueSnackbar: (
        message: SnackbarMessage,
        options?: OptionsObject | undefined
      ) => SnackbarKey
    ) =>
    (rejectedFiles: FileRejection[]) => {
      rejectedFiles.forEach((file) => {
        file.errors.forEach(({ message }) => {
          enqueueSnackbar(message, { variant: "error" });
        });
      });
    };
  const readAsDataURL = (file: File): FileReader => {
    const reader = new FileReader();

    reader.onabort = () =>
      console.error("readAsDataURL: file reading was aborted");
    reader.onerror = () =>
      console.error("readAsDataURL: file reading has failed");
    reader.readAsDataURL(file);
    return reader;
  };

  const onDropAccepted = async (acceptedFiles: File[]) => {
    const fileData = await Promise.all(
      // wait for all the promises to resolve
      acceptedFiles.map(
        (file) =>
          new Promise<string>(
            (resolve, reject) =>
              (readAsDataURL(file).onload = (e: any) => {
                resolve(e.target.result);
              })
          )
      )
    );
    // Return array of files, only if there are multiple files
    !!onChange && onChange(rest.multiple ? fileData : fileData[0]);
  };

  const handleDropRejected = (rejectedFiles: FileRejection[]) => {
    onDropRejected(enqueueSnackbar)(rejectedFiles);
    removeFile();
  };
  const onFileDialogCancel = () => {
    removeFile();
  };

  const { acceptedFiles, getRootProps, getInputProps, inputRef } = useDropzone({
    onDropAccepted,
    onDropRejected: handleDropRejected,
    onFileDialogCancel,
    ...rest,
  });

  const removeFile = () => {
    acceptedFiles.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
    !!inputRef.current && set(inputRef.current, "value", ""); // set HTML input to prevent submitting
    !!onChange && onChange("");
  };
  const filenames = acceptedFiles.map(({ name }) => name).join(", ");

  return (
    <ListItem
      {...getRootProps()}
      disabled={rest.disabled}
      sx={{ pl: 0, cursor: "pointer" }}
    >
      <input
        {...getInputProps()}
        required={rest.required}
        onInvalid={() =>
          enqueueSnackbar(`${label} is required`, { variant: "error" })
        }
      />
      <UploadFile color="action" sx={{ mr: 2 }} />
      <ListItemText
        primary={label + (rest.required ? " *" : "")}
        secondary={filenames || `Drag and drop ${rest.accept || ""} files`}
        secondaryTypographyProps={{ noWrap: true }}
      />
    </ListItem>
  );
}

export const defaultProps: DefaultProps = {
  required: {
    ...commonProps,
  },
  optional: {
    accept: "",
    required: true,
    multiple: false,
    disabled: false,
    maxSize: 100000000, // 100MB
  },
};
