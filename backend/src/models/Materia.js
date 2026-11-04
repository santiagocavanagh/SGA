const mongoose = require("mongoose");

const materiaSchema = new mongoose.Schema(
  {
    codigo: { type: String, unique: true },
    nombre: { type: String, required: true },
    horario: { type: String, required: true },
    aula: String,
    descripcion: String,
  },
  { versionKey: false },
);

const Materia = mongoose.model("Materia", materiaSchema);
module.exports = Materia;
