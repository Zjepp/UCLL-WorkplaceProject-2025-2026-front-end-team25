import React, { useState } from "react";
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
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import quizService from "@/services/quizService"; // jouw service
import { useRouter } from "expo-router";

const Nieuwevraag = () => {
  const [open, setOpen] = useState(false);
  const [vraagType, setVraagType] = useState<string | null>(null);
  const router = useRouter();

  const [items] = useState([
    { label: "Multiple Choice", value: "multiple_choice" },
    { label: "Memory", value: "memory" },
    { label: "Hangman", value: "hangman" },
    { label: "Connect", value: "connect" },
  ]);

  const [tijd, setTijd] = useState("");
  const [vraag, setVraag] = useState("");
  const [juistAntwoord, setJuistAntwoord] = useState(""); // voor hangman/connect + memory
  const [fout1, setFout1] = useState("");
  const [fout2, setFout2] = useState("");
  const [fout3, setFout3] = useState("");

  // Alleen cijfers
  const handleTijdChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, "");
    setTijd(numeric);
  };

  const saveVraag = async () => {
    if (!vraag || !vraagType) {
      Alert.alert("Fout", "Vraag en speltype zijn verplicht.");
      return;
    }

    // Tijd verplicht voor multiple_choice & memory
    if (vraagType === "memory" && !tijd) {
      Alert.alert("Fout", "Tijd is verplicht voor  Memory.");
      return;
    }

    let antwoorden: any[] = [];

    if (vraagType === "multiple_choice") {
      if (!juistAntwoord || !fout1 || !fout2 || !fout3) {
        Alert.alert("Fout", "Vul alle 4 antwoorden in voor Multiple Choice.");
        return;
      }
      antwoorden = [
        { correct: true, antwoord: juistAntwoord },
        { correct: false, antwoord: fout1 },
        { correct: false, antwoord: fout2 },
        { correct: false, antwoord: fout3 },
      ];
    }

    if (vraagType === "memory") {
      // Memory: 4 paren → 4 juiste antwoorden nodig
      if (!juistAntwoord || !fout1 || !fout2 || !fout3) {
        Alert.alert("Fout", "Vul alle 4 paren in voor Memory.");
        return;
      }
      antwoorden = [
        { correct: true, antwoord: juistAntwoord },
        { correct: false, antwoord: fout1 },
        { correct: false, antwoord: fout2 },
        { correct: false, antwoord: fout3 },
      ];
    }

    if (vraagType === "hangman" || vraagType === "connect") {
      if (!juistAntwoord) {
        Alert.alert("Fout", "Juist antwoord is verplicht.");
        return;
      }
      antwoorden = [{ correct: true, antwoord: juistAntwoord }];
    }

    const payload = {
      type: vraagType,
      vraag,
      tijd: tijd ? parseInt(tijd, 10) : undefined, // alleen meesturen als nodig
      antwoorden,
    };

    try {
      const response = await quizService.addQuestions(payload);
      if (!response.ok) throw new Error("Serverfout");

      // Reset alles
      setVraag("");
      setTijd("");
      setJuistAntwoord("");
      setFout1("");
      setFout2("");
      setFout3("");
      setVraagType(null);
      router.push("/vragen");
    } catch (err) {
      Alert.alert("Error", "Kon vraag niet opslaan.");
    }
  };

  const isMultipleChoice = vraagType === "multiple_choice";
  const isMemory = vraagType === "memory";
  const isHangmanOrConnect = vraagType === "hangman" || vraagType === "connect";
  const showTijd = isMemory;
  const showFouteAntwoorden = isMultipleChoice || isMemory;

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
              <Text style={styles.title}>Nieuwe Vraag</Text>

              {/* Speltype */}
              <Text style={styles.label}>Speltype</Text>
              <DropDownPicker
                open={open}
                value={vraagType}
                items={items}
                setOpen={setOpen}
                setValue={setVraagType}
                setItems={() => {}}
                placeholder="Kies een speltype..."
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropDownContainerStyle={styles.dropdownList}
              />

              {/* Vraag */}
              <Text style={styles.label}>Vraag</Text>
              <TextInput
                style={styles.input}
                value={vraag}
                onChangeText={setVraag}
                placeholder="Voer de vraag in..."
                multiline
              />

              {/* Juist Antwoord (altijd zichtbaar als er een type gekozen is) */}
              {vraagType && (
                <>
                  <Text style={styles.label}>{"Juist Antwoord"}</Text>
                  <TextInput
                    style={styles.input}
                    value={juistAntwoord}
                    onChangeText={setJuistAntwoord}
                    placeholder={
                      isMemory ? "Bijv. 'Hond'" : "Juist antwoord..."
                    }
                    multiline
                  />
                </>
              )}

              {/* Foute antwoorden / extra paren */}
              {showFouteAntwoorden && (
                <>
                  <Text style={styles.label}>{"Fout Antwoord 1"}</Text>
                  <TextInput
                    style={styles.input}
                    value={fout1}
                    onChangeText={setFout1}
                    multiline
                  />

                  <Text style={styles.label}>{"Fout Antwoord 2"}</Text>
                  <TextInput
                    style={styles.input}
                    value={fout2}
                    onChangeText={setFout2}
                    multiline
                  />

                  <Text style={styles.label}>{"Fout Antwoord 3"}</Text>
                  <TextInput
                    style={styles.input}
                    value={fout3}
                    onChangeText={setFout3}
                    multiline
                  />
                </>
              )}

              {/* Tijd – alleen bij multiple_choice en memory */}
              {showTijd && (
                <>
                  <Text style={styles.label}>Tijd (seconden)</Text>
                  <TextInput
                    style={styles.input}
                    value={tijd}
                    onChangeText={handleTijdChange}
                    keyboardType="number-pad"
                    placeholder="Bijv. 30"
                  />
                </>
              )}

              <View style={{ flexDirection: "row", gap: 20, marginTop: 30 }}>
                <Pressable
                  style={[styles.saveBtn, { backgroundColor: "#6c757d" }]}
                  onPress={() => router.push("/vragen")}
                >
                  <Text style={styles.saveBtnText}>Annuleren</Text>
                </Pressable>

                <Pressable style={styles.saveBtn} onPress={saveVraag}>
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
    backgroundColor: "#ffffffff",
    marginBottom: 24,
    textAlignVertical: "top",
  },
  dropdown: {
    borderWidth: 3,
    borderColor: "#1CA0A0",
    borderRadius: 20,
    backgroundColor: "#ffffffff",
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownText: { fontSize: 20, color: "#222" },
  dropdownList: {
    borderWidth: 3,
    borderColor: "#1CA0A0",
    borderRadius: 20,
    marginTop: 4,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#FFD285",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  saveBtnText: { color: "#222", fontSize: 20, fontWeight: "600" },
});

export default Nieuwevraag;
