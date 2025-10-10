import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ScorePage: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Resultaten</Text>

      {/* Score Bord */}
      <LinearGradient
        colors={["#A89BC7", "#5B4D9F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0.5, 0.5]} // hard split
        style={styles.button}
      >
        <Text style={styles.buttonText}>Score Bord</Text>
      </LinearGradient>

      {/* Score Section */}
      <LinearGradient
        colors={["#FF4928", "#A91E00"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0.5, 0.5]}
        style={styles.scoreContainer}
      >
        <Text style={styles.scoreNumber}>17</Text>
        <Text style={styles.scoreBar}>|</Text>
        <Text style={styles.scoreNumber}>20</Text>
      </LinearGradient>

      {/* Foute Antwoorden */}
      <LinearGradient
        colors={["#A5BCBC", "#1CA0A0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0.5, 0.5]}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Foute Antwoorden</Text>
      </LinearGradient>

      {/* Terug */}
      <LinearGradient
        colors={["#FFD285", "#CE9935"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0.5, 0.5]}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Terug</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: "#222",
    marginBottom: 50,
    fontWeight: "400",
  },
  button: {
    width: 280,
    height: 75,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "400",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
  scoreNumber: {
    fontSize: 70,
    color: "#FFFFFF",
    fontWeight: "300",
  },
  scoreBar: {
    fontSize: 60,
    color: "#FFFFFF",
    marginHorizontal: 20,
  },
});

export default ScorePage;
