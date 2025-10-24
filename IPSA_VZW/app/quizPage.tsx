import quizService from "@/services/quizService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Vraag } from "../../types";
import QuizMultipleChoice from "@/components/memoryChoice";
import QuizMemoryChoice from "@/components/memoryChoice";
import QuizChoice from "@/components/choice";
import Score from "@/components/score";


export default function quiz() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Vraag[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakeAmount, setMistakeAmount] = useState(0);
  const [correctAmount, setCorrectAmount] = useState(0);
  
  const getRandom20 = async () => {
    try {
        const response = await quizService.getQuestions();

        if (response.status === 200) {
            const vragen: Vraag[] = await response.json();
            JSON.stringify(vragen);
            setQuestions(vragen);
            console.log(vragen);
        } else {
            console.log('Ophalen van vragen mislukt');
        }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getRandom20();
  }, [])
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
          title={`Pagina ${currentIndex + 1} van ${questions.length}`}
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
          title={`Pagina ${currentIndex + 1} van ${questions.length}`}
          question={question}
          onAnswerSelected={() => setCurrentIndex((i) => i + 1)}
          mistakeAmount={mistakeAmount}
          mistakeAmountSetter={setMistakeAmount}
          correctAmount={correctAmount}
          correctAmountSetter={setCorrectAmount}
        />
      );
    }
  };

  return <View style={styles.container}>{openQuestion()}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  done: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  link: { color: "blue", textDecorationLine: "underline" },
});