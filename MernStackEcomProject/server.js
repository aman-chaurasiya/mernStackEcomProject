import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectdb from "./config/db.js";
// const express = require("express");
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";

//config dotenv
dotenv.config();
//database config
connectdb();
//rest object
const app = express();

//middleWere
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/v1/auth/", authRoutes);

//category Routes
app.use("/api/v1/category", categoryRoute);

//product Routes
app.use("/api/v1/product", productRoute);

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} mode on port   ${PORT}`.bgRed
      .green
  );
});
