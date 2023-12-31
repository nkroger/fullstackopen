import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";

import { Patient, NonSensitivePatient, NewPatient, NewEntry } from "../types";

const patients: Patient[] = patientData;

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const getNonSensitive = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patientInfo: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patientInfo
  };

  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = (id: string, newEntry: NewEntry) => {
  const patient = findById(id);
  if (!patient) {
    throw new Error("No patient found with id: " + id);
  }
  patient.entries.push({...newEntry, id: uuid() })
  return patient;
}

export default { findById, getNonSensitive, addPatient, addPatientEntry };
