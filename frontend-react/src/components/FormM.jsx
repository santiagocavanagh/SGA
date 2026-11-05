import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
const API_MATERIAS = "http://localhost:3000/materias";

function FormM({ onCreateM, editM, onCancel }) {
  const [form, setForm] = useState({
    codigo: String(editM?.codigo ?? ""),
    nombre: editM?.nombre ?? "",
    horario: editM?.horario ?? "",
    aula: editM?.aula ?? "",
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

    const materia = {
      ...form,
      codigo: String(form.codigo),
    };
    const edit = Boolean(editM);
    const url = edit ? `${API_MATERIAS}/${editM.codigo}` : API_MATERIAS;
    try {
      const res = await fetch(url, {
        method: edit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(materia),
      });

      if (!res.ok) {
        throw new Error(
          `No se pudo guardar la Materia. Estado HTTP: ${res.status}`,
        );
      }

      setForm({
        codigo: "",
        nombre: "",
        horario: "",
        aula: "",
      });
      onCreateM();
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
        {editM ? "Editar Materia" : "Nueva Materia"}
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
          id="codigo"
          name="codigo"
          label="codigo"
          value={form.codigo}
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
          id="horario"
          name="horario"
          label="horario"
          value={form.horario}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          id="aula"
          name="aula"
          label="aula"
          value={form.aula}
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
            {save ? "Guardando..." : editM ? "Guardar cambios" : "Guardar"}
          </Button>
          {editM && (
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
export default FormM;
