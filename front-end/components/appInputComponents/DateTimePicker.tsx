import {
  DatePickerProps,
  DateTimePickerProps,
  LocalizationProvider,
  MobileDatePicker,
  MobileDateTimePicker,
  MobileTimePicker,
  TimePickerProps,
} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField, TextFieldProps } from "@mui/material";
import { omit } from "lodash";
import React, { useState } from "react";
import { commonProps, DefaultProps } from "./constants";

interface Props {
  onChange?: (e: any) => void;
  type: "DateTime" | "Date" | "Time";
  variant?: "standard" | "filled" | "outlined";
}
export default function DateTimePicker({ type, onChange, ...rest }: Props) {
  const [value, setValue] = useState<Date>(new Date());

  const handleChange = (date: unknown) => {
    setValue(date as Date);
    !!onChange && onChange({ target: { value } });
  };

  const props: DatePickerProps & TimePickerProps & DateTimePickerProps = {
    ...omit(rest, ["error"]),
    renderInput: (params: TextFieldProps) => (
      <TextField
        variant={rest?.variant || "standard"}
        sx={{
          "& .MuiInput-input, .MuiOutlinedInput-input": { cursor: "pointer" },
        }}
        {...params}
      />
    ),
    value,
    onChange: handleChange,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {type === "Date" ? (
        <MobileDatePicker {...props} /> // Date
      ) : type == "Time" ? (
        <MobileTimePicker {...props} /> // Time
      ) : (
        <MobileDateTimePicker {...props} /> // DateTime
      )}
    </LocalizationProvider>
  );
}

export const defaultProps: DefaultProps = {
  required: {
    ...commonProps,
    type: ["DateTime", "Date", "Time"],
  },
  optional: {
    disabled: false,
  },
};
