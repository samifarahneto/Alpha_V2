"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementará a lógica de registro
    console.log("Dados do formulário:", formData);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Criar uma conta
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 3,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            required
            fullWidth
            id="nome"
            label="Nome completo"
            name="nome"
            autoComplete="name"
            value={formData.nome}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="new-password"
            value={formData.senha}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            name="confirmarSenha"
            label="Confirmar senha"
            type="password"
            id="confirmarSenha"
            value={formData.confirmarSenha}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrar
          </Button>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link
              href="/login"
              variant="body2"
              sx={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                router.push("/login");
              }}
            >
              Já tem uma conta? Faça login
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
