import { useColorScheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MUI from "./MUI";

function Selector() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }
  const dark = mode === "dark";

  function Mode(event) {
    setMode(event.target.checked ? "dark" : "light");
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <MUI
        checked={dark}
        onChange={Mode}
        slotProps={{
          input: {
            "aria-label": "Cambiar entre modo claro y oscuro",
          },
        }}
      />
    </Box>
  );
}
export default Selector;
