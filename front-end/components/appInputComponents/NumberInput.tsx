import { styled, TextField, TextFieldProps } from "@mui/material";
import katex from "katex";
import React from "react";
import { commonProps, DefaultProps, INPUT_PROPS } from "./constants";
import DOMPurify from "isomorphic-dompurify";
import { get, pick } from "lodash";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flex: 1,
}));
interface Props {
  units: string;
  variant?: TextFieldProps["variant"];
  error: string;
}
function Units({ ...rest }: Partial<Props>) {
  if (!rest.units) return null;
  return (
    <span
      style={{
        marginLeft: 2,
        alignSelf: rest.variant === "outlined" ? "center" : "flex-end",
      }}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(
          katex.renderToString(rest.units, {
            throwOnError: false,
          })
        ),
      }}
    />
  );
}
export const DEFAULT_STEP = 0.00001;
export default function NumberInput({ error, ...rest }: Props) {
  return (
    <Root>
      <TextField
        key={`number-${get(rest, "defaultValue")}`} // re-render on defaultValue change
        variant="standard"
        type="number"
        error={!!error}
        helperText={error}
        fullWidth
        InputProps={{
          inputProps: {
            step: DEFAULT_STEP, // mui defaults to step of 1
            ...pick(rest, INPUT_PROPS),
          },
          endAdornment: <Units {...rest} />,
        }}
        {...rest}
      />
    </Root>
  );
}

export const defaultProps: DefaultProps = {
  required: {
    ...commonProps,
  },
  optional: {
    units: "",
    defaultValue: 0,
    required: true,
  },
  advanced: {
    disabled: false,
    step: DEFAULT_STEP,
    min: -1000000,
    max: 1000000,
  },
};
