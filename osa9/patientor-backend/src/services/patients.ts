import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";

import { Patient, NonSensitivePatient, NewPatient } from "../types";

const patients: Patient[] = patientData;

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
}

export default { getNonSensitive, addPatient }