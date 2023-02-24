import { CoursePart } from "../types";

interface ContentProps {
  parts: CoursePart[];
}

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// TODO check this
const Part = (props: PartProps) => {
  const part = props.part;
  let attributes = null;
  
  switch (part.kind) {
    case "basic":
      attributes = <i>{part.description}</i>;
      break;
    case "background":
      attributes = <>
        <i>{part.description}</i><br />
        {part.backroundMaterial}
      </>
      break;
    case "group":
      attributes = <>
        Project exercises {part.groupProjectCount}
      </>
      break;
    case "special":
      attributes = <>
      <i>{part.description}</i><br />
      Required skills: {part.requirements.join(", ")}
      </>
      break;
    default:
      return assertNever(part);
  }

  return (
    <p>
      {part.name} {part.exerciseCount}<br />
      {attributes}
    </p>
  )
}

const Content = (props: ContentProps) => {
  return (
      <>
      {props.parts.map( (p, i) => <Part key={i} part={p} />)}
      </>
  );
};

export default Content;