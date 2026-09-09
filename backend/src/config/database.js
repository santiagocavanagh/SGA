const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/SGA");
    console.log("Base de Datos conectada con Exito");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
