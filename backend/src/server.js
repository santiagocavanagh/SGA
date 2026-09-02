const express = require("express");
const cors = require("cors");
//require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

const alumnosRoutes = require("./routes/alumnos.routes");
app.use("/alumnos", alumnosRoutes);
const docentesRoutes = require("./routes/docentes.routes");
app.use("/docentes", docentesRoutes);
const materiasRoutes = require("./routes/materias.routes");
app.use("/materias", materiasRoutes);

//Middleware de prueba en Express
/*
app.use((req, res, next) => {
  console.log(req.method);
  console.log(req.url);
  next()
});*/

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
