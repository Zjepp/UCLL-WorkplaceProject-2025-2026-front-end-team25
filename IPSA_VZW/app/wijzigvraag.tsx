import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const Wijzigvraag: React.FC = () => {
  const router = useRouter();

  // Formulier-states
  const [tijd, setTijd] = useState("");
  const [vraag, setVraag] = useState("");
  const [antwoord2, setAntwoord2] = useState("");
  const [antwoord3, setAntwoord3] = useState("");
  const [antwoord4, setAntwoord4] = useState("");

  return (
    /* === ACHTERGROND: 4 VERTICALE BLOKKEN === */
    <View style={styles.background}>
      <View style={[styles.band, { backgroundColor: "#1CA0A0" }]} />{" "}
      {/* Rood-oranje */}
      <View style={[styles.band, { backgroundColor: "#FFD285" }]} />{" "}
      {/* Turquoise */}
      <View style={[styles.band, { backgroundColor: "#A89BC7" }]} />{" "}
      {/* Blauw */}
      <View style={[styles.band, { backgroundColor: "#FF4928" }]} />{" "}
      {/* Groen */}
      /* === INHOUD BOVENOP DE ACHTERGROND === */
      <View style={styles.contentOverlay}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Bewerk vraag</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Tijd (seconden)</Text>
            <TextInput
              style={styles.input}
              value={tijd}
              onChangeText={setTijd}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Vraag</Text>
            <TextInput
              style={styles.input}
              value={vraag}
              onChangeText={setVraag}
              multiline
            />

            <Text style={styles.label}>Fout Antwoord 1</Text>
            <TextInput
              style={styles.input}
              value={antwoord2}
              onChangeText={setAntwoord2}
              multiline
            />

            <Text style={styles.label}>Fout Antwoord 2</Text>
            <TextInput
              style={styles.input}
              value={antwoord3}
              onChangeText={setAntwoord3}
              multiline
            />

            <Text style={styles.label}>Fout Antwoord 3</Text>
            <TextInput
              style={styles.input}
              value={antwoord4}
              onChangeText={setAntwoord4}
              multiline
            />

            <Pressable style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>Wijzig</Text>
            </Pressable>
          </ScrollView>
        </View>
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
    backgroundColor: "#FFD285",
    paddingVertical: 16,
    marginHorizontal: 40,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 40,
  },
  saveBtnText: { color: "#222", fontSize: 22, fontWeight: "600" },
});

export default Wijzigvraag;
