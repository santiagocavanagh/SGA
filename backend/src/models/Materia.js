const mongoose = require("mongoose");

const materiaSchema = new mongoose.Schema(
  {
    codigo: { type: Number, unique: true },
    nombre: String,
    descripcion: String,
    docente: { type: mongoose.Schema.Types.ObjectId, ref: "Docente" },
    alumnos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Alumno" }],
    fechaInicio: Date,
    fechaFin: Date,
    horario: String,
    aula: String,
    cupo: Number,
  },
  { versionKey: false },
);

const Materia = mongoose.model("Materia", materiaSchema);

module.exports = Materia;
