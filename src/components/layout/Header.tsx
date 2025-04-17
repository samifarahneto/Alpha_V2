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
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Início", path: "/" },
    { text: "Registrar-se", path: "/registrar" },
    { text: "Login", path: "/login" },
  ];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          key={item.text}
          disablePadding
          onClick={() => {
            router.push(item.path);
            setMobileOpen(false);
          }}
          sx={{ cursor: "pointer" }}
        >
          <ListItemText
            primary={item.text}
            sx={{
              px: 2,
              py: 1,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );

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
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: "50px", // Altura fixa de 50px
            px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 8 },
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              fontSize: {
                xs: "1.1rem",
                sm: "1.25rem",
                md: "1.5rem",
                lg: "1.75rem",
                xl: "2rem",
                xxl: "2.25rem",
              },
            }}
            onClick={() => router.push("/")}
          >
            Alpha App
          </Typography>

          {isMobile ? (
            <>
              <Button
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{
                  ml: 2,
                  minWidth: "auto",
                  px: 1,
                }}
              >
                Menu
              </Button>
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
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                gap: { md: 2, lg: 3 },
                alignItems: "center",
              }}
            >
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  onClick={() => router.push(item.path)}
                  sx={{
                    textTransform: "none",
                    fontSize: { md: "0.875rem", lg: "1rem" },
                    px: { md: 1.5, lg: 2 },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
