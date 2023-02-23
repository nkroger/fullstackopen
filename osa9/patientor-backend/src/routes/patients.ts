import express from "express";
import patientService from "../services/patients"

const router = express.Router();

router.get("/", (_req, response) => {
  response.send(patientService.getNonSensitive());
})


export default router;