import quizService from "@/services/quizService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { Vraag } from "@/types";
import QuizMultipleChoice from "@/components/memoryChoice";
import QuizMemoryChoice from "@/components/memoryChoice";
import QuizConnect from "@/components/connect";
import QuizChoice from "@/components/choice";
import Score from "@/components/score";
import HangmanQuiz from "@/components/hangman";
import HeartIcon from "../assets/images/heart.png";
type Connect = {
  type: string;
  vragen: Vraag[];
};

export default function quiz() {
  const router = useRouter();
  const [questions, setQuestions] = useState<(Vraag | Connect)[]>([]);
  const [questionsStandaard, setStandaardQuestions] = useState<Vraag[]>([]);
  const [connectQuestions, setConnectQuestions] = useState<Connect[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakeAmount, setMistakeAmount] = useState(0);
  const [correctAmount, setCorrectAmount] = useState(0);
  const [heartsCount, setHeartsCount] = useState(3);

  const dataReady =
    questionsStandaard.length > 0 &&
    connectQuestions.length > 0 &&
    questions.length > 0;

  const getRandom18 = async () => {
    try {
      const response = await quizService.get18Questions();

      if (response.status === 200) {
        const vragen: Vraag[] = await response.json();
        JSON.stringify(vragen);
        setStandaardQuestions(vragen);
        console.log(vragen);
      } else {
        console.log("Ophalen van vragen mislukt");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRandom8 = async () => {
    try {
      const response = await quizService.get8Questions();

      if (response.status === 200) {
        const vragen: Connect[] = await response.json();
        JSON.stringify(vragen);
        const con1 = [vragen[0], vragen[1], vragen[2], vragen[3]];
        const con2 = [vragen[4], vragen[5], vragen[6], vragen[7]];
        setConnectQuestions([
          { type: "connect", vragen: con1 },
          { type: "connect", vragen: con2 },
        ]);
        console.log(vragen);
      } else {
        console.log("Ophalen van connect vragen mislukt");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandom18();
    getRandom8();
  }, []);

  useEffect(() => {
    setQuestions([...connectQuestions, ...questionsStandaard]);
    console.log(questions);
  }, [questionsStandaard, connectQuestions]);

  if (!dataReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const openQuestion = () => {
    const question = questions[currentIndex];
    console.log(question);

    if (!question) {
      if (dataReady) {
        return (
          <Score correctAmount={correctAmount} mistakesAmount={mistakeAmount} />
        );
      }

      return null;
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
      {questions[currentIndex]?.type === "hangman" && (
        <View style={styles.heartContainer} pointerEvents="none">
          {Array.from({ length: heartsCount }).map((_, i) => (
            <Image
              key={i}
              source={HeartIcon}
              style={styles.heartIcon}
              resizeMode="contain"
            />
          ))}
        </View>
      )}
      {openQuestion()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative", marginTop: 35 },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 12,
  },
  loadingContainer: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },
  center: { flex: 1 },
  done: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  link: { color: "blue", textDecorationLine: "underline" },
  heartContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 10,
  },
  heartIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 4,
  },
});
