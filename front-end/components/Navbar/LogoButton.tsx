import { Box } from "@mui/material";
import React from "react";
import NavItem from "./NavItem";

export function LogoButton() {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexGrow: { xs: 1, md: 0 },
        justifyContent: "center",
      }}
    >
      <NavItem href="/">
        <img
          src="/logo.png"
          alt="MecSimCalc"
          width={92}
          height={28}
          style={{
            background: "transparent",
            verticalAlign: "middle",
          }}
        />
      </NavItem>
    </Box>
  );
}
