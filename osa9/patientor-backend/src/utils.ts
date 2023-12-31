import { NewPatient, NewEntry, Gender, Entry, Diagnosis, Discharge, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (numb: unknown): numb is number => {
  return typeof numb === 'number' || numb instanceof Number;
}

const parseString = (input: unknown): string => {
  if (!isString(input)) {
    throw new Error("Not a string");
  }

  return input;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (dateInput: unknown): string => {
  if (!isString(dateInput) || !isDate(dateInput)) {
    throw new Error("Incorrect or missing date: " + dateInput);
  }
  return dateInput;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map( g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isEntryType = (param: string): param is "Hospital" | "HealthCheck" | "OccupationalHealthcare" => {
  return ["Hospital", "HealthCheck", "OccupationalHealthcare"].includes( param )
}

const parseEntryType = (entryType: unknown): "Hospital" | "HealthCheck" | "OccupationalHealthcare" => {
  if (!isString(entryType) || !isEntryType(entryType)) {
    throw new Error("Incorrect or missing entry type: " + entryType);
  }

  return entryType;
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
      occupation: parseString(object.occupation),
      entries: []
    };
    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || 0 > rating || rating > 3) {
    throw new Error("Incorrect health rating: " + rating);
  }
  return rating as HealthCheckRating;
}

type NewEntryBase = Omit<Entry, "id">;

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnosis["code"]>;
}

const parseHealthCheck = (object: unknown, newEntry: NewEntryBase): NewEntry => {
  if (!object || typeof object !== "object" || !("healthCheckRating" in object)) {
    throw new Error("Incorrect or missing data for HealthCheckEntry: " + JSON.stringify(object));
  }
  return {
    ...newEntry,
    type: "HealthCheck",
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  };
}

const parseOccupationalHealthcare = (object: unknown, newEntry: NewEntryBase): NewEntry => {
  if (!object || typeof object !== "object" || !('employerName' in object) || newEntry.type !== "OccupationalHealthcare") {
    throw new Error("Incorrect or missing data for Occupational Healthcare Entry");
  }
  return {
    ...newEntry,
    type: "OccupationalHealthcare",
    employerName: parseString(object.employerName),

  }
}

const parseDischarge = (newEntry: object): Discharge => {
  if (!("discharge" in newEntry) || !newEntry.discharge || typeof newEntry.discharge !== "object" ) {
    throw new Error("Incorrect or missing discharge for hospital entry");
  }
  const discharge = newEntry.discharge;

  if (!("date" in discharge)) { throw new Error("Discharge date missing") }
  if (!("criteria" in discharge)) { throw new Error("Discharge criteria missing") }

  return {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria)
  };
}

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("date" in object && "description" in object && "type" in object && "specialist" in object) {
    const newEntry: NewEntryBase = {
      date: parseDate(object.date),
      type: parseEntryType(object.type),
      description: parseString(object.description),
      specialist: parseString(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object)
    }
    switch (newEntry.type) {
        case "HealthCheck":
          return parseHealthCheck(object, newEntry);
        case "OccupationalHealthcare":
          return parseOccupationalHealthcare(object, newEntry);
        case "Hospital":
          return {
            ...newEntry,
            type: "Hospital",
            discharge: parseDischarge(object)
          }
        default:
          throw new Error("Unhandled entry type: " + newEntry.type);
    }
  }

  throw new Error("Incorrect or missing data: " + JSON.stringify(object));
}

export default toNewPatient;
