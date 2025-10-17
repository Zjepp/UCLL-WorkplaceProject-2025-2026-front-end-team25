import quizService from "@/services/quizService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vraag } from "../../types";
import QuizMultipleChoice from "@/components/memoryChoice";
import QuizMemoryChoice from "@/components/memoryChoice";
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

    if (!question) {
      return (
        <Score
        correctAmount={correctAmount}
        mistakesAmount={mistakeAmount}
        />
        // <View style={styles.center}>
        //   <Text style={styles.done}>🎉 Alle vragen beantwoord!</Text>
        //   <Text onPress={() => router.push("/")} style={styles.link}>
        //     Terug naar menu
        //   </Text>
        // </View>
      );
    }

    if (question.type === "standaard-choice") {
      return (
        <QuizMultipleChoice
          title=""
          question={question}
          onAnswerSelected={() => setCurrentIndex((i) => i + 1)}
          mistakeAmount={mistakeAmount}
          mistakeAmountSetter={setMistakeAmount}
          correctAmount={correctAmount}
          correctAmountSetter={setCorrectAmount}
        />
      );
    } else {
      return (
        <QuizMemoryChoice
          title=""
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