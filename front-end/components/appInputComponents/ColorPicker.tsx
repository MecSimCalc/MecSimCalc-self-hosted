import { FormControlLabel, InputLabel } from "@mui/material";
import React from "react";
import { commonProps, DefaultProps } from "./constants";

interface Props {
  label: string;
  defaultValue: string;
}
export default function ColorPicker({ label = "", ...rest }: Props) {
  return (
    <FormControlLabel
      label={<InputLabel shrink>{label}</InputLabel>}
      labelPlacement="top"
      control={
        <input key={`color-${rest.defaultValue}`} type="color" {...rest} />
      }
      sx={{
        "& .MuiFormControlLabel-label": {
          width: "100%",
        },
        m: 0,
        width: "100%",
      }}
    />
  );
}

export const defaultProps: DefaultProps = {
  required: {
    ...commonProps,
    defaultValue: "#43BFF5",
  },
  optional: {
    disabled: false,
  },
};
