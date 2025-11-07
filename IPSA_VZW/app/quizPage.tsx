import quizService from "@/services/quizService";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vraag } from "../../types";


export default function quiz() {
  const router = useRouter();

  const getRandom20 = async () => {
    try {
        const response = await quizService.getQuestions();

        if (response.status === 200) {
            console.log('Vragen succesvol opgehaald');
            const vragen: Vraag[] = await response.json();
            const vragenValue = JSON.stringify(vragen);
            console.log(vragenValue);
            await AsyncStorage.setItem("VragenOpgeslagen", vragenValue);
            console.log('Vragen opgeslagen in AsyncStorage');
        } else {
            console.log('Ophalen van vragen mislukt');
        }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getRandom20();
  })

  return (
    <View>
      <Text>Quiz wordt hier gemaakt, vragen autom opgehaald uit backend</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
