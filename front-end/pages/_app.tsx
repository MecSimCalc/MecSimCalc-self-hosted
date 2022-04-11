import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import Copyright from "../components/Copyright";
import Navbar from "../components/Navbar/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <Head>
        <title key="title">MecSimCalc</title>
        <link key="favicon" rel="shortcut icon" href="/favicon.ico" />
        <meta key="ogTitle" property="og:title" content="MecSimCalc" />
        <meta key="ogImage" property="og:image" content="/logo2.png" />
        <meta
          key="ogDescription"
          property="og:description"
          content="The simplest way to build and share computational tools on the web. Create and share your Python apps in minutes using our intuitive and simple platform."
        />
        <meta key="ogUrl" property="og:url" content="mecsimcalc.com" />
        <meta key="ogType" property="og:type" content="calculators" />
      </Head>
      <CssBaseline />
      <Navbar />
      <Component {...pageProps} />
      <Copyright />
    </SnackbarProvider>
  );
}
