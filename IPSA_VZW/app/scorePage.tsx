import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { scorePageStyles as styles } from "@/style/page.styles";

const ScorePage: React.FC = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultaten</Text>

      <LinearGradient colors={["#FF4F21", "#FF4F21"]} style={styles.button}>
        <Text style={styles.scoreNumberLeft}>14</Text>
        <Text style={styles.scoreBar}>|</Text>
        <Text style={styles.scoreNumberRight}>20</Text>
      </LinearGradient>

      <LinearGradient colors={["#B196C7", "#B196C7"]} style={styles.button}>
        <Pressable onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>Score Bord</Text>
        </Pressable>
      </LinearGradient>

      <LinearGradient colors={["#28A0A0", "#28A0A0"]} style={styles.button}>
        <Pressable onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>Foute Antwoorden</Text>
        </Pressable>
      </LinearGradient>

      <LinearGradient colors={["#e8bf4fff", "#e8bf4fff"]} style={styles.button}>
        <Pressable onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>Terug</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 30,
//     color: "#222",
//     marginBottom: 50,
//     fontWeight: "400",
//   },
//   button: {
//     width: 280,
//     height: 75,
//     borderRadius: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 15,
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 30,
//     fontWeight: "400",
//     marginRight: 10,
//   },
//   scoreContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     width: 300,
//     height: 100,
//     borderRadius: 50,
//     marginVertical: 20,
//   },
//   scoreNumberLeft: {
//     fontSize: 70,
//     color: "#FFFFFF",
//     fontWeight: "bold",
//     marginHorizontal: 30,
//     position: "absolute",
//     right: 150,
//   },
//   scoreNumberRight: {
//     fontSize: 70,
//     color: "#FFFFFF",
//     fontWeight: "bold",
//     marginHorizontal: 30,
//     position: "absolute",
//     left: 150,
//   },
//   scoreBar: {
//     fontSize: 50,
//     color: "#FFFFFF",
//     position: "absolute",
//   },
// });

export default ScorePage;
