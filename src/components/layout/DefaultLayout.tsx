"use client";

import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import Header from "./Header";

interface DefaultLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export default function DefaultLayout({
  children,
  showHeader = true,
}: DefaultLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "auto", // Altere para auto
        backgroundColor: "background.default",
      }}
    >
      {showHeader && <Header />}
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flex: 1,
          py: { xs: 3, sm: 4, md: 5 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
