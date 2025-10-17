import quizService from "@/services/quizService";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
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
            // await AsyncStorage.setItem("VragenOpgeslagen", vragenValue);
            router.push("/quizPage")
        } else {
            console.log('Ophalen van vragen mislukt');
        }
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <View>
      <Text>Quiz wordt hier gemaakt</Text>
        <Text onPress={getRandom20}>Haal 20 random vragen op</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
