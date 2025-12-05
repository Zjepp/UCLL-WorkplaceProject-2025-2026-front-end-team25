import React, { useEffect, useMemo, useState } from "react";
import { Antwoord, Vraag } from "@/types";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { addWrongAnswer } from "@/components/wrongItemStore";


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
  }) => {
    const questionData = {
      title,
      question1: questiona.vraag ? questiona : ({ vraag: "vraag niet beschikbaar" } as Vraag),
      question2: questionb.vraag ? questionb : ({ vraag: "vraag niet beschikbaar" } as Vraag),
      question3: questionc.vraag ? questionc : ({ vraag: "vraag niet beschikbaar" } as Vraag),
      question4: questiond.vraag ? questiond : ({ vraag: "vraag niet beschikbaar" } as Vraag),
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
    const correctMap: Record<number, number> = {
      1: 3,
      2: 1,
      3: 4,
      4: 2,
    };

  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [connections, setConnection] = useState<Array<{questionId: number, optionId: number}>>([]);

  const questions = useMemo(() => [
    { id: 1, data: questionData.question1, color: '#bd99d4ff' },
    { id: 2, data: questionData.question2, color: '#e64d32ff'},
    { id: 3, data: questionData.question3, color: '#fdc961ff' },	
    { id: 4, data: questionData.question4, color: '#26A69Aff' },
  ], [questionData.question1, questionData.question2, questionData.question3, questionData.question4]);

  const isQuestionConnected = (questionId: number) => connections.some((c) => c.questionId === questionId);
  const isOptionConnected = (optionId: number) => connections.some((c) => c.optionId === optionId);

  const handleQuestionSelect = (questionId: number) => {
    if (isQuestionConnected(questionId)) return;

    setSelectedQuestion((oud) => (oud === questionId ? null : questionId));
  };

  const handleOptionSelect = (optionId: number) => {
    if (isOptionConnected(optionId)) return;

    if (selectedQuestion !== null) {
      setConnection((oud) => [...oud, { questionId: selectedQuestion, optionId: optionId }]);
      setSelectedQuestion(null);
      setSelectedOption(null);
    } else {
      setSelectedOption((oud) => oud === optionId ? null : optionId);
    }
  };

  useEffect(() => {
    if (connections.length === 4) {
      connections.forEach((pair) => {
        const correctOption = correctMap[pair.questionId];

        if (pair.optionId !== correctOption) {
          const questionObj = questions.find(q => q.id === pair.questionId)?.data;
          const wrongOption = questionData.options.find(o => o.id === pair.optionId);

          // ✅ Veiligheidscontrole toegevoegd
          if (questionObj && wrongOption) {
            addWrongAnswer({
              question: questionObj,
              userAnswer: wrongOption.formula,
            });
          }
        }
      });
      console.log(connections);
      onAnswerSelected?.(true);
    }
  }, [connections, correctMap, questions, questionData.options, onAnswerSelected]);

  useEffect(() => {
    setSelectedQuestion(null);
    setSelectedOption(null);
    setConnection([]);
  }, [questiona, questionb, questionc, questiond]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{questionData.title}</Text>
      <Text style={styles.connectTitle}>Verbind de vraag met het juiste antwoord</Text>
      
      <View style={styles.container2}>
        <View style={styles.questionsAndAnswers}>
          {questions.map((question) => {
            const connected = isQuestionConnected(question.id);
            const selected = (selectedQuestion === question.id);
            return (
              <Pressable
                key={question.id}
                style={[
                  styles.questionBox, 
                  { backgroundColor: question.color },
                  connected ? styles.connected : {},
                  selected ? styles.selected : {},
                ]} 
                  onPress={() => handleQuestionSelect(question.id)}>
                  <Text style={styles.question}>{question.data.vraag}</Text>
              </Pressable>
            )})}
        </View>

        <View style={styles.questionsAndAnswers}>
          {questionData.options.map((option) => {
            const connected = isOptionConnected(option.id)
            const selected = (selectedOption === option.id)
            return (
              <Pressable 
                key={option.id} 
                style={[
                  styles.optionBox, 
                  { backgroundColor: option.color },
                  connected ? styles.connected : {},
                  selected ? styles.selected : {},
                  ]} 
                  onPress={() => handleOptionSelect(option.id)}>
                <Text style={styles.option}>{option.formula}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      {/* <View>
        <Pressable>
            <Text style={styles.verzend}>Verzend</Text>
        </Pressable>
      </View> */}
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
    height: 140
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
    height: 140
  },
  selected: {
    borderWidth: 3,
    borderColor: "#000000",
  },
  connected: {
    opacity: 0.5,
  },
  // verzend: {
  //   fontSize: 28,
  //   textAlign: 'center',
  //   width: '40%',
  //   height: 40,
  //   marginBottom: 50,
  //   marginLeft: 130,
  //   borderRadius: 20,
  //   backgroundColor: '#797979ff'
  // }
});

export default QuizConnect;
