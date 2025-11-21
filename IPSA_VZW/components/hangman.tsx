import React, { use, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { Antwoord, Vraag } from "@/types";
import Letters from "./letters";

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
  // when true the parent (page) will render hearts; hangman will update counts via heartsCountSetter
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
  const [livesLeft, setLivesLeft] = useState<number>(heartsCount ?? 3);
  const [solutionArray, setSolutionArray] = useState<string[]>([]);

  const questionData: {
    title: string;
    question: Vraag;
    options: QuizOption[];
  } = {
    title: title,
    question: question.vraag
      ? question
      : ({ vraag: "vraag niet beschikbaar" } as Vraag),
    // prefer the tekst of the first Antwoord object, fallback to question.vraag
    options: [
      {
        id: 1,
        formula:
          question.antwoorden?.[0]?.antwoord ??
          question.vraag ??
          "antwoord niet beschikbaar",
        color: "#26A69Aff",
      },
    ],
  };

  useEffect(() => {
    // if parent drives hearts, sync local state with the prop
    if (typeof heartsCount === "number") {
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
    for (let i = 0; i < solutionArray.length; i++) {
      if (solutionArray[i] === letter) {
        answerArray[i] = letter;
        setAnswerArray([...answerArray]);
        solutionArray[i] = "0";
        temp = true;
      }
    }
    console.log("Lives left:", livesLeft);
    if (!temp) {
      // decrement lives: prefer updating parent via heartsCountSetter if provided
      setLivesLeft((prev) => {
        const newLives = prev - 1;
        if (newLives === 0) {
          mistakeAmountSetter(mistakeAmount + 1);
          // reset to default (3)
          if (heartsCountSetter) {
            heartsCountSetter(3);
          } else {
            setLivesLeft(3);
          }
          onAnswerSelected?.(true);
        } else {
          if (heartsCountSetter) {
            heartsCountSetter(newLives);
          }
        }
        return newLives;
      });
    }
    console.log("Huidige antwoord array:", answerArray);
    if (!answerArray.includes("_")) {
      correctAmountSetter(correctAmount + 1);
      setLivesLeft(3);
      onAnswerSelected?.(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{questionData.question.vraag}</Text>
      <View style={styles.hangmanArray}>
        {answerArray.map((ch, index) => {
          return (
            <Text style={styles.hangmanLetter} key={index}>
              {ch}
            </Text>
          );
        })}
      </View>
      <Letters onSelect={handleLetterSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: 0,
    marginTop: 0,
  },
  hangmanArray: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  hangmanLetter: {
    margin: "5%",
    fontSize: 30,
  },
  title: {
    marginTop: 0,
    marginBottom: 70,
    fontSize: 24,
    width: "95%",
    textAlign: "center",
  },
  heartIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 4,
    top: 0,
    position: "absolute",
    marginTop: 0,
  },
});

export default HangmanQuiz;
