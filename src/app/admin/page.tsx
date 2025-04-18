"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { tableStyles } from "@/styles/tableStyles";

interface User {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  dataCriacao: string;
}

export default function AdminPage() {
  const router = useRouter();
  const theme = useTheme();
  const styles = tableStyles(theme);
  const [users, setUsers] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || user.perfil !== "admin") {
      router.push("/login");
      return;
    }
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Erro ao carregar usuários");
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (err) {
      setError("Erro ao carregar usuários");
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao excluir usuário");
      }
      setSuccess("Usuário excluído com sucesso");
      loadUsers();
    } catch (err) {
      setError("Erro ao excluir usuário");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedUser),
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário");
      }
      setSuccess("Usuário atualizado com sucesso");
      loadUsers();
      handleCloseDialog();
    } catch (err) {
      setError("Erro ao atualizar usuário");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Painel Administrativo
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Table sx={[styles.table, styles.responsiveTable]}>
            <TableHead sx={styles.tableHead}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Perfil</TableCell>
                <TableCell>Data de Criação</TableCell>
                <TableCell sx={styles.actionsCell}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={styles.tableBody}>
              {users.map((user) => (
                <TableRow key={user.id} sx={styles.tableRow}>
                  <TableCell sx={styles.tableCell}>{user.id}</TableCell>
                  <TableCell sx={styles.tableCell}>{user.nome}</TableCell>
                  <TableCell sx={styles.tableCell}>{user.email}</TableCell>
                  <TableCell sx={styles.tableCell}>{user.perfil}</TableCell>
                  <TableCell sx={styles.tableCell}>
                    {new Date(user.dataCriacao).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={[styles.tableCell, styles.actionsCell]}>
                    <Button onClick={() => handleEditUser(user)} sx={{ mr: 1 }}>
                      Editar
                    </Button>
                    <Button
                      color="error"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Editar Usuário</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Nome"
              value={selectedUser?.nome || ""}
              onChange={(e) =>
                setSelectedUser((prev) =>
                  prev ? { ...prev, nome: e.target.value } : null
                )
              }
            />
            <TextField
              label="Email"
              value={selectedUser?.email || ""}
              onChange={(e) =>
                setSelectedUser((prev) =>
                  prev ? { ...prev, email: e.target.value } : null
                )
              }
            />
            <FormControl fullWidth>
              <InputLabel>Perfil</InputLabel>
              <Select
                value={selectedUser?.perfil || ""}
                label="Perfil"
                onChange={(e) =>
                  setSelectedUser((prev) =>
                    prev ? { ...prev, perfil: e.target.value } : null
                  )
                }
              >
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="b2b">B2B</MenuItem>
                <MenuItem value="b2c">B2C</MenuItem>
                <MenuItem value="colaborador">Colaborador</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSaveUser} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
