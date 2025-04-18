import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Força a altura do layout para 100% da altura da tela
        position: "relative",
        width: "100%",
      }}
    >
      {/* Header fixo */}
      <Header />

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          marginTop: {
            xs: "56px",
            sm: "64px",
            md: "70px",
            lg: "80px",
            xl: "90px",
            xxl: "100px",
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start", // Alinha o conteúdo ao topo
          alignItems: "stretch", // Alinha os itens com o tamanho completo (stretch)
          padding: { xs: 2, sm: 3, md: 4, lg: 6.25 }, // 6.25 * 8px = 50px
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
