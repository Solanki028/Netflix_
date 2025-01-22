//step-1
// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

databaseConnection();

dotenv.config({
    path:".env"
})

const app = express();
//middlewares 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    'http://localhost:3000', // Development frontend
    'https://netflix-netflix-7z84.onrender.com', // Production frontend
];

const corsOptions = {
<<<<<<< HEAD
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
=======
    origin:'https://netflix-netflix-7z84.onrender.com',
>>>>>>> 30bdf73306b321288f2b9becc56c52590e711f15
    credentials:true
}
app.use(cors(corsOptions));
 
// api
app.use("/api/v1/user", userRoute);

app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
});
