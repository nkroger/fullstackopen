"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoses_1 = __importDefault(require("../services/diagnoses"));
const router = express_1.default.Router();
router.get("/", (_req, response) => {
    const data = diagnoses_1.default.getEntries();
    response.send(data);
});
exports.default = router;
