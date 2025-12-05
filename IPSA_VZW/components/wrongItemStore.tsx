import { Vraag } from "@/types";

// Type definitie (alleen compile-time)
export type WrongItem = {
  question: Vraag;
  userAnswer: string;
};

// In-memory store (runtime)
let wrongAnswers: WrongItem[] = [];

// Haal alle foute antwoorden op (kopie)
export const getWrongAnswers = (): WrongItem[] => {
  return [...wrongAnswers];
};

// Vervang volledige lijst
export const setWrongAnswers = (items: WrongItem[]) => {
  wrongAnswers = [...items];
};

// Voeg een fout antwoord toe
export const addWrongAnswer = (item: WrongItem) => {
  wrongAnswers.push(item);
};

// Reset de lijst
export const clearWrongAnswers = () => {
  wrongAnswers = [];
};
