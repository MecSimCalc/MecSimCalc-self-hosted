import { Card, CardContent, CardHeader } from "@mui/material";
import { get, omit, sortBy } from "lodash";
import React, { useMemo } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { App, AppSection } from "../types";
import ViewAppInput from "./ViewAppInput";

interface Props {
  app: App;
}

// React Grid Layout defaults
export const GRID_LAYOUT_COLS = 10;
export const GRID_LAYOUT_ROW_HEIGHT = 50;
export const TABLE_COLS = 5;
export const DEVICE = {
  PC: "pc",
  MOBILE: "mobile",
};

export default function ViewAppInputs({ app }: Props) {
  const GridLayout = useMemo(() => WidthProvider(Responsive), []); // auto assigns width of grid container

  return (
    <>
      {get(app, "input_sections.order", []).map(
        (section: string, i: number) => {
          const { title, inputs_order, cols } = get(
            app,
            `input_sections.${section}`,
            {} as AppSection
          );
          const layout = sortBy(
            // (i) get() layout for this section from `input_layout`
            get(
              app,
              `input_layout.${section}`,
              inputs_order.map((i: string) => ({
                i,
                x: 0,
                y: 0,
                w: cols || GRID_LAYOUT_COLS,
                h: 1,
              })) // default if no layout
            ).map(
              (l: Layout) => omit(l, ["isDraggable", "isResizable"]) as Layout
            ), // (ii) remove certain attributes from layout
            ["y", "x"] // (iii) sort layout by row/col for tabIndex order
          );
          const mobileLayout = sortBy(
            // (i) get() layout for this section from `input_layout`
            get(
              app,
              `input_layout.${section}-${DEVICE.MOBILE}`,
              layout // use default layout if no mobile layout
            ).map(
              (l: Layout) => omit(l, ["isDraggable", "isResizable"]) as Layout
            ), // (ii) remove certain attributes from layout
            ["y", "x"] // (iii) sort layout by row/col for tabIndex order
          );

          return (
            <Card
              key={`section-${i}`}
              sx={{
                my: "15px",
                overflow: "auto",
              }}
              raised
              elevation={2}
            >
              <CardHeader title={title} sx={{ pb: 0 }} />
              <CardContent sx={{ pt: 1 }}>
                <GridLayout
                  className="layout"
                  layouts={{ lg: layout, xs: mobileLayout }}
                  breakpoints={{ lg: 400, xs: 0 }}
                  cols={{
                    lg: cols || GRID_LAYOUT_COLS,
                    xs: cols || GRID_LAYOUT_COLS,
                  }}
                  rowHeight={GRID_LAYOUT_ROW_HEIGHT}
                  compactType={null}
                  // view only
                  isResizable={false}
                  isDraggable={false}
                  isDroppable={false}
                >
                  {layout.map(({ i }) => (
                    <ViewAppInput
                      key={i}
                      input={get(app, `input_inputs.${i}`)}
                    />
                  ))}
                </GridLayout>
              </CardContent>
            </Card>
          );
        }
      )}
    </>
  );
}
