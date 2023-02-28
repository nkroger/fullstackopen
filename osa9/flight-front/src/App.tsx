import { useState, useEffect } from 'react';
import diaryService from "./services/diary";
import { DiaryEntry, DiaryFormValues } from "./types";
import Entry from "./components/Entry";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [ entries, setEntries ] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const getEntries = async () => {
      const diaryEntries = await diaryService.getAll();
      setEntries(diaryEntries);
    };
    void getEntries();
  }, []);

  const addDiaryEntry = async (values: DiaryFormValues) => {
    const entry = await diaryService.addEntry(values);
    setEntries(entries.concat(entry));
  };

  return (
    <div>
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
