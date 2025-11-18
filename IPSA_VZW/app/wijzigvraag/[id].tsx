// app/wijzigvraag.tsx   (of app/(tabs)/wijzigvraag.tsx – waar jij hem ook hebt staan)
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import quizService from "@/services/quizService";

type Antwoord = {
  id?: number;
  antwoord: string;
  correct: boolean;
};

const Wijzigvraag = () => {
  const { id } = useLocalSearchParams<{ id: string }>(); // ← dit werkt nu!
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [vraagType, setVraagType] = useState<string | null>(null);
  const [tijd, setTijd] = useState("");
  const [vraag, setVraag] = useState("");
  const [juistAntwoord, setJuistAntwoord] = useState("");
  const [fout1, setFout1] = useState("");
  const [fout2, setFout2] = useState("");
  const [fout3, setFout3] = useState("");

  const items = [
    { label: "Multiple Choice", value: "multiple_choice" },
    { label: "memory-choice", value: "memory-choice" },
    { label: "hangman", value: "hangman" },
    { label: "connect-choice", value: "connect-choice" },
  ];

  // Laad bestaande vraag
  useEffect(() => {
    const loadVraag = async () => {
      if (!id) {
        Alert.alert("Fout", "Geen ID gevonden");
        router.back();
        return;
      }

      try {
        const res = await quizService.getQuestionById(Number(id));

        const data = await res.json();
        console.log("Backend data:", data); // ← kijk hier even naar!

        setVraag(data.vraag || "");
        setTijd(data.tijd ? data.tijd.toString() : "");

        // Type mapping (jouw backend gebruikt andere namen)
        let mappedType = data.type;
        if (data.type === "standaard-choice") mappedType = "multiple_choice";
        else if (data.type === "memory-choice-game")
          mappedType = "memory-choice";
        else if (data.type === "hangman") mappedType = "hangman";
        else if (data.type === "connect-choice") mappedType = "connect-choice";

        setVraagType(mappedType);

        if (
          data.type === "standaard-choice" ||
          data.type === "memory-choice-game"
        ) {
          setJuistAntwoord(data.antwoorden[0].antwoord);
          setFout1(data.antwoorden[1].antwoord);
          setFout2(data.antwoorden[2].antwoord);
          setFout3(data.antwoorden[3].antwoord);
        } else if (data.type === "hangman" || data.type === "connect-choice") {
          setJuistAntwoord(data.antwoorden[0].antwoord);
        }
      } catch (err) {
        Alert.alert("Fout");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    loadVraag();
  }, [id]);

  const handleTijdChange = (text: string) => {
    setTijd(text.replace(/[^0-9]/g, ""));
  };

  const saveWijziging = async () => {
    if (!vraag || !vraagType) {
      Alert.alert("Fout", "Vul vraag en speltype in");
      return;
    }

    const needsTijd = vraagType === "memory-choice";
    if (needsTijd && !tijd) {
      Alert.alert(
        "Fout",
        "Tijd is verplicht voor Multiple Choice en memory-choice"
      );
      return;
    }

    let antwoorden: Antwoord[] = [];

    if (vraagType === "multiple_choice") {
      if (!juistAntwoord || !fout1 || !fout2 || !fout3) {
        Alert.alert("Fout", "Alle 4 antwoorden zijn verplicht");
        return;
      }
      antwoorden = [
        { correct: true, antwoord: juistAntwoord },
        { correct: false, antwoord: fout1 },
        { correct: false, antwoord: fout2 },
        { correct: false, antwoord: fout3 },
      ];
    } else if (vraagType === "memory-choice") {
      if (!juistAntwoord || !fout1 || !fout2 || !fout3) {
        Alert.alert("Fout", "Alle 4 antwoorden zijn verplicht");
        return;
      }
      antwoorden = [
        { correct: true, antwoord: juistAntwoord },
        { correct: true, antwoord: fout1 },
        { correct: true, antwoord: fout2 },
        { correct: true, antwoord: fout3 },
      ];
    } else if (vraagType === "hangman" || vraagType === "connect-choice") {
      if (!juistAntwoord) {
        Alert.alert("Fout", "Juist antwoord is verplicht");
        return;
      }
      antwoorden = [{ correct: true, antwoord: juistAntwoord }];
    }

    const payload = {
      id: Number(id),
      type: vraagType,
      vraag,
      tijd: tijd ? tijd : null,
      antwoorden,
    };

    try {
      const res = await quizService.updateQuestion(payload);
      if (!res.ok) throw new Error();

      Alert.alert("Succes", "Vraag gewijzigd!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert("Fout", "Kon niet opslaan");
    }
  };

  const showTijd = vraagType === "memory-choice";
  const showExtraAntwoorden =
    vraagType === "multiple_choice" || vraagType === "memory-choice";

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#1CA0A0" />
        <Text style={{ marginTop: 16, fontSize: 18 }}>Laden...</Text>
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <View style={[styles.band, { backgroundColor: "#1CA0A0" }]} />
      <View style={[styles.band, { backgroundColor: "#FFD285" }]} />
      <View style={[styles.band, { backgroundColor: "#A89BC7" }]} />
      <View style={[styles.band, { backgroundColor: "#FF4928" }]} />

      <View style={styles.contentOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          >
            <View style={styles.innerContainer}>
              <Text style={styles.title}>Vraag Wijzigen</Text>

              <Text style={styles.label}>Speltype : {vraagType}</Text>

              <Text style={styles.label}>Vraag</Text>
              <TextInput
                style={styles.input}
                value={vraag}
                onChangeText={setVraag}
                multiline
              />

              {vraagType && (
                <>
                  <Text style={styles.label}>Juist antwoord</Text>
                  <TextInput
                    style={styles.input}
                    value={juistAntwoord}
                    onChangeText={setJuistAntwoord}
                    multiline
                  />
                </>
              )}

              {showExtraAntwoorden && (
                <>
                  <Text style={styles.label}>{"Fout antwoord 1"}</Text>
                  <TextInput
                    style={styles.input}
                    value={fout1}
                    onChangeText={setFout1}
                    multiline
                  />

                  <Text style={styles.label}>{"Fout antwoord 2"}</Text>
                  <TextInput
                    style={styles.input}
                    value={fout2}
                    onChangeText={setFout2}
                    multiline
                  />

                  <Text style={styles.label}>{"Fout antwoord 3"}</Text>
                  <TextInput
                    style={styles.input}
                    value={fout3}
                    onChangeText={setFout3}
                    multiline
                  />
                </>
              )}

              {showTijd && (
                <>
                  <Text style={styles.label}>Tijd (seconden)</Text>
                  <TextInput
                    style={styles.input}
                    value={tijd}
                    onChangeText={handleTijdChange}
                    keyboardType="number-pad"
                  />
                </>
              )}

              <View style={{ flexDirection: "row", gap: 20, marginTop: 30 }}>
                <Pressable
                  style={[styles.saveBtn, { backgroundColor: "#6c757d" }]}
                  onPress={() => router.back()}
                >
                  <Text style={styles.saveBtnText}>Annuleren</Text>
                </Pressable>

                <Pressable style={styles.saveBtn} onPress={saveWijziging}>
                  <Text style={styles.saveBtnText}>Opslaan</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: { ...StyleSheet.absoluteFillObject, flexDirection: "row" },
  band: { flex: 1 },
  contentOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  innerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    padding: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#222",
    marginBottom: 30,
    fontWeight: "400",
  },
  label: { fontSize: 20, color: "#222", marginBottom: 8, fontWeight: "600" },
  input: {
    borderWidth: 3,
    borderColor: "#1CA0A0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 20,
    backgroundColor: "#fff",
    marginBottom: 24,
    textAlignVertical: "top",
  },
  dropdown: {
    borderWidth: 3,
    borderColor: "#1CA0A0",
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownText: { fontSize: 20, color: "#222" },
  dropdownList: { borderWidth: 3, borderColor: "#1CA0A0", borderRadius: 20 },
  saveBtn: {
    flex: 1,
    backgroundColor: "#FFD285",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  saveBtnText: { color: "#222", fontSize: 20, fontWeight: "600" },
});

export default Wijzigvraag;
