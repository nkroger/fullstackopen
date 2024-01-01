import React, { ReactNode } from "react";
import { Diagnosis, Entry, HealthCheckRating } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import { Card } from "@mui/material";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const healthColor = (rating: HealthCheckRating) => {
    switch (rating) {
        case HealthCheckRating.Healthy: 
            return "green";
        case HealthCheckRating.LowRisk:
            return "yellow";
        case HealthCheckRating.HighRisk:
            return "orange";
        case HealthCheckRating.CriticalRisk:
            return "red";
        default:
            return "grey";
    }
}

const HealthIcon: React.FC<{ rating: HealthCheckRating }> = ({ rating }) => {
    const iconColor = healthColor(rating);
    return (
        <FavoriteIcon style={{ color: iconColor }} />
    )
}

const DiagnosisCodes: React.FC<{ codes: Array<Diagnosis["code"]> | undefined, diagnoses: Diagnosis[] }> = ({ codes, diagnoses }) => {
    if (!codes) return null;
    
    return (
        <div>
            <ul>
                {diagnoses.map(diagnosis => {
                    return <li key={diagnosis.code}>{diagnosis.code} {diagnosis.name}</li>
                })}
            </ul>
        </div>
    )
}

const HospitalEntry: React.FC<EntryDetailProps> = ({ entry, diagnoses }) => {
    if (entry.type !== "Hospital") {
        return null;
    }
    return (
       <EntryComponent icon={<LocalHospitalIcon />} entry={entry} diagnoses={diagnoses} >
        <p>Discharge date: {entry.discharge.date}</p>
        <p>      Criteria: {entry.discharge.criteria}</p>        
       </EntryComponent>
    )
}

const OccupationalEntry: React.FC<EntryDetailProps> = ({ entry, diagnoses }) => {
    if (entry.type !== "OccupationalHealthcare") { return null; }
    
    return (
       <EntryComponent icon={<WorkIcon />} entry={entry} employer={entry.employerName} diagnoses={diagnoses} >
        {entry.sickLeave && <p>Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>}
       </EntryComponent>
    )
}

const HealthCheckEntry: React.FC<EntryDetailProps> = ({ entry, diagnoses }) => {
    if (entry.type !== "HealthCheck") { return null; }

    return (
        <EntryComponent icon={<MedicalInformationIcon />} entry={entry} diagnoses={diagnoses} >
            <HealthIcon rating={entry.healthCheckRating} />
        </EntryComponent>
    )
}

type EntryProps = {
    entry: Entry,
    icon: ReactNode,
    children?: ReactNode,
    employer?: string,
    diagnoses: Diagnosis[]
}

const EntryComponent: React.FC<EntryProps> = ({ entry, icon, children, employer, diagnoses }) => {
    return (
        <Card variant="outlined" style={{ marginBottom: "1rem", paddingInline: "4px" }}>
            {entry.date} {icon} {employer && employer}<br />
            <p>{entry.description}</p>
            {entry.diagnosisCodes &&
                <DiagnosisCodes codes={entry.diagnosisCodes} diagnoses={diagnoses} />}
            <div>{children}</div>
            <p>Diagnosis by {entry.specialist}</p>
        </Card>
    )
}

type EntryDetailProps = {
    entry: Entry,
    diagnoses: Diagnosis[]
}

const EntryDetails: React.FC<EntryDetailProps> = (props) => {
    switch (props.entry.type) {
        case "Hospital":
            return <HospitalEntry {...props} />
        case "OccupationalHealthcare":
            return <OccupationalEntry {...props} />
        case "HealthCheck":
            return <HealthCheckEntry {...props} />
        default:
            return assertNever(props.entry)
    }
}

export default EntryDetails;