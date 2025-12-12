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
import faqService from "@/services/faqService";
import { nieuweFaqStyles as styles } from "@/style/page.styles";

const NieuweFaq = () => {
  const router = useRouter();
  const [faq, setFaq] = useState("");
  const [antwoord, setAntwoord] = useState(""); // voor hangman/connect + memory

  const saveFaq = async () => {
    if (!faq || !antwoord) {
      Alert.alert("Fout", "vraag en antwoord zijn verplicht.");
      return;
    }

    const payload = {
      question: faq,
      answer: antwoord,
    };

    try {
      const response = await faqService.addQuestions(payload);
      if (!response.ok) throw new Error("Serverfout");

      // Reset alles
      setFaq("");
      setAntwoord("");
      router.push("/faqovervieuw");
    } catch (err) {
      Alert.alert("Error", "Kon faq niet opslaan.");
    }
  };

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
              <Text style={styles.title}>Nieuwe faq</Text>

              <Text style={styles.label}>Vraag</Text>
              <TextInput
                style={styles.input}
                value={faq}
                onChangeText={setFaq}
                placeholder="Voer de vraag in..."
                multiline
              />

              <Text style={styles.label}>Antwoord</Text>
              <TextInput
                style={styles.input}
                value={antwoord}
                onChangeText={setAntwoord}
                placeholder="Voer het antwoord in..."
                multiline
              />

              <View style={{ flexDirection: "row", gap: 20, marginTop: 30 }}>
                <Pressable
                  style={[styles.saveBtn, { backgroundColor: "#6c757d" }]}
                  onPress={() => router.push("/faqovervieuw")}
                >
                  <Text style={styles.saveBtnText}>Annuleren</Text>
                </Pressable>

                <Pressable style={styles.saveBtn} onPress={saveFaq}>
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

// const styles = StyleSheet.create({
//   background: { ...StyleSheet.absoluteFillObject, flexDirection: "row" },
//   band: { flex: 1 },
//   contentOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "center",
//     paddingHorizontal: 40,
//     paddingVertical: 40,
//   },
//   innerContainer: {
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     borderRadius: 24,
//     padding: 24,
//     paddingTop: 32,
//   },
//   title: {
//     fontSize: 30,
//     textAlign: "center",
//     color: "#222",
//     marginBottom: 30,
//     fontWeight: "400",
//   },
//   label: { fontSize: 20, color: "#222", marginBottom: 8, fontWeight: "600" },
//   input: {
//     borderWidth: 3,
//     borderColor: "#1CA0A0",
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     fontSize: 20,
//     backgroundColor: "#ffffffff",
//     marginBottom: 24,
//     textAlignVertical: "top",
//   },
//   dropdown: {
//     borderWidth: 3,
//     borderColor: "#1CA0A0",
//     borderRadius: 20,
//     backgroundColor: "#ffffffff",
//     marginBottom: 24,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//   },
//   dropdownText: { fontSize: 20, color: "#222" },
//   dropdownList: {
//     borderWidth: 3,
//     borderColor: "#1CA0A0",
//     borderRadius: 20,
//     marginTop: 4,
//   },
//   saveBtn: {
//     flex: 1,
//     backgroundColor: "#FFD285",
//     paddingVertical: 16,
//     borderRadius: 20,
//     alignItems: "center",
//   },
//   saveBtnText: { color: "#222", fontSize: 20, fontWeight: "600" },
// });

export default NieuweFaq;
