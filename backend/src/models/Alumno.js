const mongoose = require("mongoose");

const alumnoSchema = new mongoose.Schema(
  {
    legajo: { type: Number, unique: true, required: true, trim: true },
    nombre: { type: String, required: true },
    carrera: { type: String, required: true },
    email: { type: String, unique: true, required: true, trim: true },
  },
  { versionKey: false },
);

const Alumno = mongoose.model("Alumno", alumnoSchema);
module.exports = Alumno;
