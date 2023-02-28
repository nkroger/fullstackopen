import { useState, SyntheticEvent } from 'react';
import { DiaryFormValues } from '../types';

interface Props {
  onSubmit: (values: DiaryFormValues) => void;
}

const DiaryForm = ({ onSubmit}: Props) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleAdd = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      visibility,
      weather,
      comment
    });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleAdd}>
        <div>
          date:
          <input
            id="flight-date"
            type="text"
            value={date}
            name="date"
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility:
          <input
            id="flight-visibility"
            type="text"
            value={visibility}
            name="visibility"
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          weather:
          <input
            id="flight-weather"
            type="text"
            value={weather}
            name="weather"
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          comment:
          <input
            id="flight-comment"
            type="text"
            value={comment}
            name="comment"
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button id="add-flight-button" type="submit">
          add
        </button>
      </form>
    </div>
  );
};

export default DiaryForm;