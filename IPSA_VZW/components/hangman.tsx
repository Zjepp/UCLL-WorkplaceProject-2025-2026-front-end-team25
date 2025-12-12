import React, { use, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Antwoord, Vraag } from "@/types";
import Letters from "./letters";
import { addWrongAnswer } from "./wrongItemStore";

interface QuizOption {
  id: number;
  formula: string | Antwoord;
  color: string;
}
interface HangmanQuizProps {
  onAnswerSelected?: (selected: boolean) => void;
  title: string;
  question: Vraag;
  mistakeAmount: number;
  mistakeAmountSetter: (amount: number) => void;
  correctAmount: number;
  correctAmountSetter: (amount: number) => void;
  showHearts?: boolean;
  heartsCount?: number;
  heartsCountSetter?: (amount: number) => void;
}

const HangmanQuiz: React.FC<HangmanQuizProps> = ({
  onAnswerSelected,
  title,
  question,
  mistakeAmount,
  mistakeAmountSetter,
  correctAmount,
  correctAmountSetter,
  showHearts,
  heartsCount,
  heartsCountSetter,
}) => {
  const [answerArray, setAnswerArray] = useState<string[]>([]);
  const [livesLeft, setLivesLeft] = useState<number>(3);
  const [solutionArray, setSolutionArray] = useState<string[]>([]);
  const { width, height } = useWindowDimensions();
  const base = Math.min(width, height);

  // Bigger sizes than before
  const titleFont = base * 0.075; // question text
  const hangmanFont = base * 0.07; // revealed/hidden letters
  const letterMargin = base * 0.04;

  const questionData: {
    title: string;
    question: Vraag;
    options: QuizOption[];
  } = {
    title: title,
    question: question.vraag
      ? question
      : ({ vraag: "vraag niet beschikbaar" } as Vraag),
    options: [
      {
        id: 1,
        formula:
          question.antwoorden?.[0]?.antwoord ??
          question.vraag ??
          "antwoord niet beschikbaar",
        color: "#28A0A0",
      },
    ],
  };
  const questionResetKey = question.vraag;

  useEffect(() => {
    if (typeof heartsCount === "number") {
      console.log("Initial hearts count from props:", heartsCount);
      console.log("idk anymore", livesLeft);
      setLivesLeft(heartsCount);
    }

    const raw =
      typeof questionData.options[0].formula === "string"
        ? questionData.options[0].formula
        : String(questionData.options[0].formula);

    const upper = raw.toUpperCase();
    const letters = upper.split("");

    // solutionArray holds the canonical solution characters (uppercased)
    setSolutionArray(letters);
    //console.log('Oplossing letters:', letters);

    // answerArray holds the visible characters for the player: letters -> '_' , keep spaces/punctuation
    const initialDisplay = letters.map((ch) => (/[A-Z]/.test(ch) ? "_" : ch));
    setAnswerArray(initialDisplay);
  }, [question]);

  useEffect(() => {
    if (!answerArray.includes("_") && answerArray.length > 0) {
      console.log(answerArray);
      correctAmountSetter(correctAmount + 1);
      setLivesLeft(3);
      heartsCountSetter?.(3);
      onAnswerSelected?.(true);
    }
    if (livesLeft <= 0) {
      const correct = question.antwoorden?.find((a) => a.correct)?.antwoord ?? "";
      addWrongAnswer({ question: question, userAnswer: '/' });
      mistakeAmountSetter(mistakeAmount + 1);
      setLivesLeft(3);
      heartsCountSetter?.(3);
      onAnswerSelected?.(false);
    }
  }, [answerArray]);

  const handleSelect = (option: QuizOption) => {
    const answerText =
      typeof option.formula === "string"
        ? option.formula
        : String(option.formula);

    const letters = answerText.toUpperCase().split("");
    console.log("Letters:", letters);

    // if(typeof option.formula === 'object' && option.formula !== null && 'correct' in option.formula){
    //   if(option.formula.correct) {correctAmountSetter(correctAmount+1)} else {mistakeAmountSetter(mistakeAmount + 1)};
    // };
    // onAnswerSelected?.(true);
  };

  // handler to receive individual letters from the Letters component
  const handleLetterSelect = (letter: string) => {
    console.log(`Geselecteerde letter vanuit Hangman: ${letter}`);
    handleSelect(questionData.options[0]);
    var temp = false;
    const updatedAnswer = [...answerArray];
    const updatedSolution = [...solutionArray];

    for (let i = 0; i < solutionArray.length; i++) {
      if (updatedSolution[i] === letter) {
        updatedAnswer[i] = letter;
        updatedSolution[i] = "0";
        temp = true;
      }
    }

    if (!temp) {
      const temp = livesLeft;
      setLivesLeft(temp - 1);
      heartsCountSetter?.(temp - 1);
    }
    console.log("Huidige antwoord array:", answerArray);

    setAnswerArray(updatedAnswer);
    setSolutionArray(updatedSolution);
    console.log("Lives left:", livesLeft);
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { fontSize: titleFont, marginBottom: base * 0.05 },
        ]}
      >
        {questionData.question.vraag}
      </Text>
      <View style={styles.hangmanArray}>
        {answerArray.map((ch, index) => {
          return (
            <Text
              style={[
                styles.hangmanLetter,
                { fontSize: hangmanFont, margin: letterMargin },
              ]}
              key={index}
            >
              {ch}
            </Text>
          );
        })}
      </View>
      <View style={styles.keyboard}>
        <Letters onSelect={handleLetterSelect} resetKey={questionResetKey} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: 0,
  },
  hangmanArray: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  hangmanLetter: {
    width: 10,
  },
  title: {
    position: "absolute",
    top: 100,
    marginBottom: 70,
    fontSize: 24,
    textAlign: "center",
  },
});

export default HangmanQuiz;
