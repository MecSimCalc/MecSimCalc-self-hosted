import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      sx={{ py: "50px" }}
    >
      {"Copyright © "}
      <Link href="https://www.mecsimcalc.com">
        <a
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          MecSimCalc
        </a>
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
