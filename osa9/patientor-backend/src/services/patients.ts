import patientData from "../../data/patients";

import { Patient, NonSensitivePatient } from "../types";

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

export default { getNonSensitive }