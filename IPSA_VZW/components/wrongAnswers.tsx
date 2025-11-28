import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const wrongAnswers = [
  { id: "1", question: "Vraag 1", answer: "Juiste antwoord was B" },
  { id: "2", question: "Vraag 3", answer: "Juiste antwoord was A" },
  { id: "3", question: "Vraag 7", answer: "Juiste antwoord was D" },
];

const WrongAnswers: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foute Antwoorden</Text>

      <FlatList
        data={wrongAnswers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LinearGradient
            colors={["#FFD285", "#CE9935"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.item}
          >
            <Text style={styles.itemQuestion}>{item.question}</Text>
            <Text style={styles.itemAnswer}>{item.answer}</Text>
          </LinearGradient>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      <Pressable onPress={() => router.back()}>
        <LinearGradient
          colors={["#A5BCBC", "#1CA0A0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Terug</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 20, alignItems: "center" },
  title: { fontSize: 28, marginVertical: 20, color: "#222" },
  item: {
    width: 320,
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: "flex-start",
  },
  itemQuestion: { fontSize: 18, fontWeight: "600", color: "#222" },
  itemAnswer: { fontSize: 16, color: "#333", marginTop: 6 },
  button: {
    width: 280,
    height: 60,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  buttonText: { color: "#FFF", fontSize: 20 },
});

export default WrongAnswers;