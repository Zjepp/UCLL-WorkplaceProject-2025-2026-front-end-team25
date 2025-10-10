import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

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

      <Pressable onPress={() => router.push("/scorePage")}>
        <Text>Start Quiz</Text>
      </Pressable>

    </View>
  );
}
