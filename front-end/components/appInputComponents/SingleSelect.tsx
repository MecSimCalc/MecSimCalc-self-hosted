import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { omit } from "lodash";
import React from "react";
import { commonProps, DefaultProps } from "./constants";

interface Props {
  options: string[];
  label: string;
  required?: boolean;
  defaultValue?: string;
  onChange?: () => void;
}
export default function SingleSelect({
  label,
  options = [],
  defaultValue: initialDefaultValue,
  ...rest
}: Props) {
  const defaultValue = initialDefaultValue || options[0];
  rest = omit(rest, ["error"]);

  if (options.length == 0) return null;
  else if (options.length <= 4) {
    // If less than or equal to 4 options, use radio buttons
    return (
      <FormControl {...rest}>
        <FormLabel sx={{ fontSize: "12px" }}>{label}</FormLabel>
        <RadioGroup
          key={`radiogroup-${defaultValue}`}
          row
          defaultValue={defaultValue}
        >
          {options.map((radioValue, i) => (
            <FormControlLabel
              key={`radio-${i}`}
              value={radioValue}
              label={radioValue}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  } else {
    // If more than 4 options, use dropdown
    return (
      <FormControl variant="standard" fullWidth {...rest}>
        <InputLabel>{label}</InputLabel>
        <Select
          key={`select-${defaultValue}`}
          defaultValue={defaultValue}
          label={label}
          onChange={rest.onChange}
        >
          {options.map((menuValue, i) => (
            <MenuItem key={`menu-${i}`} value={menuValue}>
              {menuValue}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export const defaultProps: DefaultProps = {
  required: {
    ...commonProps,
    options: ["Option 1", "Option 2"],
  },
  optional: {
    disabled: false,
  },
};
