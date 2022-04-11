import { AppBar, Toolbar, Box } from "@mui/material";
import { NAV_ITEMS } from "./constants";
import { LogoButton } from "./LogoButton";
import NavItem from "./NavItem";

export default function Navbar() {
  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "#333333" }}>
      <Toolbar variant="dense">
        {/* <NavbarMenu /> */}
        <LogoButton />
        <Box sx={{ ml: 2, flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {NAV_ITEMS.map(({ href, label }, i) => (
            <NavItem key={`nav-item-${i}`} href={href}>
              {label}
            </NavItem>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
