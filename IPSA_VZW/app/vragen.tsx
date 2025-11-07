import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import quizService from "@/services/quizService";
import { Vraag } from "../../types";

import { MaterialIcons } from "@expo/vector-icons";

const Vragen: React.FC = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Vraag[]>([]);

  const getVragen = async () => {
    try {
      const response = await quizService.getAll();
      if (response.status === 200) {
        const vragen: Vraag[] = await response.json();
        setQuestions(vragen);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVragen();
  }, []);

  // Kleuren om en om
  const rowColors = ["#A89BC7", "#6FA8DC"]; // paars → blauw

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vragen</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {questions.map((vraag, index) => {
          const backgroundColor = rowColors[index % 2]; // 0 → paars, 1 → blauw

          return (
            <View
              key={vraag.id}
              style={[styles.row, { backgroundColor }]} // dynamische achtergrond
            >
              <Text style={styles.vraag} numberOfLines={3}>
                {vraag.vraag}
              </Text>

              <View style={styles.iconRow}>
                {/* DELETE */}
                <Pressable
                  style={styles.iconButton1}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <MaterialIcons name="delete" size={30} color="#000000ff" />
                </Pressable>

                {/* EDIT */}
                <Pressable
                  style={styles.iconButton2}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <MaterialIcons name="edit" size={30} color="#000000" />
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

/* ==================== STYLES (exact zoals jij had) ==================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    paddingTop: 70,
    textAlign: "center",
    color: "#222",
    marginBottom: 50,
    fontWeight: "400",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    marginVertical: 10,
    borderRadius: 20,
  },
  vraag: {
    flex: 1,
    fontSize: 18,
    color: "#000000ff",
    marginRight: 12,
  },
  iconRow: {
    flexDirection: "row",
    gap: 16,
  },
  iconButton1: {
    backgroundColor: "#FF4928", // rood
    padding: 6,
    borderRadius: 9,
  },
  iconButton2: {
    backgroundColor: "#FFD285", // oranje
    padding: 6,
    borderRadius: 9,
  },
});

export default Vragen;
