import { Code } from "@mui/icons-material";
import { Avatar, Button, styled, Typography } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "10%",
}));

export default function AppNotFound() {
  const router = useRouter();
  const { app } = router.query;

  return (
    <Root>
      <Avatar
        sx={{
          margin: (theme) => theme.spacing(3),
          backgroundColor: (theme) => theme.palette.error.main,
        }}
      >
        <Code />
      </Avatar>
      <Typography align="center" variant="h4" gutterBottom>
        App Not Found
      </Typography>
      <Typography align="center" variant="caption">
        App Id: {app}
      </Typography>

      <Link href="/" passHref>
        <Button color="primary">Back to Apps</Button>
      </Link>
    </Root>
  );
}
