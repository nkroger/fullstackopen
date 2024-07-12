import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, FormControl } from '@mui/material';

import { EntryFormValues } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState('Hospital');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log("Adding")
    /*onSubmit({
      date,
      description,
    }AAAA*/
  };

  const typeOptions = [
    "HealthCheck", "OccupationalHealthcare", "Hospital"
  ];

  const handleTypeChange = (event: SelectChangeEvent<String>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const newType = typeOptions.find( t => t === event.target.value )
      if (newType) {
        setType(newType);
      }
    }
  }

  /**
   * TODO komponentit eri tyyppien detskuille ja useStatet niille?
   * resettifunkkari joka tyhjentää kaikki tyyppispesifit detailit vaihtaessa?
   */
  const HealthCheckDetails = () => (
      <div>health check</div>
  )

  const HospitalDetails = () => (
    <div>Hospital visit</div>
  )

  const OccupationalDetails = () => (
    <div>Occupational check</div>
  )

  return (
    <div>
      <form onSubmit={addEntry}>
        <FormControl fullWidth>
        <InputLabel id="type-select-label">Entry type</InputLabel>
        <Select label="Entry type" labelId="type-select-label" id="type-select" value={type} onChange={handleTypeChange}>
          <MenuItem value={"HealthCheck"}>Health check entry</MenuItem>
          <MenuItem value={"Hospital"}>Hospital entry</MenuItem>
          <MenuItem value={"OccupationalHealthcare"}>Occupational healthcare entry</MenuItem>
        </Select>
        </FormControl>
        <TextField
          label="Date"
          fullWidth 
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        {
        (type === "HealthCheck") ? <HealthCheckDetails /> : (type === "Hospital") ? <HospitalDetails /> : <OccupationalDetails />
        }
          

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