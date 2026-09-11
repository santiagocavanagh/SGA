const mongoose = require("mongoose");
require("dotenv").config();
const host = process.env.HOST;
const db = process.env.DB;

async function connectDB() {
  try {
    await mongoose.connect(`mongodb://${host}/${db}`);
    console.log("Base de Datos conectada con Exito");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
