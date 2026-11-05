import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";

const API_LOGIN = "http://localhost:3000/auth/login";

export default function Login() {
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    setUser(null);

    try {
      const res = await fetch(API_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login Fallido");
        setLoading(false);
        return;
      }

      setMessage(data.message || "login Exitoso");
      setUser(data.user);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error de Login", error);
      setError(error.message || "No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: `0 12px 32px ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 3,
            textAlign: "center",
            color: theme.palette.text.primary,
            fontWeight: 700,
          }}
        >
          Iniciar sesión
        </Typography>
        <TextField
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
          fullWidth
          margin="normal"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
        <TextField
          type="password"
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          fullWidth
          margin="normal"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}
        {message && (
          <Alert severity="success" sx={{ mt: 2, borderRadius: 2 }}>
            {message}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 700,
          }}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
        {user && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">
              Bienvenido/a, {user.nombre}
            </Typography>
            <Typography variant="body2">Correo: {user.email}</Typography>
            <Typography variant="body2">Rol: {user.rol}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
