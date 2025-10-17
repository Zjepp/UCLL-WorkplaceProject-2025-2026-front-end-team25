import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Score from "@/components/score";

const ScorePage: React.FC = () => {
  return (
    <Score />
  );
};
export default ScorePage;
