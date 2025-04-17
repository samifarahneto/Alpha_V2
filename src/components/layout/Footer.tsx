import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 0,
        px: 2,
        backgroundColor: "white",
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        height: "50px", // Altura fixada para 50px
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xl" sx={{ py: 0 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          Alpha-Translations © 2025
        </Typography>
      </Container>
    </Box>
  );
}
