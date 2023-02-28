import { useState, useEffect } from 'react';
import axios from 'axios';
import diaryService from "./services/diary";
import { DiaryEntry, DiaryFormValues } from "./types";
import Entry from "./components/Entry";
import DiaryForm from "./components/DiaryForm";

interface ErrorProps {
  message: string;
  duration?: number;
}

const App = () => {
  const [ entries, setEntries ] = useState<DiaryEntry[]>([]);
  const [ errorMsg, setErrorMsg ] = useState<string>("");

  const errorStyle = {
    color: "red"
  };

  useEffect(() => {
    const getEntries = async () => {
      const diaryEntries = await diaryService.getAll();
      setEntries(diaryEntries);
    };
    void getEntries();
  }, []);

  const displayError = ({ message, duration=5 }: ErrorProps) => {
    setErrorMsg(message);
    setTimeout(() => {
      setErrorMsg("");
    }, duration * 1000);
  };

  const addDiaryEntry = async (values: DiaryFormValues) => {
    try {
      const entry = await diaryService.addEntry(values);
      setEntries(entries.concat(entry));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error?.response?.data === "string") {
          displayError({ message: error.response.data.replace("Something went wrong. ", "") });
        }
      } else {
        displayError({message: "Something went wrong!"});
      }
    }
  };

  return (
    <div>
      { errorMsg &&
        <div style={errorStyle}>{errorMsg}</div>
      }
      <DiaryForm onSubmit={addDiaryEntry} />
      <h2>Diary entries</h2>
      {
        entries.map( (entry, id) => {
          return (
            <div key={id}>
              <Entry entry={entry} />
            </div>
          );
        })
      }
    </div>
  );
};
  
export default App;
