import express from "express";
import { bmi } from "./bmiCalculator"

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello, Full Stack! 🌟")
});

app.get("/bmi", (req, res) => {
  try {
    const heightInput = req.query.height;
    const weightInput = req.query.weight;
    const report = bmi(heightInput, weightInput);
    res.send(JSON.stringify(report))
  } catch (error) {
    const message = {
      error: "malformatted parameters"
    }
    res.status(400).send(JSON.stringify(message));
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});