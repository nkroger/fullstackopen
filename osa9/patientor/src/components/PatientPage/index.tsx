//import {} from "@mui/material";
import { useState, useEffect } from "react";

import { Patient, Entry, Diagnosis } from "../../types";

import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import { Button } from "@mui/material";
import AddEntryForm from "./AddEntryForm";

interface Props {
  id: string | undefined
  diagnoses: Diagnosis[]
}

const PatientPage = ({ id, diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const showForm = (): void => {
    console.log("Showing form");
    setFormVisible(true);
  }
  
  const closeForm = (): void => {
    setFormVisible(false);
    //setError(undefined);
  };

  /*const hideForm = () => {
    console.log("Hiding form");
    setFormVisible(false);
  }*/

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
      <div className="App">
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
          <Button variant="contained" onClick={showForm}>
            Add New Entry
          </Button>
        </div>
        { formVisible && <AddEntryForm onCancel={closeForm} onSubmit={ () => console.log("submit")} />}
        <div>
          <h2>
            entries
          </h2>
          {patient.entries.map(entry => {
            const fullDiagnoses: Diagnosis[] = entry.diagnosisCodes
              ? entry.diagnosisCodes
                .map(code => diagnoses.find(d => d.code === code))
                .filter((diagnosis): diagnosis is Diagnosis => diagnosis !== undefined)
              : [];
            return <EntryDetails entry={entry} key={entry.id} diagnoses={fullDiagnoses} />
          })}
        </div>
      </div>
    )
  } else {
    return null
  }


}

export default PatientPage;