import { useState, useEffect } from 'react';
import diaryService from "./services/diary";
import { DiaryEntry } from "./types";
import Entry from "./components/Entry";

const App = () => {
  const [ entries, setEntries ] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const getEntries = async () => {
      const diaryEntries = await diaryService.getAll();
      setEntries(diaryEntries);
    };
    void getEntries();
  }, []);

  return (
    <div>
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
