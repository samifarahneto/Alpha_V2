"use client";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import Image from "next/image";

interface User {
  id: string;
  nome: string;
  email: string;
  perfil: "admin" | "b2b" | "b2c" | "colaborador";
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Adiciona listener para mudanças no localStorage
    const handleStorageChange = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMobileOpen(false);
    router.push("/login");
    // Força uma atualização do componente
    window.dispatchEvent(new Event("storage"));
  };

  const isAdminRoute = pathname.startsWith("/admin");
  const isClientRoute = pathname.startsWith("/clientes");

  const adminMenuItems = [
    { text: "Dashboard", path: "/admin" },
    { text: "Clientes", path: "/admin/clientes" },
    { text: "Funcionários", path: "/admin/funcionarios" },
    { text: "Projetos", path: "/admin/projetos" },
    { text: "Log de Atividades", path: "/admin/logs" },
  ];

  const clientMenuItems = [
    { text: "Criar Projeto", path: "/clientes/criar-projeto" },
    { text: "Meus Projetos", path: "/clientes/projetos" },
    { text: "Dashboard", path: "/clientes/dashboard" },
    { text: "Colaboradores", path: "/clientes/colaboradores" },
    { text: "Meu Perfil", path: "/clientes/perfil" },
  ];

  const publicMenuItems = [
    { text: "Início", path: "/" },
    { text: "Registrar-se", path: "/registrar" },
    { text: "Login", path: "/login" },
  ];

  const menuItems = user
    ? user.perfil === "admin"
      ? adminMenuItems
      : ["b2b", "b2c", "colaborador"].includes(user.perfil)
      ? clientMenuItems
      : publicMenuItems
    : publicMenuItems;

  const renderMobileMenu = () => {
    if (isMobile && !isAdminRoute && !isClientRoute) {
      return (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 240,
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            <List>
              {!isAdminRoute && !isClientRoute && (
                <ListItem
                  component="div"
                  onClick={() => {
                    router.push("/");
                    setMobileOpen(false);
                  }}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <ListItemText primary="Início" />
                </ListItem>
              )}
              {!user && !isAdminRoute && !isClientRoute && (
                <>
                  <ListItem
                    component="div"
                    onClick={() => {
                      router.push("/registrar");
                      setMobileOpen(false);
                    }}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    <ListItemText primary="Registrar-se" />
                  </ListItem>
                  <ListItem
                    component="div"
                    onClick={() => {
                      router.push("/login");
                      setMobileOpen(false);
                    }}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    <ListItemText primary="Login" />
                  </ListItem>
                </>
              )}
              {user && (
                <ListItem
                  component="div"
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <ListItemText primary="Sair" />
                </ListItem>
              )}
            </List>
          </Drawer>
        </>
      );
    }
    return null;
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        zIndex: 1200,
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          px: { xs: 2, sm: 3, md: 4, lg: 18.75 },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: "56px", md: "64px" },
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            {(isAdminRoute || isClientRoute) && (
              <Sidebar userType={isAdminRoute ? "admin" : "client"} />
            )}
          </Box>

          <Box
            onClick={() => router.push("/")}
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={isMobile ? 150 : 200}
              height={isMobile ? 40 : 50}
              style={{ objectFit: "contain" }}
            />
          </Box>

          <Box
            sx={{
              position: "absolute",
              right: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 1, sm: 2, md: 3 },
                  alignItems: "center",
                }}
              >
                {!isAdminRoute && !isClientRoute && (
                  <Button
                    color="inherit"
                    onClick={() => router.push("/")}
                    sx={{
                      textTransform: "none",
                      fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      px: { xs: 1, sm: 1.5, md: 2 },
                    }}
                  >
                    Início
                  </Button>
                )}
                {!user && !isAdminRoute && !isClientRoute ? (
                  <>
                    <Button
                      color="inherit"
                      onClick={() => router.push("/registrar")}
                      sx={{
                        textTransform: "none",
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                        px: { xs: 1, sm: 1.5, md: 2 },
                      }}
                    >
                      Registrar-se
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => router.push("/login")}
                      sx={{
                        textTransform: "none",
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                        px: { xs: 1, sm: 1.5, md: 2 },
                      }}
                    >
                      Login
                    </Button>
                  </>
                ) : user ? (
                  <Button
                    color="inherit"
                    onClick={handleLogout}
                    sx={{
                      textTransform: "none",
                      fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      px: { xs: 1, sm: 1.5, md: 2 },
                    }}
                  >
                    Sair
                  </Button>
                ) : null}
              </Box>
            )}

            {renderMobileMenu()}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
