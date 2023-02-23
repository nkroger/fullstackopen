import express from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use((req, _res, next) => {
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("---");
  next();
})

app.get("/api/ping", (_req, res) => {
  console.log("Someone pinged");
  res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);

app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});