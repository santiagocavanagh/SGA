import { Link as RouterLink, NavLink } from "react-router-dom";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Selector from "./Selector";

export default function Header() {
  const navSx = {
    px: { xs: 1.25, sm: 1.75 },
    py: 0.75,
    borderRadius: 25,
    fontWeight: 500,
    transition: "background-color 0.2s, color 0.2s",
    "&:hover": { bgcolor: "action.hover" },
    "&.active": {
      bgcolor: "action.selected",
      color: "primary.main",
      fontWeight: 700,
    },
  };
  return (
    <AppBar
      component="header"
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 76, sm: 88 },
            py: { xs: 1, sm: 1.5 },
            gap: { xs: 1.5, sm: 3 },
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            aria-label="SGA, ir al inicio"
            underline="none"
            sx={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}
          >
            <Stack direction="row" spacing={2.25} sx={{ alignItems: "center" }}>
              <Box
                component="img"
                src="/SGA.png"
                alt="Logo de SGA"
                sx={(theme) => ({
                  display: "block",
                  width: { xs: 42, sm: 50 },
                  height: { xs: 42, sm: 50 },
                  objectFit: "contain",
                  ...theme.applyStyles("dark", { filter: "invert(0.7)" }),
                  ...theme.applyStyles("light", {
                    filter: ["invert(0.3)", "opacity(0.8)"],
                  }),
                })}
              />
              <Box>
                <Typography
                  variant="h4"
                  color="text.primary"
                  sx={{ fontWeight: 800, lineHeight: 0.9 }}
                >
                  SGA
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Gestión Académica
                </Typography>
              </Box>
            </Stack>
          </Link>

          <Stack
            component="nav"
            aria-label="Navegación principal"
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "flex-end",
              gap: { xs: 0.5, sm: 1.5 },
              flexWrap: "wrap",
              flex: { xs: "1 1 100%", sm: "0 1 auto" },
              order: { xs: 2, sm: 0 },
            }}
          >
            <Link
              component={NavLink}
              to="/"
              end
              color="text.primary"
              underline="none"
              sx={navSx}
            >
              Inicio
            </Link>
            <Link
              component={NavLink}
              to="/alumnos"
              color="text.primary"
              underline="none"
              sx={navSx}
            >
              Alumnos
            </Link>
            <Link
              component={NavLink}
              to="/docentes"
              color="text.primary"
              underline="none"
              sx={navSx}
            >
              Docentes
            </Link>
            <Link
              component={NavLink}
              to="/materias"
              color="text.primary"
              underline="none"
              sx={navSx}
            >
              Materias
            </Link>
            <IconButton
              component={RouterLink}
              to="/ayuda"
              aria-label="Ayuda"
              color="primary"
              sx={{ mx: 0.25 }}
            >
              <HelpOutlineRoundedIcon />
            </IconButton>
            <Selector />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
