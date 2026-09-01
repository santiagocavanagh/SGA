const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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
