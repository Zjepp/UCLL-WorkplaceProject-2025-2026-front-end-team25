import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, View, Text, StyleSheet, ScrollView } from "react-native";
import { useWrongAnswers } from "./wrongAnswersList";

const WrongAnswers: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { wrongAnswers } = useWrongAnswers();

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Foute Antwoorden</Text>
        
        <ScrollView style={styles.scrollContainer}>
          {wrongAnswers.length === 0 ? (
            <Text style={styles.emptyText}>Geen foute antwoorden!</Text>
          ) : (
            wrongAnswers.map((item, index) => (
              <View key={item.id} style={styles.wrongItem}>
                <Text style={styles.wrongText}>
                  {index + 1}. {item.question}
                </Text>
                <Text style={styles.answerText}>
                  Jouw antwoord: {item.answer}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        <Pressable onPress={onClose}>
          <LinearGradient
            colors={["#FFD285", "#CE9935"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sluiten</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    elevation: 20,
  },
  modalContent: {
    width: 320,
    maxHeight: '80%',
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: "#FFF",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginBottom: 12,
  },
  scrollContainer: {
    width: '100%',
    maxHeight: 300,
  },
  emptyText: {
    color: "#666",
    textAlign: "center",
    fontSize: 16,
    marginVertical: 20,
  },
  wrongItem: {
    marginVertical: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  wrongText: {
    color: "#333",
    fontSize: 14,
    marginBottom: 4,
  },
  answerText: {
    color: "#666",
    fontSize: 12,
    fontStyle: "italic",
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "400",
  },
});

export default WrongAnswers;