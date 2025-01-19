import { useState, SyntheticEvent } from "react";
import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, FormControl } from '@mui/material';
import { EntryFormValues, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState('Hospital');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState("");
  const [codes, setCodes] = useState("");
  const [rating, setRating] = useState(HealthCheckRating.Healthy);
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");
  const [employer, setEmployer] = useState("");
  const [leaveStart, setLeaveStart] = useState("");
  const [leaveEnd, setLeaveEnd] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log("Adding entry");
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: codes.trim().split(", ")
    }
    switch (type) {
      case "HealthCheck":
        onSubmit({
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: rating
        })
        break;
      case "Hospital":
        onSubmit({
          ...baseEntry,
          type: "Hospital",
          discharge: {
            criteria,
            date: dischargeDate
          } 
        })
        break;
      case "OccupationalHealthcare":
        onSubmit({
          type: "OccupationalHealthcare",
          ...baseEntry,
          employerName: employer,
          sickLeave: (leaveStart && leaveEnd) ? {
            startDate: leaveStart,
            endDate: leaveEnd
          } : undefined
        })
    }
  };

  const typeOptions = [
    "HealthCheck", "OccupationalHealthcare", "Hospital"
  ];

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const newType = typeOptions.find( t => t === event.target.value )
      if (newType) {
        setType(newType);
      }
    }
  }

  interface HCRatingOption {
    value: HealthCheckRating;
    label: string;
  }

  const ratingOptions: HCRatingOption[] = Object.values(HealthCheckRating)
  .filter(v => typeof v === 'number') 
  .map(v => ({
    value: v as HealthCheckRating, label: HealthCheckRating[v as HealthCheckRating]
  }));

  const handleHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;
      const newRating = ratingOptions.find(r => r.value === value);
      if (newRating) {
        setRating(newRating.value);
      }
    }
  }

  const HealthCheckDetails = () => (
    <Select
      label="Health Check Rating"
      id="health-check-rating"
      fullWidth
      value={rating}
      onChange={handleHealthCheckRatingChange}
      >
      {ratingOptions.map(option =>
        <MenuItem
          key={option.label}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      )}
      </Select>
  )

  const HospitalDetails = () => (
    <>
      <TextField
        label="Discharge date"
        id="discharge-date"
        placeholder="YYYY-MM-DD"
        value={dischargeDate}
        onChange={({target}) => {setDischargeDate(target.value);}}
      />
      <TextField
        label="Discharge criteria"
        id="discharge-criteria"
        placeholder=""
        fullWidth
        value={criteria}
        onChange={({ target }) => setCriteria(target.value)}
      />
    </>
  )

  const OccupationalDetails = () => (
    <>
      <TextField
        label="Employer name" 
        id="employer-field"
        fullWidth
        value={employer}
        onChange={({ target}) => setEmployer(target.value)}
        />
      <TextField
        label="Sickleave start"
        id="sickleave-start"
        placeholder="YYYY-MM-DD"
        value={leaveStart}
        onChange={({target}) => {setLeaveStart(target.value);}}
      />
      <TextField
        label="Sickleave end"
        id="sickleave-end"
        placeholder="YYYY-MM-DD"
        value={leaveEnd}
        onChange={({target}) => {setLeaveEnd(target.value);}}
      />
    </>
  )

  return (
    <div style={{ margin: "12px 0" }}>
      <form key="new-entry-form" onSubmit={addEntry}>
        <FormControl fullWidth>
        <InputLabel id="type-select-label">Entry type</InputLabel>
        <Select label="Entry type" labelId="type-select-label" id="type-select" value={type} onChange={handleTypeChange}>
          <MenuItem
            key="healthcheck"
            value={"HealthCheck"}
            >
              Health check entry
          </MenuItem>
          <MenuItem
            key="Hospital"
            value={"Hospital"}
            >Hospital entry
          </MenuItem>
          <MenuItem
            key="OccupationalHealthcare"
            value={"OccupationalHealthcare"}
            >Occupational healthcare entry
          </MenuItem>
        </Select>
        </FormControl>
        <TextField
          label="Date"
          id="entry-date"
          fullWidth 
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          id="entry-description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          id="specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          id="diagnoses"
          fullWidth
          value={codes}
          onChange={({ target }) => setCodes(target.value)}
        />
        <div id="health-check" style={{ display: type === "HealthCheck" ? "block" : "none" }}>
          { HealthCheckDetails() }
        </div>
        <div id="hospital-details" style={{ display: type === "Hospital" ? "block" : "none" }}>
          { HospitalDetails() }
        </div>
        <div id="occupational-details" style={{ display: type === "OccupationalHealthcare" ? "block" : "none" }}>
         { OccupationalDetails() }
        </div>
          

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;