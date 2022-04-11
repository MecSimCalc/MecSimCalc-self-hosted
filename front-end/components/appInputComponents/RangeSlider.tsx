import React from "react";
import { commonProps, DefaultProps } from "./constants";

import Slider from "./Slider";

interface Props {
  label: string;
  defaultMinValue: number;
  defaultMaxValue: number;
}
export default function RangeSlider({
  defaultMinValue,
  defaultMaxValue,
  ...rest
}: Props) {
  const defaultValue = [
    isNaN(defaultMinValue) ? 0 : defaultMinValue,
    isNaN(defaultMaxValue) ? 0 : defaultMaxValue,
  ];
  return <Slider {...rest} defaultValue={defaultValue} />;
}

export const defaultProps: DefaultProps = {
  required: {
    ...commonProps,
    defaultMinValue: -5,
    defaultMaxValue: 5,
    min: -10,
    max: 10,
    step: 1,
  },
  optional: {
    disabled: false,
    marks: false,
  },
};
