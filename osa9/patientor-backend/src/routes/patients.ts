import express from "express";
import patientService from "../services/patients";
import toNewPatient, { toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, response) => {
  response.send(patientService.getNonSensitive());
});

router.get("/:id", (req, response) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    response.send(patient);
  } else {
    response.sendStatus(404);
  }
});

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
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const pat = patientService.addPatientEntry(req.params.id, newEntry);
    res.json(pat);
  } catch (error: unknown) {
    let errorMessage = "Adding entry failed.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
})


export default router;
