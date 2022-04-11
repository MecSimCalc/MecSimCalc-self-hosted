import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import Navbar from "../components/Navbar/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <CssBaseline />
      <Navbar />
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}
