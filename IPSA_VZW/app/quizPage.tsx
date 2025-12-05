import quizService from "@/services/quizService";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
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
  const { category } = useLocalSearchParams();
  const [questions, setQuestions] = useState<(Vraag | Connect)[]>([]);
  const [questionsStandaard, setStandaardQuestions] = useState<Vraag[]>([]);
  const [connectQuestions, setConnectQuestions] = useState<Connect[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakeAmount, setMistakeAmount] = useState(0);
  const [correctAmount, setCorrectAmount] = useState(0);
  const [heartsCount, setHeartsCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const dataReady =
    questionsStandaard.length > 0 ||
    connectQuestions.length > 0 ||
    questions.length > 0;

  const getRandom18 = async () => {
    try {
      let response;

      // If category is provided, use category endpoint
      if (category && typeof category === "string") {
        console.log("Fetching questions for category:", category);
        response = await quizService.getQuestionsByCategory(category);
      } else {
        // If no category, use the random endpoints
        console.log("Fetching random questions without category");
        const [response18, response8] = await Promise.all([
          quizService.get18Questions(),
          quizService.get8Questions(),
        ]);

        if (response18.status === 200 && response8.status === 200) {
          const vragen18: Vraag[] = await response18.json();
          const vragen8: Vraag[] = await response8.json();
          const vragen = [...vragen18, ...vragen8];

          console.log("Received questions:", vragen.length);

          // Shuffle the arrays before setting them
          setStandaardQuestions(shuffleArray(vragen18));

          // Group connect questions in sets of 4
          if (vragen8.length >= 4) {
            const shuffledConnect = shuffleArray(vragen8);
            const con1 = shuffledConnect.slice(0, 4);
            const con2 = shuffledConnect.slice(4, 8);
            const connects: Connect[] = [];
            if (con1.length === 4)
              connects.push({ type: "connect", vragen: con1 });
            if (con2.length === 4)
              connects.push({ type: "connect", vragen: con2 });
            setConnectQuestions(connects);
          }
          setLoading(false);
          return;
        } else {
          console.log(
            "Ophalen van vragen mislukt, status:",
            response18.status,
            response8.status
          );
          setError(
            `Kon geen vragen ophalen. Status: ${response18.status}, ${response8.status}`
          );
          setLoading(false);
          return;
        }
      }

      if (response.status === 200) {
        const vragen: Vraag[] = await response.json();
        console.log("Received questions:", vragen.length);

        if (vragen.length === 0) {
          console.log("No questions found for category:", category);
          setError(`Geen vragen gevonden voor categorie "${category}"`);
          setLoading(false);
          return;
        }

        // Filter out connect-choice questions for standaard questions
        const standaardVragen = vragen.filter(
          (v) => v.type !== "connect-choice"
        );
        const connectVragen = vragen.filter((v) => v.type === "connect-choice");

        // Shuffle the arrays before setting them
        
        setStandaardQuestions(shuffleArray(standaardVragen));

        // Group connect questions in sets of 4
        if (connectVragen.length >= 4) {
          const shuffledConnect = shuffleArray(connectVragen);
          const con1 = shuffledConnect.slice(0, 4);
          const con2 = shuffledConnect.slice(4, 8);
          const connects: Connect[] = [];
          if (con1.length === 4)
            connects.push({ type: "connect", vragen: con1 });
          if (con2.length === 4)
            connects.push({ type: "connect", vragen: con2 });
          setConnectQuestions(connects);
        }
      } else {
        console.log("Ophalen van vragen mislukt, status:", response.status);
        if (response.status === 401) {
          console.log("Authenticatie error - probeer opnieuw in te loggen");
          setError("Authenticatie verlopen. Log opnieuw in.");
        } else {
          setError(`Kon geen vragen ophalen. Status: ${response.status}`);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching questions:", error);
      setError(`Fout bij ophalen vragen: ${error}`);
      setLoading(false);
    }
  };

  const getRandom8 = async () => {
    // This function is now handled in getRandom18
    // Kept for compatibility but does nothing
  };

  useEffect(() => {
    setLoading(true);
    getRandom18();
  }, [category]);

  useEffect(() => {
    if (questionsStandaard.length > 0 || connectQuestions.length > 0) {
      // Shuffle the combined questions array as well
      const combined = [...connectQuestions, ...questionsStandaard];
      setQuestions(shuffleArray(combined));
      setLoading(false);
      console.log(
        "Total questions loaded:",
        connectQuestions.length + questionsStandaard.length
      );
    }
  }, [questionsStandaard, connectQuestions]);

  if (!dataReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const openQuestion = () => {
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#28A0A0" />
          <Text style={{ marginTop: 10 }}>Vragen laden...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text
            style={{
              fontSize: 18,
              color: "red",
              textAlign: "center",
              marginHorizontal: 20,
            }}
          >
            {error}
          </Text>
          <Text
            style={[styles.link, { marginTop: 20 }]}
            onPress={() => router.back()}
          >
            Terug
          </Text>
        </View>
      );
    }

    const question = questions[currentIndex];
    console.log("Current question:", question);

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

    // Fallback voor andere types
    return (
      <View style={styles.center}>
        <Text>Vraagtype '{question.type}' wordt nog niet ondersteund</Text>
        <Text style={styles.link} onPress={() => setCurrentIndex((i) => i + 1)}>
          Volgende vraag
        </Text>
      </View>
    );
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 12,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  done: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  link: { color: "blue", textDecorationLine: "underline" },
  heartContainer: {
    position: "absolute",
    top: 20,
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
