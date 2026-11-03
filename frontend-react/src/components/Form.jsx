import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
const API_ALUMNOS = "http://localhost:3000/alumnos";

function Form({ onCreate, Edit, onCancel }) {
  const [form, setForm] = useState({
    legajo: String(Edit?.legajo ?? ""),
    nombre: Edit?.nombre ?? "",
    carrera: Edit?.carrera ?? "",
    email: Edit?.email ?? "",
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

    const alumno = {
      ...form,
      legajo: Number(form.legajo),
    };
    const edit = Boolean(Edit);
    const url = edit ? `${API_ALUMNOS}/${Edit.legajo}` : API_ALUMNOS;
    try {
      const res = await fetch(url, {
        method: edit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alumno),
      });

      if (!res.ok) {
        throw new Error(
          `No se pudo guardar el alumno. Estado HTTP: ${res.status}`,
        );
      }

      setForm({
        legajo: "",
        nombre: "",
        carrera: "",
        email: "",
      });
      onCreate();
      onCancel();
    } catch (error) {
      console.error("Error al guardar:", error);
      setError(error.message || "No se pudo conectar con el servidor");
    } finally {
      setSave(false);
    }
  }
  function Cancel() {
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
        {Edit ? "Editar alumno" : "Nuevo Alumno"}
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
          id="legajo"
          name="legajo"
          label="Legajo"
          value={form.legajo}
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
          id="carrera"
          name="carrera"
          label="Carrera"
          value={form.carrera}
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
            {save ? "Guardando..." : Edit ? "Guardar cambios" : "Guardar"}
          </Button>
          {Edit && (
            <Button
              type="button"
              onClick={Cancel}
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
export default Form;
