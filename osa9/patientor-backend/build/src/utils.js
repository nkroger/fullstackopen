"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (input) => {
    if (!isString(input)) {
        throw new Error("Not a string");
    }
    return input;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (dateInput) => {
    if (!isString(dateInput) || !isDate(dateInput)) {
        throw new Error("Incorrect or missing date: " + dateInput);
    }
    return dateInput;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(g => g.toString()).includes(param);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};
const isEntryType = (param) => {
    return ["Hospital", "HealthCheck", "OccupationalHealthcare"].includes(param);
};
const parseEntryType = (entryType) => {
    if (!isString(entryType) || !isEntryType(entryType)) {
        throw new Error("Incorrect or missing entry type: " + entryType);
    }
    return entryType;
};
const toNewPatient = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {
        const newPatient = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
            entries: []
        };
        return newPatient;
    }
    throw new Error("Incorrect data: some fields are missing");
};
const parseHealthCheckRating;
(object) => ;
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== "object" || !('diagnosisCodes' in object)) {
        return [];
    }
    return object.diagnosisCodes;
};
const parseHealthCheck;
(object, newEntry) => {
    return Object.assign(Object.assign({}, newEntry), { healthCheckRating: parseHealthCheckRating(object) });
};
const toNewEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("date" in object && "description" in object && "type" in object && "specialist" in object) {
        const newEntry = {
            date: parseDate(object.date),
            type: parseEntryType(object.type),
            description: parseString(object.description),
            specialist: parseString(object.specialist)
        };
        switch (newEntry.type) {
            case "HealthCheck":
                return parseHealthCheck(object, newEntry);
            case "OccupationalHealthcare":
                return parseOccupationalHealthcare(object, newEntry);
        }
    }
};
exports.toNewEntry = toNewEntry;
exports.default = toNewPatient;
