import dotenv from "dotenv";
import process from "process";
dotenv.config();

import connectToDB from "./connectToDB.js";
import express from "express";
import helmet from "helmet";
import routesApi from "./routesApi.js";
import errorHandler from "./errorHandler.js";
import sendResponse from "./sendResponse.js";

connectToDB();

const app = express();

app.use(helmet());

app.use(express.json());

console.log("routesApi loaded");
app.use("/api/jobs", routesApi);

app.use((req, res) => {
    sendResponse({
        res,
        statusCode: 404,
        message: "route not found"
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
console.log(`server running on port ${PORT}`)
});