import quizService from "@/services/quizService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, Platform, StatusBar, KeyboardAvoidingView } from "react-native";
import { Vraag } from "../../types";
import QuizMultipleChoice from "@/components/memoryChoice";
import QuizMemoryChoice from "@/components/memoryChoice";
import QuizChoice from "@/components/choice";
import Score from "@/components/score";
import HangmanQuiz from "@/components/hangman";
import HeartIcon from "../assets/images/heart.png";


export default function quiz() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Vraag[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakeAmount, setMistakeAmount] = useState(0);
  const [correctAmount, setCorrectAmount] = useState(0);
  const [heartsCount, setHeartsCount] = useState<number>(3);
  
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
    if (question.type === "hangman") {
      return (
        
        <HangmanQuiz
          title={`Pagina ${currentIndex + 1} van ${questions.length}`}
          question={question}
          onAnswerSelected={() => setCurrentIndex((i) => i + 1)}
          mistakeAmount={mistakeAmount}
          mistakeAmountSetter={setMistakeAmount}
          correctAmount={correctAmount}
          correctAmountSetter={setCorrectAmount}
          showHearts={true}
          heartsCount={heartsCount}
          heartsCountSetter={setHeartsCount}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {questions[currentIndex]?.type === 'hangman' && (
        <View style={styles.heartContainer} pointerEvents="none">
          {Array.from({ length: heartsCount }).map((_, i) => (
            <Image key={i} source={HeartIcon} style={styles.heartIcon} resizeMode="contain" />
          ))}
        </View>
      )}
        {openQuestion()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative', marginTop: 35 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'stretch', paddingHorizontal: 12 },
  center: { flex: 1 },
  done: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  link: { color: "blue", textDecorationLine: "underline" },
  heartContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 10,
  },
  heartIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 4,
  }
});