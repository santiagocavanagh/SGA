import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const API_MATERIAS = "http://localhost:3000/materias";

export default function ListD({ update, onCreateM, onEditM }) {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function borrar(codigo) {
    const confirmar = window.confirm(
      "¿Seguro que querés eliminar esta materia?",
    );
    if (!confirmar) {
      return;
    }
    try {
      const res = await fetch(`${API_MATERIAS}/${codigo}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`No se pudo eliminar. Estado HTTP: ${res.status}`);
      }
      onCreateM();
    } catch (error) {
      console.error("Error al eliminar: ", error);
      alert(error.message || "No se pudo eliminar materia");
    }
  }

  useEffect(() => {
    async function loadListM() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(API_MATERIAS);

        if (!res.ok) {
          throw new Error("No se pudo obtener la lista", res.status);
        }

        const data = await res.json();
        setMaterias(data);
      } catch (error) {
        console.error("Error de conexión", error);
        setError("No se pudo cargar la lista de materias.");
      } finally {
        setLoading(false);
      }
    }
    loadListM();
  }, [update]);

  if (loading) {
    return (
      <Paper
        component="section"
        elevation={0}
        sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 4 }}
      >
        <Typography color="text.secondary">Cargando Materias...</Typography>
      </Paper>
    );
  }
  if (error) {
    return (
      <Alert severity="error" role="alert">
        {error}
      </Alert>
    );
  }

  return (
    <Paper
      component="section"
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        border: 1,
        borderColor: "divider",
        borderRadius: 4,
        bgcolor: "background.paper",
      }}
    >
      <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
        Materias
      </Typography>
      {materias.length === 0 ? (
        <Typography color="text.secondary">
          No hay materias registrados.
        </Typography>
      ) : (
        <Stack
          component="ul"
          spacing={1.5}
          sx={{ listStyle: "none", p: 0, m: 0 }}
        >
          {materias.map((materia) => (
            <Paper
              component="li"
              key={materia.codigo}
              elevation={0}
              sx={{
                p: { xs: 2, sm: 2.5 },
                border: 1,
                borderColor: "divider",
                borderRadius: 3,
                display: "flex",
                alignItems: { xs: "stretch", sm: "center" },
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center", flexWrap: "wrap" }}
              >
                <Chip
                  label={`Código ${materia.codigo}`}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
                <Box>
                  <Typography fontWeight={600}>{materia.nombre}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {materia.horario}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: "flex-end" }}
              >
                <Button
                  type="button"
                  onClick={() => onEditM(materia)}
                  variant="outlined"
                  size="small"
                >
                  Editar
                </Button>
                <Button
                  type="button"
                  onClick={() => borrar(materia.codigo)}
                  variant="outlined"
                  color="error"
                  size="small"
                >
                  Eliminar
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Paper>
  );
}
