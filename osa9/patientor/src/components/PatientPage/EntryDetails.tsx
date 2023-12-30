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

const DiagnosisCodes: React.FC<{ codes: Array<Diagnosis["code"]> | undefined }> = ({ codes }) => {
    if (!codes) return null;
    
    return (
        <ul>
            {codes.map( code => {
                return <li key={code}>{code}</li>
            })}
        </ul>
    )
}

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    if (entry.type !== "Hospital") {
        return null;
    }
    return (
       <EntryComponent icon={<LocalHospitalIcon />} entry={entry}>
        <p>Discharge date: {entry.discharge.date}</p>
        <p>      Criteria: {entry.discharge.criteria}</p>        
       </EntryComponent>
    )
}

const OccupationalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    if (entry.type !== "OccupationalHealthcare") { return null; }
    
    return (
       <EntryComponent icon={<WorkIcon />} entry={entry} employer={entry.employerName}>
        {entry.sickLeave && <p>Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>}
       </EntryComponent>
    )
}

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    if (entry.type !== "HealthCheck") { return null; }

    return (
        <EntryComponent icon={<MedicalInformationIcon />} entry={entry}>
            <HealthIcon rating={entry.healthCheckRating} />
        </EntryComponent>
    )
}

type EntryProps = {
    entry: Entry,
    icon: ReactNode,
    children?: ReactNode,
    employer?: string
}

const EntryComponent: React.FC<EntryProps> = ({ entry, icon, children, employer }) => {
    return (
        <Card variant="outlined" style={{ marginBottom: "1rem", paddingInline: "4px" }}>
            {entry.date} {icon} {employer && employer}<br />
            <p>{entry.description}</p>
            <div>{children}</div>
            <p>Diagnosis by {entry.specialist}</p>
        </Card>
    )
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} />
        case "OccupationalHealthcare":
            return <OccupationalEntry entry={entry} />
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />
        default:
            return assertNever(entry)
    }
}

export default EntryDetails;