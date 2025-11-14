import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
  <Stack screenOptions={{ headerShown: false , contentStyle: { backgroundColor: '#FFFFFF' }}}>
    <Stack.Screen name="index"/>
    <Stack.Screen name="quiz"/>
    <Stack.Screen name="scorePage"/>
    <Stack.Screen name="faq"/>
  </Stack>
  );
}