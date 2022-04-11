import {
  FormControlLabel,
  InputLabel,
  Slider as MuiSlider,
} from "@mui/material";
import { mapValues } from "lodash";
import React from "react";
import { commonProps, DefaultProps } from "./constants";

interface Props {
  label: string;
  defaultValue: number | number[];
  onChange?: (e: any) => void;
}
export default function Slider({ label = "", ...rest }: Props) {
  const props = mapValues(rest, (value: any) => (value == "None" ? 1 : value));

  return (
    <FormControlLabel
      label={<InputLabel shrink>{label}</InputLabel>}
      labelPlacement="top"
      control={
        <MuiSlider
          key={`slider-${String(rest.defaultValue)}`}
          {...props}
          valueLabelDisplay="auto"
        />
      }
      sx={{
        "& .MuiFormControlLabel-label": {
          width: "100%",
        },
        width: "100%",
        m: 0,
      }}
    />
  );
}

export const defaultProps: DefaultProps = {
  required: {
    ...commonProps,
    defaultValue: 0,
    min: -10,
    max: 10,
    step: 1,
  },
  optional: {
    disabled: false,
    marks: false,
  },
};
