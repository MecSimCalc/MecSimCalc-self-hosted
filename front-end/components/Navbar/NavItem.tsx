import { Button, ButtonProps, styled, Theme } from "@mui/material";
import Link from "next/link";
import React from "react";

const NavItem = styled(({ href, children, ...rest }: ButtonProps) => (
  <Link href={href || "#"} passHref>
    <Button {...rest}>{children}</Button>
  </Link>
))(({ theme }: { theme?: Theme }) => ({
  color: "white",
}));
export default NavItem;
