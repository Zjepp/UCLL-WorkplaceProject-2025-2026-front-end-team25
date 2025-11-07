import React from "react";
import { Antwoord, Vraag } from "../../types";
import { Pressable, StyleSheet, View, Text } from "react-native";

interface QuizOption {
  id: number;
  formula: string;
  color: string;
}

interface ConnectProps {
  onAnswerSelected?: (selected: boolean) => void;
  title: string;
  questiona: Vraag;
  questionb: Vraag;
  questionc: Vraag;
  questiond: Vraag;
}

const QuizConnect: React.FC<ConnectProps> = ({
  onAnswerSelected,
  questiona,
  questionb,
  questionc,
  questiond,
  title,
}: ConnectProps) => {const questionData: {
    title: string;
    question1: Vraag;
    question2: Vraag;
    question3: Vraag;
    question4: Vraag;
    options: QuizOption[];
  } = {title: title, 
    question1: questiona.vraag ? questiona: ({ vraag: "vraag niet beschikbaar" } as Vraag),
    question2: questionb.vraag ? questionb: ({ vraag: "vraag niet beschikbaar" } as Vraag),
    question3: questionc.vraag ? questionc: ({ vraag: "vraag niet beschikbaar" } as Vraag),
    question4: questiond.vraag ? questiond: ({ vraag: "vraag niet beschikbaar" } as Vraag),
    
    options: [
      {
        id: 1,
        formula: questionb.antwoorden?.[0].antwoord ?? "antwoord niet beschikbaar",
        color: "#26A69Aff",
      },
      {
        id: 2,
        formula: questiond.antwoorden?.[0].antwoord ?? "antwoord niet beschikbaar",
        color: "#fdc961ff",
      },
      {
        id: 3,
        formula: questiona.antwoorden?.[0].antwoord ?? "antwoord niet beschikbaar",
        color: "#e64d32ff",
      },
      {
        id: 4,
        formula: questionc.antwoorden?.[0].antwoord ?? "antwoord niet beschikbaar",
        color: "#bd99d4ff",
      },
    ],
  };
  const handleSelect = (option: QuizOption) => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{questionData.title}</Text>
      <Text style={styles.connectTitle}>Verbind de vraag met het juiste antwoord</Text>
      
      <View style={styles.container2}>

        <View style={styles.questionsAndAnswers}>
            <Pressable style={[styles.questionBox, {backgroundColor: '#bd99d4ff'}]}>
                <Text style={styles.question}>{questionData.question1.vraag}</Text>
            </Pressable>
            <Pressable style={[styles.questionBox, {backgroundColor: '#e64d32ff'}]}>
                <Text style={styles.question}>{questionData.question2.vraag}</Text>
            </Pressable>
            <Pressable style={[styles.questionBox, {backgroundColor: '#fdc961ff'}]}>
                <Text style={styles.question}>{questionData.question3.vraag}</Text>
            </Pressable>
            <Pressable style={[styles.questionBox, {backgroundColor: '#26A69Aff'}]}>
                <Text style={styles.question}>{questionData.question4.vraag}</Text>
            </Pressable>
        </View>

        <View style={styles.questionsAndAnswers}>
          {questionData.options.map((option) => {
            return (
              <Pressable key={option.id} style={[styles.optionBox, {backgroundColor: option.color}]}>
                <Text style={styles.option}>{option.formula}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
  },
  container2: {
    flex: 2,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    color: "#000000ff",
    marginBottom: 10,
    textAlign: "right",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  connectTitle: {
    fontSize: 28,
    color: '#000000ff',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  questionsAndAnswers: {
    width: "32%",
    margin: 20
  },
  question: {
    fontSize: 18,
    color: "#000000ff",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  questionBox: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    height: 150
  },
  option: {
    fontSize: 18,
    color: "#000000ff",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  optionBox: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    height: 150
  },
});

export default QuizConnect;
