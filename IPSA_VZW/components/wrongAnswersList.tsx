import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import WrongAnswer from "./wrongAnswers";
import { Vraag } from "@/types";
import { WrongItem } from "@/components/wrongItemStore";
import WrongAnswers from "./wrongAnswers";

interface Props {
  visible: boolean;
  wrongAnswers: WrongItem[];
  onClose: () => void;
}

const WrongAnswersList: React.FC<Props> = ({ visible, wrongAnswers, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Foute Antwoorden</Text>
          <Pressable onPress={onClose} style={styles.close}>
            <MaterialIcons name="close" size={28} color="#fff" />
          </Pressable>
        </View>

        {wrongAnswers.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Geen foute antwoorden</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.list}>
            {wrongAnswers.map((w, i) => (
              <View key={i} style={styles.item}>
                <Text style={styles.index}>Vraag {i + 1}</Text>
                <WrongAnswers question={w.question} userAnswer={w.userAnswer} />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    backgroundColor: "#FF4928",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  closeButton: {
    padding: 5,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 15,
    paddingBottom: 30,
  },
  itemNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
  },
  close: {
    padding: 6
  },
  list: { padding: 16, paddingBottom: 40 },
  item: { marginBottom: 12 },
  index: { color: "#666", fontWeight: "600", marginBottom: 6 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default WrongAnswersList;