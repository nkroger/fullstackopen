//import {} from "@mui/material";
import { useState, useEffect } from "react";

import { Patient, Entry } from "../../types";

import patientService from "../../services/patients";

interface Props {
  id: string | undefined
}

const PatientPage = ({ id } : Props ) => {
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
                    return (<li key={i}>{code}</li>)
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