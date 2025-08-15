import express from "express";
import dotenv from "dotenv";

import config from "./config/config";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.json({
    name: config.name,
    port: config.port || 5000,
    status: "Running...",
    version: config.version,
  });
});

app.listen(config.port, () =>{
    console.log(`Server is running on ${config.port}...`)
});
