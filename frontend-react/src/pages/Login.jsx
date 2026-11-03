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
    setLoading(true);
    setUser(null);
    setMessage("");

    try {
        const res = await fetch(API_LOGIN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
    }
  }
}
