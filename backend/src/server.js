require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const connectDB = require("./config/database");

const authRoutes = require("./routes/auth.routes");
app.use("(auth/login", authRoutes);
const alumnosRoutes = require("./routes/alumnos.routes");
app.use("/alumnos", alumnosRoutes);
const docentesRoutes = require("./routes/docentes.routes");
app.use("/docentes", docentesRoutes);
const materiasRoutes = require("./routes/materias.routes");
app.use("/materias", materiasRoutes);

// Middleware de prueba en Express

// app.use((req, res, next) => {
//   console.log(req.method);
//   console.log(req.url);
//   next()
// });
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
