//import {} from "@mui/material";
import { useState, useEffect } from "react";

import { Patient, Entry, Diagnosis, EntryFormValues } from "../../types";

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
  const [entries, setEntries] = useState<Array<Entry>>([]);
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

  const submitNewEntry = async (values: EntryFormValues) => {
    if (id) {

      try {
        const newEntry = await patientService.addEntry(values, id);
        //patient?.entries.push(newEntry);
        setEntries(entries.concat(newEntry));
        //setPatient(newEntry);
        setFormVisible(false);
      } catch (e: unknown) {
        console.log("Unknown error", e);
      }
    }
  }

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const foundPatient = await patientService.getPatient(id);
        setPatient(foundPatient);
        setEntries(foundPatient.entries);
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
        { formVisible && <AddEntryForm onCancel={closeForm} onSubmit={submitNewEntry} />}
        <div>
          <h2>
            entries
          </h2>
          {entries.map(entry => {
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