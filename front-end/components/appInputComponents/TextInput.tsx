import { TextField } from "@mui/material";
import { get, pick } from "lodash";
import React from "react";
import { commonProps, DefaultProps, INPUT_PROPS } from "./constants";

interface Props {
  error: string;
}
export default function TextInput({ error, ...rest }: Props) {
  return (
    <TextField
      key={`text-${get(rest, "defaultValue")}`} // re-render on defaultValue change
      variant="standard"
      fullWidth
      error={!!error}
      helperText={error}
      InputProps={{
        inputProps: pick(rest, INPUT_PROPS),
      }}
      {...rest}
    />
  );
}

export const defaultProps: DefaultProps = {
  required: {
    ...commonProps,
  },
  optional: {
    defaultValue: "123abc",
    placeholder: "",
    required: true,
  },
  advanced: {
    disabled: false,
    minLength: 0,
    maxLength: 10000,
    pattern: ".*",
  },
};
