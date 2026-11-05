import { useColorScheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

function Selector() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }
  const dark = mode === "dark";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 0.5,
        flexShrink: 0,
      }}
    >
      <IconButton
        aria-label="Activar modo claro"
        aria-pressed={!dark}
        onClick={() => setMode("light")}
        sx={{
          color: dark ? "action.disabled" : "secondary.main",
          opacity: dark ? 0.5 : 1,
        }}
      >
        <LightModeRoundedIcon />
      </IconButton>
      <IconButton
        aria-label="Activar modo oscuro"
        aria-pressed={dark}
        onClick={() => setMode("dark")}
        sx={{
          color: dark ? "primary.main" : "action.disabled",
          opacity: dark ? 1 : 0.5,
        }}
      >
        <DarkModeRoundedIcon />
      </IconButton>
    </Box>
  );
}
export default Selector;
