import { Alert } from "@mui/material";

export default function ComponentNotFound() {
  return (
    <Alert severity="error" sx={{ width: "100%" }}>
      Component Not Found
    </Alert>
  );
}
