import express, {Request, Response, NextFunction} from "express";
import { bmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.use((req, _res, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  console.log('---')
  next()
});

app.get("/hello", (_req, res) => {
  res.send("Hello, Full Stack! 🌟");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if ( !height || !weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).send({error: "Malformatted parameters"});
  }
  const report = bmi(height, weight);
  return res.send(report);
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = req.body;
    if (!body.daily_exercises || !body.target ) {
      return res.status(400).send({error: "parameters missing"});
    }
    const log: number[] = (body.daily_exercises as string[]).map(n => Number(n));
    if (isNaN(Number(body.target))) return res.status(400).send({error: "Malformatted parameters"})
    const targetHours: number = Number(body.target);
    const report = calculateExercises(log, targetHours);
    return res.send({ report });
  } catch (e) {
    return res.status(400).send({error: e.message})
  }
});

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && err.message.includes("JSON")) {
    return res.status(400).send({error: "Malformatted parameters"})
  }
  return next(err);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});