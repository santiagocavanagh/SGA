const mongoose = require("mongoose");

const materiaSchema = new mongoose.Schema(
  {
    codigo: { type: String, unique: true },
    nombre: { type: String, required: true },
    horario: { type: Number, required: true },
    aula: { type: Number, required: true },
  },
  { versionKey: false },
);

const Materia = mongoose.model("Materia", materiaSchema);
module.exports = Materia;
