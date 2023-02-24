import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const parseString = (input: unknown): string => {
  if (!isString(input)) {
    throw new Error("Not a string");
  }

  return input;
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
}

const parseDate = (dateInput: unknown): string => {
  if (!isString(dateInput) || !isDate(dateInput)) {
    throw new Error("Incorrect or missing date: " + dateInput);
  }
  return dateInput;
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map( g => g.toString()).includes(param);
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
}

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation)
    }
    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
}

export default toNewPatient;