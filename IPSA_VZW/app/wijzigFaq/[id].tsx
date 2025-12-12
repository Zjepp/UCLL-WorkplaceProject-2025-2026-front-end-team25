useState; // app/wijzigFaq.tsx   (of app/(tabs)/wijzigFaq.tsx – waar jij hem ook hebt staan)
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
import faqService from "@/services/faqService";
import { wijzigVraagStyles as styles } from "@/style/page.styles";

type Antwoord = {
  id?: number;
  antwoord: string;
  correct: boolean;
};

const WijzigFaq = () => {
  const { id } = useLocalSearchParams<{ id: string }>(); // ← dit werkt nu!
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [faq, setFaq] = useState("");
  const [antwoord, setAntwoord] = useState("");

  // Laad bestaande faq
  useEffect(() => {
    const loadFaq = async () => {
      if (!id) {
        Alert.alert("Fout", "Geen ID gevonden");
        router.push("/faqovervieuw");
        return;
      }

      try {
        const res = await faqService.getFaqById(Number(id));

        const data = await res.json();
        console.log("Backend data:", data); // ← kijk hier even naar!

        setFaq(data.answer || "");
        setAntwoord(data.question || "");
      } catch (err) {
        Alert.alert("Fout");
        router.push("/faqovervieuw");
      } finally {
        setLoading(false);
      }
    };

    loadFaq();
  }, [id]);

  const saveWijziging = async () => {
    if (!faq || !antwoord) {
      Alert.alert("Fout", "Vul vraag en antwoord in");
      return;
    }

    const payload = {
      id: Number(id),
      question: faq,
      answer: antwoord,
    };

    try {
      const res = await faqService.updateFaq(payload);
      if (!res.ok) throw new Error();

      router.push("/faqovervieuw");
    } catch {
      Alert.alert("Fout", "Kon niet opslaan");
    }
  };

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
              <Text style={styles.title}>faq Wijzigen</Text>

              <Text style={styles.label}>Vraag</Text>
              <TextInput
                style={styles.input}
                value={faq}
                onChangeText={setFaq}
                multiline
              />

              <Text style={styles.label}>Antwoord</Text>
              <TextInput
                style={styles.input}
                value={antwoord}
                onChangeText={setAntwoord}
                multiline
              />

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
//     backgroundColor: "#fff",
//     marginBottom: 24,
//     textAlignVertical: "top",
//   },
//   dropdown: {
//     borderWidth: 3,
//     borderColor: "#1CA0A0",
//     borderRadius: 20,
//     backgroundColor: "#f8f9fa",
//     marginBottom: 24,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//   },
//   dropdownText: { fontSize: 20, color: "#222" },
//   dropdownList: { borderWidth: 3, borderColor: "#1CA0A0", borderRadius: 20 },
//   saveBtn: {
//     flex: 1,
//     backgroundColor: "#FFD285",
//     paddingVertical: 16,
//     borderRadius: 20,
//     alignItems: "center",
//   },
//   saveBtnText: { color: "#222", fontSize: 20, fontWeight: "600" },
// });

export default WijzigFaq;
