import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const API_ALUMNOS = "http://localhost:3000/alumnos";

export default function List({ update, onCreate, onEdit }) {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function borrar(legajo) {
    const confirmar = window.confirm("Seguro quiere eliminar este alumno?");
    if (!confirmar) {
      return;
    }
    try {
      const res = await fetch(`${API_ALUMNOS}/${legajo}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`No se puede eliminar! HTTP ERROR: ${res.status}`);
      }
      onCreate();
    } catch (error) {
      console.error("Error al eliminar: ", error);
      alert(error.message || "No se puede eliminar Alumno");
    }
  }

  useEffect(() => {
    async function loadList() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(API_ALUMNOS);

        if (!res.ok) {
          throw new Error("no se pudo obtener la lista", res.status);
        }

        const data = await res.json();
        setAlumnos(data);
      } catch (error) {
        console.error("Error de conexión", error);
        setError("No se puede cargar datos");
      } finally {
        setLoading(false);
      }
    }
    loadList();
  }, [update]);

  if (loading) {
    return (
      <Paper
        component="section"
        elevation={0}
        sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 4 }}
      >
        <Typography color="text.secondary">Cargando alumnos...</Typography>
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
        Alumnos
      </Typography>
      {alumnos.length === 0 ? (
        <Typography color="text.secondary">
          No hay alumnos registrados.
        </Typography>
      ) : (
        <Stack
          component="ul"
          spacing={1.5}
          sx={{ listStyle: "none", p: 0, m: 0 }}
        >
          {alumnos.map((alumno) => (
            <Paper
              component="li"
              key={alumno.legajo}
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
                transition: "border-color 0.2s, box-shadow 0.2s",
                "&:hover": { borderColor: "primary.main", boxShadow: 2 },
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center", flexWrap: "wrap" }}
              >
                <Chip
                  label={`Legajo ${alumno.legajo}`}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
                <Box sx={{ minWidth: 0, overflowWrap: "anywhere" }}>
                  <Typography fontWeight={600}>{alumno.nombre}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {alumno.carrera}
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
                  onClick={() => onEdit(alumno)}
                  variant="outlined"
                  size="small"
                >
                  Editar
                </Button>
                <Button
                  type="button"
                  onClick={() => borrar(alumno.legajo)}
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
