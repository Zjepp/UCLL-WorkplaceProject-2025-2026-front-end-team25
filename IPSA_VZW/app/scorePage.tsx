import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Score from "@/components/score";

const ScorePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultaten</Text>

      <LinearGradient
        colors={["#A89BC7", "#5B4D9F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0.5, 0.5]}
        style={styles.button}
      >
        <Pressable  onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>Score Bord</Text></Pressable>
      </LinearGradient>

      <LinearGradient
        colors={["#FF4928", "#A91E00"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0.5, 0.5]}
        style={styles.scoreContainer}
      >
        <Text style={styles.scoreNumberLeft}>14</Text>
        <Text style={styles.scoreBar}>|</Text>
        <Text style={styles.scoreNumberRight}>20</Text>
      </LinearGradient>

      <LinearGradient
        colors={["#A5BCBC", "#1CA0A0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0.5, 0.5]}
        style={styles.button}

      >
        <Pressable  onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>Foute Antwoorden</Text></Pressable>
      </LinearGradient>

      <LinearGradient
        colors={["#FFD285", "#CE9935"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0.5, 0.5]}
        style={styles.button}


      >
        <Pressable onPress={() => router.push("/")}><Text style={styles.buttonText}>Terug</Text></Pressable>
      </LinearGradient>
    </View>
  );
};
export default ScorePage;
