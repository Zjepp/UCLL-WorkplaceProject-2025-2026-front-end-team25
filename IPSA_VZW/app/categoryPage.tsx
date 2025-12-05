import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { LoginUserResponse } from "@/types";
import { isTokenExpired } from "@/utils/tokenUtils";

export default function CategoryPage() {
  const router = useRouter();

  const categories = [
    { name: "Bloedruk", color: "#28A0A0" },
    { name: "Autisme", color: "#FED57A" },
    { name: "Verkoudheid", color: "#E73E07" },
    { name: "Griep", color: "#B196C7" },
    { name: "Spasmes", color: "#28A0A0" },
    { name: "Kofie", color: "#FED57A" },
    { name: "Thee", color: "#E73E07" },
    { name: "Appelsap", color: "#B196C7" },
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
      <Text style={styles.title}>Categorie</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {categories.map((category, index) => (
            <Pressable
              key={index}
              style={[
                styles.categoryButton,
                { backgroundColor: category.color },
              ]}
              onPress={() => handleCategoryPress(category.name)}
            >
              <Text style={styles.categoryText}>{category.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: "#28A0A0",
    fontWeight: "500",
  },
  title: {
    fontSize: 42,
    fontWeight: "400",
    textAlign: "center",
    color: "#000000",
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryButton: {
    width: "47%",
    aspectRatio: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryText: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "400",
    textAlign: "center",
    paddingHorizontal: 8,
  },
});
