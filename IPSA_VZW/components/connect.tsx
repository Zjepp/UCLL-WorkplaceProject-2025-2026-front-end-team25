import React, { useEffect, useMemo, useState } from "react";
import { Antwoord, Vraag } from "@/types";
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
  mistakeAmount: number;
  mistakeAmountSetter: (amount: number) => void;
  correctAmount: number;
  correctAmountSetter: (amount: number) => void;
}

const QuizConnect: React.FC<ConnectProps> = ({
  onAnswerSelected,
  questiona,
  questionb,
  questionc,
  questiond,
  title,
  mistakeAmount,
  mistakeAmountSetter,
  correctAmount,
  correctAmountSetter,
}: ConnectProps) => {
  const questionData: {
    title: string;
    question1: Vraag;
    question2: Vraag;
    question3: Vraag;
    question4: Vraag;
    options: QuizOption[];
  } = {
    title: title,
    question1: questiona.vraag
      ? questiona
      : ({ vraag: "vraag niet beschikbaar" } as Vraag),
    question2: questionb.vraag
      ? questionb
      : ({ vraag: "vraag niet beschikbaar" } as Vraag),
    question3: questionc.vraag
      ? questionc
      : ({ vraag: "vraag niet beschikbaar" } as Vraag),
    question4: questiond.vraag
      ? questiond
      : ({ vraag: "vraag niet beschikbaar" } as Vraag),
    options: [
      {
        id: 1,
        formula:
          questiona.antwoorden?.[0].antwoord ?? "antwoord niet beschikbaar",
        color: "#28A0A0",
      },
      {
        id: 2,
        formula:
          questionb.antwoorden?.[0].antwoord ?? "antwoord niet beschikbaar",
        color: "#e8bf4fff",
      },
      {
        id: 3,
        formula:
          questionc.antwoorden?.[0].antwoord ?? "antwoord niet beschikbaar",
        color: "#FF4F21",
      },
      {
        id: 4,
        formula:
          questiond.antwoorden?.[0].antwoord ?? "antwoord niet beschikbaar",
        color: "#B196C7",
      },
    ],
  };

  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [connections, setConnection] = useState<
    Array<{ questionId: number; optionId: number; color: string }>
  >([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof questions>(
    []
  );
  const [shuffledOptions, setShuffledOptions] = useState<
    typeof questionData.options
  >([]);
  const [availableColors, setAvailableColors] = useState<string[]>([
    "#28A0A0",
    "#e8bf4fff",
    "#FF4F21",
    "#B196C7",
  ]);

  const questions = useMemo(
    () => [
      { id: 1, data: questionData.question1, color: "#28A0A0" },
      { id: 2, data: questionData.question2, color: "#e8bf4fff" },
      { id: 3, data: questionData.question3, color: "#FF4F21" },
      { id: 4, data: questionData.question4, color: "#B196C7" },
    ],
    [
      questionData.question1,
      questionData.question2,
      questionData.question3,
      questionData.question4,
    ]
  );

  const isQuestionConnected = (questionId: number) =>
    connections.some((c) => c.questionId === questionId);
  const isOptionConnected = (optionId: number) =>
    connections.some((c) => c.optionId === optionId);

  const handleQuestionSelect = (questionId: number) => {
    if (isQuestionConnected(questionId)) {
      const connection = connections.find((c) => c.questionId === questionId);
      if (connection) {
        setAvailableColors((prev) => [...prev, connection.color]);
        setConnection((prev) =>
          prev.filter((c) => c.questionId !== questionId)
        );
      }
    }
    setSelectedQuestion((prev) => (prev === questionId ? null : questionId));
  };

  const handleOptionSelect = (optionId: number) => {
    if (isOptionConnected(optionId)) return;

    setSelectedOption((prev) => (prev === optionId ? null : optionId));

    if (selectedQuestion !== null && availableColors.length > 0) {
      const color = availableColors[0];
      setAvailableColors((prev) => prev.slice(1));
      setConnection((prev) => [
        ...prev,
        { questionId: selectedQuestion, optionId, color },
      ]);
    }

    if (connections.length === 3) {
      const score = calculateScore();
      onAnswerSelected?.(true);
      correctAmountSetter?.(correctAmount + score);
      mistakeAmountSetter?.(mistakeAmount + (4 - score));
    }

    setSelectedQuestion(null);
    setSelectedOption(null);
  };

  const resetState = () => {
    setSelectedQuestion(null);
    setSelectedOption(null);
    setConnection([]);
  };

  const calculateScore = () => {
    let score = 0;
    connections.forEach(({ questionId, optionId }) => {
      const question = questions.find((q) => q.id === questionId);
      const option = questionData.options.find((o) => o.id === optionId);
      if (
        question?.data.antwoorden?.some(
          (a: Antwoord) => a.correct && a.antwoord === option?.formula
        )
      ) {
        score += 1;
      }
    });
    return score;
  };

  const shuffleArray = (array: any[]) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  useEffect(() => {
    resetState();
    const shuffledQuestions = shuffleArray(questions);
    const shuffledOptions = shuffleArray(questionData.options);
    setShuffledQuestions(shuffledQuestions);
    setShuffledOptions(shuffledOptions);
  }, [questiona, questionb, questionc, questiond]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{questionData.title}</Text>
      <Text style={styles.connectTitle}>
        Verbind de vraag met het juiste antwoord
      </Text>

      <View style={styles.container2}>
        <View style={styles.questionsAndAnswers}>
          {shuffledQuestions.map((question) => {
            const connection = connections.find(
              (c) => c.questionId === question.id
            );
            const backgroundColor =
              connection?.color ||
              (selectedQuestion === question.id ? question.color : "#a1a1a1ff");
            const selected = selectedQuestion === question.id;

            return (
              <Pressable
                key={question.id}
                style={[
                  styles.questionBox,
                  {
                    backgroundColor:
                      connection?.color ||
                      (selectedQuestion === question.id
                        ? question.color
                        : "#a1a1a1ff"),
                  },
                ]}
                onPress={() => handleQuestionSelect(question.id)}
              >
                <Text style={styles.question}>{question.data.vraag}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.questionsAndAnswers}>
          {shuffledOptions.map((option) => {
            const connection = connections.find(
              (c) => c.optionId === option.id
            );
            const backgroundColor =
              connection?.color ||
              (selectedOption === option.id ? option.color : "#a1a1a1ff");

            const selected = selectedOption === option.id;

            return (
              <Pressable
                key={option.id}
                style={[
                  styles.optionBox,
                  {
                    backgroundColor:
                      connection?.color ||
                      (selectedOption === option.id
                        ? option.color
                        : "#a1a1a1ff"),
                  },
                ]}
                onPress={() => handleOptionSelect(option.id)}
                >
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
    color: "#000000ff",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  questionsAndAnswers: {
    width: "37%",
    margin: 20,
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
    height: 140,
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
    height: 140,
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
