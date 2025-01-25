//step-1
//
// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

databaseConnection();

dotenv.config({
  path: ".env",
});

const app = express();
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  process.env.FRONTEND_ORIGIN, // Development frontend
  process.env.FRONTEND_ORIGIN_DEV, // Production frontend
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      console.log(
        "inside the allowred origin",
        process.env.FRONTEND_ORIGIN,
        process.env.FRONTEND_ORIGIN_DEV
      );
      callback(null, true);
    } else {
        console.log(
            "outside the allowded core origin",
            process.env.FRONTEND_ORIGIN,
            process.env.FRONTEND_ORIGIN_DEV
          );
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// api
app.use("/api/v1/user", userRoute);

app.listen(process.env.PORT, () => {
//  console.log(Server listen at port ${process.env.PORT});
});