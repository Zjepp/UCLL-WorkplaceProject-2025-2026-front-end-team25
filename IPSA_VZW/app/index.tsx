import { useRouter } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerText}>Dagen</Text>
          <View style={[styles.headerCounterLayout, styles.headerCounterLayoutDagen]}>
            <Text style={styles.headerTextBox}>23</Text>
          </View>
        </View>

        <View>
          <Text style={styles.headerText}>Plaats 345</Text>
          <View style={[styles.headerCounterLayout, styles.headerCounterLayoutPlaats]}>
            <Text style={styles.headerTextBoxPlaats}>76800</Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {/* Big Quiz button */}
        <Pressable onPress={() => router.push("/quizPage")} style={styles.quizButtonWrapper}>
          <LinearGradient
            colors={["#F0C8D0", "#E73E07"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.5, 0.5]}
            style={styles.quizButton}
          >
            <Text style={styles.buttonQuizText}>Quiz</Text>
          </LinearGradient>
        </Pressable>

        {/* 2x2 grid underneath */}
        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <Pressable style={styles.gridButtonWrapper}>
              <LinearGradient
                colors={["#5AB9B9", "#28A0A0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0.5, 0.5]}
                style={styles.gridButton}
              >
                <Text style={styles.buttonText}>Foute{"\n"}Antwoorden</Text>
              </LinearGradient>
            </Pressable>

      <Pressable style={styles.gridButtonWrapper} onPress={() => router.push('/faq' as any)}>
                  <LinearGradient
                    colors={["#FFDC9B", "#FED57A"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    locations={[0.5, 0.5]}
                    style={styles.gridButton}
                  >
                    <Text style={styles.buttonText}>FAQ</Text>
                  </LinearGradient>
                </Pressable>
          </View>

          <View style={styles.gridRow}>
            <Pressable style={styles.gridButtonWrapper}>
              <LinearGradient
                colors={["#F0C8D0", "#E73E07"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0.5, 0.5]}
                style={styles.gridButton}
              >
                <Text style={styles.buttonText}>Wedstrijd</Text>
              </LinearGradient>
            </Pressable>

            <Pressable style={styles.gridButtonWrapper}>
              <LinearGradient
                colors={["#B4B9D7", "#B196C7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0.5, 0.5]}
                style={styles.gridButton}
              >
                <Text style={styles.buttonText}>Score Bord</Text>
              </LinearGradient>
            </Pressable>

            <Pressable>
              <Text onPress={() => router.push("/loginPage")}>Log In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: "#fff",
    marginTop: 35,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  headerText: { fontSize: 20 },
  headerTextBox: { fontSize: 24 },
  headerTextBoxPlaats: { fontSize: 24, color: "white" },
  headerCounterLayout: {
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  headerCounterLayoutDagen: { marginTop: 7, backgroundColor: "#FED57A" },
  headerCounterLayoutPlaats: { marginTop: 7, backgroundColor: "#B196C7" },

  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  quizButtonWrapper: {
    width: "90%",
    height: 110,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 25,
  },
  quizButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonQuizText: {
    fontSize: 50,
    color: "white",
    fontWeight: "500",
  },
  gridContainer: { width: "100%", gap: 18 },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
  },
  gridButtonWrapper: {
    flex: 1,
    height: 85,
    borderRadius: 50,
    overflow: "hidden",
  },
  gridButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
  },
});
