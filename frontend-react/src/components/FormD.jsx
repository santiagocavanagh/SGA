import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
const API_DOCENTES = "http://localhost:3000/docentes";

function FormD({ onCreateD, editD, onCancel }) {
  const [form, setForm] = useState({
    dni: Number(editD?.dni ?? ""),
    nombre: editD?.nombre ?? "",
    especialidad: editD?.especialidad ?? "",
    email: editD?.email ?? "",
  });
  const [error, setError] = useState("");
  const [save, setSave] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function Save(e) {
    e.preventDefault();
    setError("");
    setSave(true);

    const docente = {
      ...form,
      dni: Number(form.dni),
    };
    const edit = Boolean(editD);
    const url = edit ? `${API_DOCENTES}/${editD.dni}` : API_DOCENTES;
    try {
      const res = await fetch(url, {
        method: edit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(docente),
      });

      if (!res.ok) {
        throw new Error(
          `No se pudo guardar el docente. Estado HTTP: ${res.status}`,
        );
      }

      setForm({
        dni: "",
        nombre: "",
        especialidad: "",
        email: "",
      });
      onCreateD();
      onCancel();
    } catch (error) {
      console.error("Error al guardar:", error);
      setError(error.message || "No se pudo conectar con el servidor");
    } finally {
      setSave(false);
    }
  }
  function cancel() {
    onCancel();
  }
  return (
    <Paper
      component="section"
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        mb: 3,
        border: 1,
        borderColor: "divider",
        borderRadius: 4,
        bgcolor: "background.paper",
      }}
    >
      <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
        {editD ? "Editar docente" : "Nuevo Docente"}
      </Typography>
      <Box
        component="form"
        onSubmit={Save}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          gap: 2,
        }}
      >
        <TextField
          id="dni"
          name="dni"
          label="DNI"
          value={form.dni}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          id="nombre"
          name="nombre"
          label="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          id="especialidad"
          name="especialidad"
          label="Especialidad"
          value={form.especialidad}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          id="email"
          name="email"
          label="email"
          value={form.email}
          onChange={handleChange}
          required
          fullWidth
        />
        <Box
          sx={{
            gridColumn: "1 / -1",
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            gap: 1.5,
            mt: 1,
          }}
        >
          <Button type="submit" variant="contained" disabled={save}>
            {save ? "Guardando..." : editD ? "Guardar cambios" : "Guardar"}
          </Button>
          {editD && (
            <Button
              type="button"
              onClick={cancel}
              disabled={save}
              variant="outlined"
            >
              Cancelar
            </Button>
          )}
        </Box>
        {error && (
          <Alert severity="error" role="alert" sx={{ gridColumn: "1 / -1" }}>
            {error}
          </Alert>
        )}
      </Box>
    </Paper>
  );
}
export default FormD;
