"use client";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

interface SidebarProps {
  userType: "admin" | "client";
}

export default function Sidebar({ userType }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const adminMenuItems = [
    { text: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { text: "Clientes", path: "/admin/clientes", icon: <PeopleIcon /> },
    { text: "Funcionários", path: "/admin/funcionarios", icon: <PeopleIcon /> },
    { text: "Projetos", path: "/admin/projetos", icon: <AssignmentIcon /> },
    { text: "Log de Atividades", path: "/admin/logs", icon: <HistoryIcon /> },
  ];

  const clientMenuItems = [
    {
      text: "Criar Projeto",
      path: "/clientes/criar-projeto",
      icon: <AddIcon />,
    },
    {
      text: "Meus Projetos",
      path: "/clientes/projetos",
      icon: <AssignmentIcon />,
    },
    { text: "Dashboard", path: "/clientes/dashboard", icon: <DashboardIcon /> },
    {
      text: "Colaboradores",
      path: "/clientes/colaboradores",
      icon: <PeopleIcon />,
    },
    { text: "Meu Perfil", path: "/clientes/perfil", icon: <PersonIcon /> },
  ];

  const menuItems = userType === "admin" ? adminMenuItems : clientMenuItems;

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "white",
            color: "black",
          },
        }}
      >
        <Box sx={{ width: 240, mt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                component="div"
                onClick={() => handleNavigation(item.path)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
