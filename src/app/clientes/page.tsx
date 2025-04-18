"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function ClientesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!storedUser || storedUser.perfil === "admin") {
      router.push("/login");
      return;
    }
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1">
            Área do Cliente
          </Typography>
          <Button variant="outlined" onClick={handleLogout}>
            Sair
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Informações do Usuário
              </Typography>
              <Typography>
                <strong>Nome:</strong> {user?.nome}
              </Typography>
              <Typography>
                <strong>Email:</strong> {user?.email}
              </Typography>
              <Typography>
                <strong>Perfil:</strong> {user?.perfil}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ações Disponíveis
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {user?.perfil === "b2b" && (
                  <Button variant="contained" fullWidth>
                    Gerenciar Pedidos
                  </Button>
                )}
                {user?.perfil === "b2c" && (
                  <Button variant="contained" fullWidth>
                    Fazer Pedido
                  </Button>
                )}
                {user?.perfil === "colaborador" && (
                  <Button variant="contained" fullWidth>
                    Ver Traduções
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ gridColumn: "1 / -1" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Histórico de Atividades
              </Typography>
              <Typography color="text.secondary">
                Nenhuma atividade recente.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
