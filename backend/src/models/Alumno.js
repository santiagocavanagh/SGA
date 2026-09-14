const mongoose = require("mongoose");

const alumnoSchema = new mongoose.Schema(
  {
    legajo: { type: Number, unique: true },
    nombre: String,
    carrera: String,
    email: String,
  },
  { versionKey: false },
);

const Alumno = mongoose.model("Alumno", alumnoSchema);

module.exports = Alumno;
