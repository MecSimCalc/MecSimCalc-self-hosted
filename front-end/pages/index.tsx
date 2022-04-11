import { Container, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import AppCard from "../components/AppCard/AppCard";
import { App } from "../components/AppCard/types";
import api from "./api/axios";

const AppGallery = styled(Container)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: "20px",
}));

export default function Home() {
  const [apps, setApps] = useState<App[]>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const { data } = await api.get(`/apps`);
        setApps(data);
      } catch (e: any) {
        enqueueSnackbar("Failed to fetch apps", { variant: "error" });
      }
    };
    if (!apps) fetchApps();
  }, []);

  return (
    <AppGallery maxWidth="xl">
      {(apps || new Array(12).fill(null)).map((app, i) => (
        <AppCard key={i} app={app} />
      ))}
    </AppGallery>
  );
}
