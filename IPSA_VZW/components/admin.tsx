import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { Antwoord, Vraag } from "@/types";
import { useRouter } from "expo-router";
import { adminStyles as styles } from "@/styles";

const admin: React.FC = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerText}>Dagen</Text>

          <View
            style={[
              styles.headerCounterLayout,
              styles.headerCounterLayoutDagen,
            ]}
          >
            <Text style={styles.headerTextBox}>23</Text>
          </View>
        </View>

        <View>
          <Text style={styles.headerText}>Plaats 345</Text>

          <View
            style={[
              styles.headerCounterLayout,
              styles.headerCounterLayoutPlaats,
            ]}
          >
            <Text style={styles.headerTextBoxPlaats}>76800</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.scoreBordButton]}>
          <Text style={styles.buttonText}>Score Bord</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/quizPage")}
          style={[styles.quizButton]}
        >
          <Text style={styles.buttonQuizText}>Quiz</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.overzichtButton]}>
          <Text style={styles.buttonText}>Overzicht</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.faqButton]}>
          <Text style={styles.buttonText}>Faq</Text>
        </Pressable>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: .9,
//     flexDirection: "column",
//     backgroundColor: "#ffffff",
//     marginTop: 35,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     margin: 20,
//   },
//   headerText: {
//     fontSize: 20,
//   },
//   headerTextBox: {
//     fontSize: 24,
//   },
//   headerTextBoxPlaats:{
//     fontSize: 24,
//     color: "white"
//   },
//   headerCounterLayout: {
//     borderRadius: 7,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   headerCounterLayoutDagen: {
//     marginTop: 7,
//     backgroundColor: "#FFD07F"
//   },
//   headerCounterLayoutPlaats: {
//     marginTop: 7,
//     backgroundColor: "#A496CB"
//   },
//   buttonContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 20,
//   },
//   button: {
//     borderRadius: 50,
//     height: 75,
//     width: 250,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   scoreBordButton: {
//     backgroundColor: "#A395CA",
//   },
//   quizButton: {
//     borderRadius: 50,
//     height: 100,
//     width: 295,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FF4F21",
//   },
//   overzichtButton: {
//     backgroundColor: "#A1C2C2"
//   },
//   faqButton: {
//     backgroundColor: "#FDCE7E"
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 26,
//     marginHorizontal: 5,
//   },
//   buttonQuizText: {
//     fontSize: 46,
//     color: "white",
//   }
// });

export default admin;
