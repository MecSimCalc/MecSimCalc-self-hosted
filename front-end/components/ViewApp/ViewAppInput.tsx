import { Box, Skeleton } from "@mui/material";
import { useFormikContext } from "formik";
import { get } from "lodash";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import React, { forwardRef, ReactChild, useMemo } from "react";
import { AppInput } from "../types";
import { getTargetValue } from "./common";

interface Props {
  input: AppInput;
  children?: ReactChild | ReactChild[];
}

const ViewAppInput = forwardRef(
  ({ input: { component, props }, children, ...rest }: Props, ref) => {
    const { setFieldValue } = useFormikContext();
    const { enqueueSnackbar } = useSnackbar();

    const Component = useMemo(
      () =>
        dynamic<{ onChange: (e: any) => void }>(
          () =>
            import(`/components/appInputComponents/${component}`).catch((e) => {
              console.error(e);
              enqueueSnackbar(`Failed to import: ${component}`, {
                variant: "error",
              });
              import(
                "/components/appInputComponents/ComponentNotFound" as string
              );
            }),
          {
            loading: () => (
              <Skeleton
                variant="rectangular"
                width="100%"
                style={get(rest, "style", {})}
              />
            ),
          }
        ),
      [component]
    );
    const onChange = (e: any) => {
      const newValue = getTargetValue(e, "");
      setFieldValue(props.name, newValue);
    };

    return (
      <Box {...rest}>
        <Component {...props} onChange={onChange} />
        {children}
      </Box>
    );
  }
);

ViewAppInput.displayName = "ViewAppInput";
export default ViewAppInput;
