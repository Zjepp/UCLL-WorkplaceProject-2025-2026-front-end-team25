import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Vraag } from "@/types";

interface WrongAnswersProps {
  question: Vraag;
  userAnswer: string;
}

const WrongAnswers: React.FC<WrongAnswersProps> = ({ question, userAnswer }) => {
  const correctAnswer = question.antwoorden?.find(a => a.correct)?.antwoord || "Onbekend";

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.vraag}</Text>
      
      <View style={styles.answerSection}>
        <Text style={styles.label}>Jouw antwoord:</Text>
        <Text style={[styles.answerText, styles.wrongAnswers]}>{userAnswer}</Text>
      </View>

      <View style={styles.answerSection}>
        <Text style={styles.label}>Juist antwoord:</Text>
        <Text style={[styles.answerText, styles.correctAnswer]}>{correctAnswer}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#FF4928",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 12,
  },
  answerSection: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  answerText: {
    fontSize: 14,
    marginTop: 4,
    padding: 8,
    borderRadius: 4,
  },
  wrongAnswers: {
    backgroundColor: "#FFE5E0",
    color: "#A91E00",
  },
  correctAnswer: {
    backgroundColor: "#D4EDDA",
    color: "#155724",
  },
});

export default WrongAnswers;