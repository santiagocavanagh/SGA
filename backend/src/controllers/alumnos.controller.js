const alumnos = require("../data/alumnos.data");

function obtenerAlumnos(req, res) {
  res.json(alumnos);
}

module.exports = { obtenerAlumnos };
