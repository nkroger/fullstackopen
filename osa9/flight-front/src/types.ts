export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export interface DiaryEntry {
  date: string;
  visibility: Visibility;
  weather: Weather;
  comment: string;
}

export interface DiaryFormValues {
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}