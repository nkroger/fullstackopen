"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_1 = __importDefault(require("../services/patients"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get("/", (_req, response) => {
    response.send(patients_1.default.getNonSensitive());
});
router.get("/:id", (req, response) => {
    const patient = patients_1.default.findById(req.params.id);
    if (patient) {
        response.send(patient);
    }
    else {
        response.sendStatus(404);
    }
});
router.post("/", (req, res) => {
    try {
        const newPatient = (0, utils_1.default)(req.body);
        const addedPatient = patients_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
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
    }
    catch (error) {
        let errorMessage = "Adding entry failed.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
