import { Close, Menu } from "@mui/icons-material";
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { NAV_ITEMS } from "./constants";
import { LogoButton } from "./LogoButton";

export default function NavbarMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: (theme) => theme.palette.grey[200],
          },
        }}
      >
        <AppBar
          position="relative"
          elevation={0}
          sx={{ backgroundColor: "#191919" }}
        >
          <Toolbar variant="dense">
            <LogoButton />
          </Toolbar>
        </AppBar>
        <List>
          {NAV_ITEMS.map(({ href, label, icon }, i) => (
            <ListItem key={`drawer-item-${i}`}>
              <Link href={href || "#"} passHref>
                <ListItemButton selected={href === router.asPath}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText sx={{ pr: 3 }}>{label}</ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <IconButton
        size="small"
        color="inherit"
        onClick={() => setOpen(!open)}
        sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}
      >
        {open ? <Close /> : <Menu />}
      </IconButton>
    </>
  );
}
