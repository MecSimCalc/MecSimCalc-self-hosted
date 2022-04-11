import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { commonProps, DefaultProps } from "./constants";

interface Props {
  options: string[];
  label: string;
  value: string[];
  chip: boolean;
  onChange?: (e: any) => void;
}
export default function MultipleSelect({
  label,
  options = [],
  chip,
  onChange,
  ...rest
}: Props) {
  const [value, setValue] = useState<string[]>([]);
  const handleChange = (e: SelectChangeEvent<string[]>) => {
    setValue(e.target.value as string[]);
    !!onChange && onChange(e);
  };
  if (options.length == 0) return null;
  else {
    return (
      <FormControl fullWidth variant="standard" {...rest}>
        <InputLabel>{label}</InputLabel>
        <Select
          {...rest}
          multiple
          key="multiple-select"
          defaultValue={[]}
          label={label}
          onChange={handleChange}
          renderValue={(selected) =>
            chip ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            ) : (
              selected.join(", ")
            )
          }
        >
          {options.map((menuValue, i) => (
            <MenuItem key={menuValue} value={menuValue} disableGutters>
              <Checkbox checked={value.includes(menuValue)} />
              <ListItemText primary={menuValue} />
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
    required: true,
    disabled: false,
    chip: false,
  },
};
