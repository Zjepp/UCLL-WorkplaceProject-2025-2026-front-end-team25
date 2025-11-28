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

import { MaterialIcons } from "@expo/vector-icons";
import { Antwoord } from "@/types";

// Je type (pas aan als nodig)
type Vraag = {
  id: number;
  vraag: string;
  type: string;
  antwoorden?: Antwoord[];
};

const Vragen: React.FC = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Vraag[]>([]);

  const getVragen = async () => {
    try {
      const response = await quizService.getAll();
      if (response.ok) {
        const data: Vraag[] = await response.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error("Fout bij ophalen vragen:", error);
    }
  };

  // CORRECTE delete functie
  const deleteVraag = async (id: number) => {
    Alert.alert(
      "Verwijderen",
      "Ben je zeker dat je deze vraag wilt verwijderen?",
      [
        { text: "Annuleren", style: "cancel" },
        {
          text: "Verwijderen",
          style: "destructive",
          onPress: async () => {
            try {
              // 1. Optimistic update → direct uit UI halen
              setQuestions((prev) => prev.filter((q) => q.id !== id));

              // 2. Verzoek naar backend
              const response = await quizService.deleteQuestions(id);

              if (!response.ok) {
                // Mislukt → terugzetten in lijst
                Alert.alert("Fout", "Kon vraag niet verwijderen.");
                getVragen(); // herlaad alles
              }
            } catch (error) {
              console.error("Delete error:", error);
              Alert.alert("Fout", "Er ging iets mis.");
              getVragen(); // herlaad als backup
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    getVragen();
  }, []);

  const rowColors = ["#A89BC7", "#6FA8DC"];

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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Vragen</Text>
        {questions.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 50, fontSize: 18 }}>
            Nog geen vragen...
          </Text>
        ) : (
          questions.map((vraag, index) => {
            const backgroundColor = rowColors[index % 2];

            return (
              <View key={vraag.id} style={[styles.row, { backgroundColor }]}>
                <Text style={styles.vraag} numberOfLines={3}>
                  {vraag.vraag}
                </Text>

                <View style={styles.iconRow}>
                  {/* DELETE – nu correct aangeroepen */}
                  <Pressable
                    style={styles.iconButton1}
                    hitSlop={20}
                    onPress={() => deleteVraag(vraag.id)} // ← hier was de fout!
                  >
                    <MaterialIcons name="delete" size={30} color="#000000ff" />
                  </Pressable>

                  {/* EDIT */}
                  <Pressable
                    style={styles.iconButton2}
                    hitSlop={20}
                    onPress={() =>
                      router.push({
                        pathname: "/wijzigvraag/[id]",
                        params: { id: vraag.id.toString() },
                      })
                    }
                  >
                    <MaterialIcons name="edit" size={30} color="#000000" />
                  </Pressable>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#222",
    marginBottom: 30,
    fontWeight: "400",
  },
  scrollContent: {
    paddingBottom: 250,
    flexGrow: 1,
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
    backgroundColor: "#FFD285", // rood
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
    backgroundColor: "#FFD285", // rood
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 30,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center", // belangrijk!
    justifyContent: "center", // belangrijk!
  },

  nieuwButtonText: {
    color: "#000000ff", // WITTE tekst
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
});

export default Vragen;
