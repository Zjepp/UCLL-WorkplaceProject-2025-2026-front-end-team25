import { useRouter } from "expo-router";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text> this is the main page. The setup is successful!</Text>
      <Pressable style={styles.button} onPress={() => router.push("/quiz")}>
        <Text style={styles.buttonText}>Multiple Choice page</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/scorePage")}>
        <Text>Start Quiz</Text>
      </Pressable>

    </View>
  );
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginHorizontal: 5,
  }
});