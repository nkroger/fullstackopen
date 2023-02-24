import express from "express";
import patientService from "../services/patients"
import toNewPatient from "../utils"

const router = express.Router();

router.get("/", (_req, response) => {
  response.send(patientService.getNonSensitive());
})

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Adding patient failed.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
})


export default router;