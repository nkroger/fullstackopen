import axios from "axios";
import { DiaryEntry, DiaryFormValues } from "../types";

const baseUrl = "http://localhost:3001/api/diaries";

const getAll = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const addEntry = async (object: DiaryFormValues) => {
  const { data } = await axios.post<DiaryEntry>(
    baseUrl,
    object
  );

  return data;
};

export default {
  getAll, addEntry
};