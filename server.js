const express = require("express");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const morgan = require("morgan");
const connectDB = require("./dbConnection");
const urlApi = require("./Routes/url");
const port = process.env.PORT || 5000;

// Connect database
connectDB()

// configure express usage
const app = express();

// Use Morgan for logging
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/shorten", urlApi);



app.listen(port, () => console.log(`server listening on port ${port}`));