interface CoursePart {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  parts: CoursePart[];
}

const Part = (props: CoursePart) => {
  return (
    <p>{props.name} {props.exerciseCount}</p>
  )
}

const Content = (props: ContentProps) => {
  return (
      <>
      {props.parts.map( (p, i) => <Part key={i} name={p.name} exerciseCount={p.exerciseCount} />)}
      </>
  );
};

export default Content;