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
import { useRouter } from "expo-router";
import categoryService from "@/services/categoryService";

const NieuweCategorie = () => {
  const router = useRouter();
  const [categorie, setCategorie] = useState("");

  const saveCategorie = async () => {
    // Field validation
    if (!categorie || categorie.trim().length === 0) {
      console.log("[NieuweCategorie] Validation error: empty category name");
      Alert.alert("Fout", "Categorie naam is verplicht.");
      return;
    }

    if (categorie.trim().length < 2) {
      console.log("[NieuweCategorie] Validation error: category name too short");
      Alert.alert("Fout", "Categorie naam moet minimaal 2 karakters bevatten.");
      return;
    }

    if (categorie.trim().length > 50) {
      console.log("[NieuweCategorie] Validation error: category name too long");
      Alert.alert("Fout", "Categorie naam mag niet langer zijn dan 50 karakters.");
      return;
    }

    const payload = {
      name: categorie.trim(),
    };

    console.log("[NieuweCategorie] Attempting to create category:", payload);

    try {
      const response = await categoryService.createCategory(payload);
      
      // Role validation - backend returns 403 if user doesn't have ADMIN role
      if (response.status === 403) {
        console.error("[NieuweCategorie] Authorization error: User is not admin");
        Alert.alert("Geen toegang", "Je hebt geen rechten om een categorie aan te maken. Alleen admins kunnen categorieën aanmaken.");
        return;
      }

      if (response.status === 400) {
        const errorText = await response.text();
        console.error("[NieuweCategorie] Validation error from backend:", errorText);
        Alert.alert("Fout", errorText || "Categorie bestaat al of is ongeldig.");
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[NieuweCategorie] Server error:", response.status, errorText);
        Alert.alert("Server Fout", `Er is iets misgegaan (Status: ${response.status}). Probeer het later opnieuw.`);
        return;
      }

      // Success - reset and navigate back
      console.log("[NieuweCategorie] Category created successfully");
      setCategorie("");
      Alert.alert("Succes", "Categorie succesvol aangemaakt!", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (err) {
      console.error("[NieuweCategorie] Network/Unknown error:", err);
      Alert.alert("Netwerkfout", "Kon geen verbinding maken met de server. Controleer je internetverbinding en probeer het opnieuw.");
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
              <Text style={styles.title}>Maak Categorie</Text>

              <Text style={styles.label}>Categorie</Text>
              <TextInput
                style={styles.input}
                value={categorie}
                onChangeText={setCategorie}
                placeholder="Voer de categorie naam in..."
                maxLength={50}
              />

              <View style={{ flexDirection: "row", gap: 20, marginTop: 30 }}>
                <Pressable
                  style={[styles.saveBtn, { backgroundColor: "#6c757d" }]}
                  onPress={() => router.back()}
                >
                  <Text style={styles.saveBtnText}>Annuleren</Text>
                </Pressable>

                <Pressable style={styles.saveBtn} onPress={saveCategorie}>
                  <Text style={styles.saveBtnText}>Maak Aan</Text>
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
  saveBtn: {
    flex: 1,
    backgroundColor: "#FFD285",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveBtnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
});

export default NieuweCategorie;
