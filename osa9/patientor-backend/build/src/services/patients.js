"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const findById = (id) => {
    const patient = patients.find(p => p.id === id);
    return patient;
};
const getNonSensitive = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (patientInfo) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, patientInfo);
    patients.push(newPatient);
    return newPatient;
};
exports.default = { findById, getNonSensitive, addPatient };
