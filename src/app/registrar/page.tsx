"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import userService from "@/services/userService";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    perfil: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const existingUser = await userService.getUserByEmail(formData.email);
      if (existingUser) {
        setError("Este email já está cadastrado");
        return;
      }

      const { confirmarSenha, ...userData } = formData;
      await userService.register(userData);
      setSuccess("Usuário cadastrado com sucesso!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError("Erro ao cadastrar usuário");
    }
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
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 2, width: "100%" }}>
            {success}
          </Alert>
        )}
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
            onChange={handleInputChange}
          />
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
          <TextField
            required
            fullWidth
            name="confirmarSenha"
            label="Confirmar senha"
            type="password"
            id="confirmarSenha"
            value={formData.confirmarSenha}
            onChange={handleInputChange}
          />
          <FormControl fullWidth>
            <InputLabel id="perfil-label">Perfil</InputLabel>
            <Select
              labelId="perfil-label"
              id="perfil"
              name="perfil"
              value={formData.perfil}
              label="Perfil"
              onChange={handleSelectChange}
            >
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="b2b">B2B</MenuItem>
              <MenuItem value="b2c">B2C</MenuItem>
              <MenuItem value="colaborador">Colaborador</MenuItem>
            </Select>
          </FormControl>
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
