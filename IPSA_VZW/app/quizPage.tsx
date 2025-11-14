import quizService from "@/services/quizService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Vraag } from "@/types";
import QuizMultipleChoice from "@/components/memoryChoice";
import QuizMemoryChoice from "@/components/memoryChoice";
import QuizConnect from "@/components/connect";
import QuizChoice from "@/components/choice";
import Score from "@/components/score";

type Connect = {
  type: string;
  vragen: Vraag[];
}

export default function quiz() {
  const router = useRouter();
  const [questions, setQuestions] = useState<(Vraag | Connect)[]>([]);
  const [questionsStandaard, setStandaardQuestions] = useState<Vraag[]>([]);
  const [connectQuestions, setConnectQuestions] = useState<Connect[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakeAmount, setMistakeAmount] = useState(0);
  const [correctAmount, setCorrectAmount] = useState(0);
  
  const getRandom18 = async () => {
    try {
        const response = await quizService.get18Questions();

        if (response.status === 200) {
            const vragen: Vraag[] = await response.json();
            JSON.stringify(vragen);
            setStandaardQuestions(vragen);
            console.log(vragen);
        } else {
            console.log('Ophalen van vragen mislukt');
        }
    } catch (error) {
        console.log(error);
    }
  }

  const getRandom8 = async () => {
    try {
      const response = await quizService.get8Questions();

      if (response.status === 200) {
        const vragen: Connect[] = await response.json();
        JSON.stringify(vragen)
        const con1 = [vragen[0], vragen[1], vragen[2], vragen[3]]
        const con2 = [vragen[4], vragen[5], vragen[6], vragen[7]]
        setConnectQuestions([{type:"connect", vragen: con1}, {type:"connect", vragen: con2}]);
        console.log(vragen)
      } else {
        console.log('Ophalen van connect vragen mislukt');
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRandom18();
    getRandom8();
  }, []);

  useEffect(() => {
    setQuestions([...connectQuestions, ...questionsStandaard]);
    console.log(questions)
  }, [questionsStandaard, connectQuestions]);

  const openQuestion = () => {
    const question = questions[currentIndex];
    console.log(question);

    if (!question) {
      return (
        <Score
        correctAmount={correctAmount}
        mistakesAmount={mistakeAmount}
        />
      );
    }

    if (question.type === "standaard-choice") {
      return (
        <QuizChoice
          title={`Vraag ${currentIndex + 1} van ${questions.length}`}
          question={question}
          onAnswerSelected={() => setCurrentIndex((i) => i + 1)}
          mistakeAmount={mistakeAmount}
          mistakeAmountSetter={setMistakeAmount}
          correctAmount={correctAmount}
          correctAmountSetter={setCorrectAmount}
        />
      );
    } 
    if (question.type === "memory-choice") {
      return (
        <QuizMemoryChoice
          title={`Vraag ${currentIndex + 1} van ${questions.length}`}
          question={question}
          onAnswerSelected={() => setCurrentIndex((i) => i + 1)}
          mistakeAmount={mistakeAmount}
          mistakeAmountSetter={setMistakeAmount}
          correctAmount={correctAmount}
          correctAmountSetter={setCorrectAmount}
        />
      );
    }
    if ("type" in question && question.type === "connect") {
      const conn = (question as Connect).vragen;
      return (
        <QuizConnect
          title={`Vraag ${currentIndex + 1} van ${questions.length}`}
          questiona={conn[0]}
          questionb={conn[1]}
          questionc={conn[2]}
          questiond={conn[3]}
          onAnswerSelected={() => setCurrentIndex((i) => i + 1)}
        />
      );
    }
  };

  return <View style={styles.container}>{openQuestion()}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 35 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  done: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  link: { color: "blue", textDecorationLine: "underline" },
});