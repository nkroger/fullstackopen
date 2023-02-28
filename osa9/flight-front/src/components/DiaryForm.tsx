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
            type="date"
            value={date}
            name="date"
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility:
          <input type="radio" name="visibility" onChange={() => setVisibility("great")} /> great
          <input type="radio" name="visibility" onChange={() => setVisibility("good")} /> good
          <input type="radio" name="visibility" onChange={() => setVisibility("ok")} /> ok
          <input type="radio" name="visibility" onChange={() => setVisibility("poor")} /> poor
        </div>
        <div>
          weather:
          <input type="radio" name="weather" onChange={() => setWeather("sunny")} /> sunny
          <input type="radio" name="weather" onChange={() => setWeather("rainy")} /> rainy
          <input type="radio" name="weather" onChange={() => setWeather("cloudy")} /> cloudy
          <input type="radio" name="weather" onChange={() => setWeather("stormy")} /> stormy
          <input type="radio" name="weather" onChange={() => setWeather("windy")} /> windy
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