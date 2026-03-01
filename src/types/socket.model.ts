export type Player = {
  id: string;
  name: string;
  progress: string;
  wpm: number;
  accuracy: number;
};

export type ProgressPayload = {
  name: string;
  text: string;
  wpm: number;
  accuracy: number;
};

export type NewRoundPayload = {
  sentence: string;
};