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
      <View style={styles.container2}>
        <Pressable
          style={styles.nieuwButton}
          onPress={() => router.push("/nieuwevraag")}
        >
          <Text style={styles.nieuwButtonText}>Nieuw</Text>
        </Pressable>
      </View>

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
                  onPress={() => router.push("/wijzigvraag")}
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
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    paddingTop: 30,
    textAlign: "center",
    color: "#222",
    marginBottom: 30,
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
  vraag2: {
    fontSize: 24,
    color: "#000000ff",
    textAlign: "center",
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
  Button: {
    backgroundColor: "#FF4928", // rood
    padding: 6,
    width: "40%",
    height: "100%",
    borderRadius: 9,
    marginTop: 50,
    textAlign: "center",
  },
  iconButton2: {
    backgroundColor: "#FFD285", // oranje
    padding: 6,
    borderRadius: 9,
  },
  container2: {
    paddingHorizontal: 20,
    marginTop: 50,
    alignItems: "flex-end", // knop rechts uitgelijnd
  },

  nieuwButton: {
    backgroundColor: "#FF4928", // rood
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center", // belangrijk!
    justifyContent: "center", // belangrijk!
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  nieuwButtonText: {
    color: "#000000ff", // WITTE tekst
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
});

export default Vragen;
