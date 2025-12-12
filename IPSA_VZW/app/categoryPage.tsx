import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import { LoginUserResponse } from "@/types";
import { isTokenExpired } from "@/utils/tokenUtils";
import { categoryPageStyles as styles } from "@/style/page.styles";

export default function CategoryPage() {
  const router = useRouter();

  const categories = [
    { name: "Cardiovasculair", color: "#28A0A0" },
    { name: "Gastro-intestinaal", color: "#e8bf4fff" },
    { name: "Respiratoir stelsel", color: "#E73E07" },
    { name: "Hormonaal stelsel", color: "#B196C7" },
    { name: "Pijn", color: "#e8bf4fff" },
    { name: "Centraal zenuwstelsel", color: "#28A0A0" },
    { name: "Infecties & immuniteit", color: "#B196C7" },
    { name: "Uro-genitaal stelsel", color: "#E73E07" },
    { name: "Osteo-articulaire aandoeningen", color: "#28A0A0" },
    { name: "Kanker", color: "#e8bf4fff" },
    { name: "Dermatologie", color: "#E73E07" },
    { name: "Oftalmologie", color: "#B196C7" },
    { name: "Toxicomanie", color: "#e8bf4fff" },
    { name: "Mentaal welzijn", color: "#28A0A0" },
    { name: "Veterinair", color: "#B196C7" },
    { name: "Gezonde levensstijl", color: "#E73E07" },
    { name: "Geriatrische patiënt", color: "#28A0A0" },
    { name: "Pediatrische patiënt", color: "#e8bf4fff" },
    { name: "Zwangerschap & borstvoeding", color: "#E73E07" },
    { name: "Fytotherapeutica", color: "#B196C7" },
    { name: "Vaccinatie", color: "#28A0A0" },
    { name: "Medicatienazicht", color: "#e8bf4fff" },
    { name: "Medische materialen", color: "#E73E07" },
    { name: "Magistrale bereidingen", color: "#B196C7" },
    { name: "Actua", color: "#e8bf4fff" },
    { name: "Communicatie", color: "#28A0A0" },
    { name: "GGG: Goed geneesmiddelengebruik", color: "#B196C7" },
  ];

  const handleCategoryPress = async (category: string) => {
    const userValue = await AsyncStorage.getItem("loggedInUser");
    if (!userValue) {
      router.push("/" as any);
      return;
    }
    const user: LoginUserResponse = JSON.parse(userValue);
    if (!user?.token || isTokenExpired(user.token)) {
      await AsyncStorage.removeItem("loggedInUser");
      router.push("/" as any);
      return;
    }
    // Navigate to quiz page with selected category
    router.push({
      pathname: "/quizPage",
      params: { category },
    } as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Terug</Text>
        </Pressable>
        <Text style={styles.title}>Categorie</Text>
      </View>

      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.categoryButton, { backgroundColor: item.color }]}
            onPress={() => handleCategoryPress(item.name)}
          >
            <Text style={styles.categoryText}>{item.name}</Text>
          </Pressable>
        )}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     paddingTop: 60,
//     paddingHorizontal: 20,
//   },
//   header: {
//     marginBottom: 20,
//   },
//   backButton: {
//     alignSelf: "flex-start",
//     marginBottom: 10,
//     backgroundColor: "#FF4F21",
//     marginTop: 7,
//     borderRadius: 7,
//     paddingVertical: 2,
//     paddingHorizontal: 7,
//   },
//   backButtonText: {
//     fontSize: 20,
//     color: "#ffffffff",
//     fontWeight: "500",
//   },
//   title: {
//     fontSize: 42,
//     fontWeight: "400",
//     textAlign: "center",
//     color: "#000000",
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
//   row: {
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   categoryButton: {
//     width: "47%",
//     aspectRatio: 1,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   categoryText: {
//     fontSize: 20,
//     color: "#ffffffff",
//     fontWeight: "400",
//     textAlign: "center",
//     paddingHorizontal: 8,
//   },
// });
