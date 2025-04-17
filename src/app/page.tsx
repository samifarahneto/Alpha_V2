import DefaultLayout from "@/components/layout/DefaultLayout";
import { Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <DefaultLayout>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bem-vindo ao Alpha App
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Este é um template padrão para suas páginas.
        </Typography>
      </Box>
    </DefaultLayout>
  );
}
