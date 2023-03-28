import express from "express";
import diagnoseService from "../services/diagnoses";

const router = express.Router();

router.get("/", (_req, response) => {
  const data = diagnoseService.getEntries();
  response.send(data);
});

export default router;