import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function quiz() {
  const router = useRouter();
  return (
    <View>
      <Text>Quiz wordt hier gemaakt</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
