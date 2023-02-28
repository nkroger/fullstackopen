import { DiaryEntry } from "../types";

interface EntryProps {
  entry: DiaryEntry;
}

const Entry = (props: EntryProps) => {
  const { date, visibility, weather } = props.entry;
  return (
    <>
      <h3>{date}</h3>
      <br />
      visibility: {visibility}<br />
      weather: {weather}
    </>
  );
};

export default Entry;