import { Vraag } from "@/types";

// Type definitie (alleen compile-time)
export type WrongItem = {
  question: Vraag;
  userAnswer: string;
};

// In-memory store (runtime)
let wrongAnswers: WrongItem[] = [];

export const getWrongAnswers = (): WrongItem[] => wrongAnswers.slice();
export const setWrongAnswers = (items: WrongItem[]) => {
  wrongAnswers = items.slice();
};
export const addWrongAnswer = (item: WrongItem) => {
  wrongAnswers.push(item);
};
export const clearWrongAnswers = () => {
  wrongAnswers = [];
};