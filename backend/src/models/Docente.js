const mongoose = require("mongoose");

const docenteSchema = new mongoose.Schema(
  {
    dni: { type: Number, unique: true, required: true, trim: true },
    nombre: { type: String, required: ture },
    especialidad: { type: String, required: true },
    email: { type: String, unique: true, required: true, trim: true },
  },
  { versionKey: false },
);

const Docente = mongoose.model("Docente", docenteSchema);
module.exports = Docente;
