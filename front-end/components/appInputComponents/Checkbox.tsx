import { Checkbox as MuiCheckbox, FormControlLabel } from "@mui/material";
import React from "react";
import { commonProps, DefaultProps } from "./constants";

interface Props {
  label: string;
  defaultChecked?: boolean;
  value?: boolean;
}
export default function Checkbox({
  label = "",
  defaultChecked,
  value,
  ...rest
}: Props) {
  const checked = value || defaultChecked;
  return (
    <FormControlLabel
      key={`checkbox-${checked}`} // re-renders new when key changes
      control={
        <MuiCheckbox color="secondary" defaultChecked={checked} {...rest} />
      }
      label={label}
      sx={{ width: "100%", m: 0 }}
    />
  );
}

export const defaultProps: DefaultProps = {
  required: {
    ...commonProps,
  },
  optional: {
    disabled: false,
    defaultChecked: false,
  },
};
