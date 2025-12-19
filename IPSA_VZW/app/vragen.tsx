import React, { useEffect, useState } from "react";
import { Platform } from "react-native"; // <-- voeg dit toe bovenaan

import * as DocumentPicker from "expo-document-picker"; // ← nieuw
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

  const handleCsvUpload = async () => {
    try {
      let fileUri: string;
      let fileName: string;
      let fileType: string;

      if (Platform.OS === "web") {
        // Web: gebruik browser file input
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".csv,text/csv,text/plain";

        input.onchange = (e: any) => {
          const file = e.target.files[0];
          if (!file) return;

          fileUri = URL.createObjectURL(file); // niet echt nodig, maar voor consistentie
          fileName = file.name;
          fileType = file.type || "text/csv";

          // Roep upload aan
          uploadAndRefresh(file, fileName, fileType);
        };

        input.click();
        return; // wacht op user selectie
      } else {
        // Native (Android/iOS): gebruik expo-document-picker
        const result = await DocumentPicker.getDocumentAsync({
          type: ["text/csv", "application/csv", "text/plain"],
          copyToCacheDirectory: true,
          multiple: false,
        });

        if (result.canceled) {
          console.log("Gebruiker annuleerde");
          return;
        }

        const file = result.assets[0];
        fileUri = file.uri;
        fileName = file.name;
        fileType = file.mimeType ?? "text/csv";

        // Roep upload aan
        await uploadAndRefresh(
          { uri: fileUri, name: fileName, type: fileType } as any,
          fileName,
          fileType
        );
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      Alert.alert("Fout", err.message || "Upload mislukt");
    }
  };

  // Helper functie om te uploaden en lijst te verversen
  const uploadAndRefresh = async (
    fileObject: any,
    name: string,
    mimeType: string
  ) => {
    const responseText = await quizService.uploadCsvForWeb(fileObject); // nieuwe functie, zie hieronder

    Alert.alert("Succes", responseText || "Gebruikers toegevoegd!");
    getVragen();
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Pressable style={styles.terugButton} onPress={() => router.push("/")}>
          <Text style={styles.terugButtonText}>Terug</Text>
        </Pressable>

        <Pressable style={styles.nieuwButton2} onPress={handleCsvUpload}>
          <Text style={styles.nieuwButtonText}>Nieuw (CSV)</Text>
        </Pressable>

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
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  terugButton: {
    backgroundColor: "#E73E07",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 30,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  terugButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },

  nieuwButton: {
    backgroundColor: "#FFD285", // rood
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 30,
    borderRadius: 12,
    alignItems: "center", // belangrijk!
    justifyContent: "center", // belangrijk!
  },

  nieuwButton2: {
    backgroundColor: "#A89BC7", // rood
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 30,
    borderRadius: 12,
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
