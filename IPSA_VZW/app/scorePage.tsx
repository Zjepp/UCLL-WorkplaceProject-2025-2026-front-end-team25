
import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

 const ScorePage: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
      style={{
        fontSize: 24,
        marginBottom: 20,
      }}
      >Resultaten</Text>


      <Pressable style={styles.button}
        >
        <LinearGradient
          colors={["#A89BC7", "#5B4D9F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>Score Bord</Text>

        </LinearGradient>
      </Pressable>

        <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>17 | 20</Text>
      </View>

      <Pressable style={styles.button}>
        <LinearGradient
          colors={["#A8C5C5", "#4DB6AC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>Foute Antwoorden</Text>
        </LinearGradient>
      </Pressable>

      <Pressable style={styles.button}>
        <LinearGradient
          colors={["#FFD89B", "#E6B566"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>Terug</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "600",
  },
  button: {
    marginBottom: 20,
    borderRadius: 50,
    overflow: "hidden",
    minWidth: 250,
  },
  gradient: {
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 50,
    alignItems: "center",
  },
  scoreContainer: {
    backgroundColor: "#FF5722",
    paddingVertical: 35,
    paddingHorizontal: 50,
    borderRadius: 50,
    marginBottom: 20,
    minWidth: 280,
    alignItems: "center",
  },
  scoreText: {
    color: "#fff",
    fontSize: 52,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});


export default ScorePage;
