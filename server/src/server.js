import express from "express";
import dotenv from "dotenv";

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

app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`)
});
