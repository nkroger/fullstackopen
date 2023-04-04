//import {} from "@mui/material";
import { useState, useEffect } from "react";

import { Patient, Entry, Diagnosis } from "../../types";

import patientService from "../../services/patients";

interface Props {
  id: string | undefined
  diagnoses: Diagnosis[]
}

const PatientPage = ({ id, diagnoses } : Props ) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const foundPatient = await patientService.getPatient(id);
        setPatient(foundPatient);
      }
    }
    void fetchPatient();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (patient) {
    return (
      <div>
        <h1>{patient.name}</h1>
        {patient.ssn && (
          <div>
            {patient.ssn}
            <br />
          </div>
        )}
        <div>
          occupation: {patient.occupation}
        </div>
        <div>
          <h2>
            entries
          </h2>
          {patient.entries.map( entry => {
            return (
            <div key={entry.id}>
              {entry.date} <em>{entry.description}</em>
              {entry.diagnosisCodes && 
                <ul>
                  {entry.diagnosisCodes.map( (code, i) => {
                    return (<li key={i}>{code} {diagnoses.find( d => d.code === code )?.name}</li>)
                  })}
                </ul>
              }
            </div>
            )
          })
          }
        </div>
      </div>
    )
  } else {
    return null
  }


}

export default PatientPage;