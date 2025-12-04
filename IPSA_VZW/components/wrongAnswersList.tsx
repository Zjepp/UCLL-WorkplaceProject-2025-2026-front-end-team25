import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type WrongItem = { id: string; question: string; answer: string };

type WrongAnswersContextShape = {
  wrongAnswers: WrongItem[];
  addWrong: (question: string, answer: string) => void;
  clearWrong: () => void;
};

const WrongAnswersContext = createContext<WrongAnswersContextShape | undefined>(undefined);

const STORAGE_KEY = "wrongAnswers";

export const WrongAnswersProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [wrongAnswers, setWrongAnswers] = useState<WrongItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // laad data bij mount
  useEffect(() => {
    const loadWrongAnswers = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setWrongAnswers(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Fout bij laden van foute antwoorden:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadWrongAnswers();
  }, []);

  // sla op wanneer wrongAnswers verandert
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(wrongAnswers)).catch((error) =>
        console.error("Fout bij opslaan van foute antwoorden:", error)
      );
    }
  }, [wrongAnswers, isLoaded]);

  const addWrong = useCallback((question: string, answer: string) => {
    setWrongAnswers((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        question,
        answer,
      },
    ]);
  }, []);

  const clearWrong = useCallback(async () => {
    setWrongAnswers([]);
    await AsyncStorage.removeItem(STORAGE_KEY).catch((error) =>
      console.error("Fout bij verwijderen van foute antwoorden:", error)
    );
  }, []);

  return (
    <WrongAnswersContext.Provider value={{ wrongAnswers, addWrong, clearWrong }}>
      {children}
    </WrongAnswersContext.Provider>
  );
};

export const useWrongAnswers = (): WrongAnswersContextShape => {
  const ctx = useContext(WrongAnswersContext);
  if (!ctx) throw new Error("useWrongAnswers must be used inside WrongAnswersProvider");
  return ctx;
};