import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import quizService from "@/services/quizService";
import categoryService from "@/services/categoryService";
import { LoginUserResponse } from "@/types";
import { isTokenExpired } from "@/utils/tokenUtils";

export default function CategoryPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<{ name: string; color: string }[]>([]);
  const defaultColors = [
    "#28A0A0", "#e8bf4fff", "#E73E07", "#B196C7"
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      console.log("[CategoryPage] Fetching categories with questions...");
      try {
        // Use quizService.getCategories() which calls /vragen/categories
        // This returns only categories that have questions
        const response = await quizService.getCategories();
        if (response.ok) {
          const data = await response.json();
          console.log("[CategoryPage] Categories with questions loaded:", data.length, "items");
          // data is an array of strings (category names)
          const colored = data.map((categoryName: string, idx: number) => ({
            name: categoryName,
            color: defaultColors[idx % defaultColors.length],
          }));
          setCategories(colored);
        } else {
          const errorText = await response.text();
          console.error("[CategoryPage] Failed to fetch categories:", response.status, errorText);
          setCategories([]);
        }
      } catch (e) {
        console.error("[CategoryPage] Network error fetching categories:", e);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

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
    backgroundColor: "#FF4F21",
    marginTop: 7,
    borderRadius: 7,
    paddingVertical: 2,
    paddingHorizontal: 7,
  },
  backButtonText: {
    fontSize: 20,
    color: "#ffffffff",
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
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
  },
  categoryText: {
    fontSize: 20,
    color: "#ffffffff",
    fontWeight: "400",
    textAlign: "center",
    paddingHorizontal: 8,
  },
});
