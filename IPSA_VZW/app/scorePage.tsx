import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const WrongAnswers: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <View style={styles.overlay}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Foute Antwoorden</Text>
      <Text style={{ color: "#333", marginVertical: 10 }}>1. Vraag 2 — Antwoord B</Text>
      <Text style={{ color: "#333", marginBottom: 20 }}>2. Vraag 5 — Antwoord C</Text>
      <Pressable onPress={onClose}>
        <LinearGradient
          colors={["#FFD285", "#CE9935"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sluiten</Text>
        </LinearGradient>
      </Pressable>
    </View>
  </View>
);

const ScorePage: React.FC = () => {
    const router = useRouter();
    const [showWrong, setShowWrong] = React.useState(false);
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

      <Pressable  onPress={() => setShowWrong(true)}>
      <LinearGradient
        colors={["#A5BCBC", "#1CA0A0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0.5, 0.5]}
        style={styles.button}
      >
          <Text style={styles.buttonText}>Foute Antwoorden</Text>
        </LinearGradient>
      </Pressable>
    <Pressable onPress={() => router.push("/")}>
      <LinearGradient
        colors={["#FFD285", "#CE9935"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0.5, 0.5]}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Terug</Text>
      </LinearGradient>
      </Pressable>
      {showWrong && <WrongAnswers onClose={() => setShowWrong(false)} />}
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
    fontSize: 30,
    fontWeight: "400",
    marginRight: 10,
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
  scoreNumberLeft: {
    fontSize: 70,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginHorizontal: 30,
    position: "absolute",
    right: 150,
  },
  scoreNumberRight: {
    fontSize: 70,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginHorizontal: 30,
    position: "absolute",
    left: 150,
  },
  scoreBar: {
    fontSize: 50,
    color: "#FFFFFF",
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    elevation: 20, // android
  },
  modalContent: {
    width: 320,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: "#FFF",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginBottom: 12,
  },
});

export default ScorePage;