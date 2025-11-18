import Login from "@/components/login";
import { LoginUserResponse } from "@/types";
import { useRouter } from "expo-router";
import React, { use, useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';


export default function Index() {
  const router = useRouter();
  const [user, setUser] = useState<LoginUserResponse | null>(null);

  const fetchUser = async () => {
    const userValue = await AsyncStorage.getItem('loggedInUser');
    if (userValue) {
        const fetchedUser: LoginUserResponse = JSON.parse(userValue);
        setUser(fetchedUser);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    Notifications.requestPermissionsAsync();

    Notifications.cancelAllScheduledNotificationsAsync();
    
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Goedemorgen!",
        body: "Dit is je dagelijkse herinnering.",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 15,
        minute: 58
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      {user == null && <Login user={user} setUser={setUser}/>}
      {user && <View style={[styles.container, { marginTop: 35 }]}>

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


        <View style={styles.buttonContainer}>
            <Text style={styles.headerText}>Welkom {user?.username}</Text>

          <Pressable style={[styles.button, styles.scoreBordButton]}>
            <Text style={styles.buttonText}>Score Bord</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/quizPage")} style={[styles.quizButton]}>
            <Text style={styles.buttonQuizText}>Quiz</Text>
          </Pressable>

          <Pressable style={[styles.button, styles.overzichtButton]}>
            <Text style={styles.buttonText}>Overzicht</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/faq" as any)} style={[styles.button, styles.faqButton]}>
            <Text style={styles.buttonText}>Faq</Text>
          </Pressable>

          <Pressable style={[styles.button, styles.logoutButton]} onPress={async () => {
            await AsyncStorage.removeItem('loggedInUser');
            setUser(null);}}>
            <Text style={styles.buttonText}>Log out</Text>
          </Pressable>
        </View>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff"
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  headerText: {
    fontSize: 20,
  },
  headerTextBox: {
    fontSize: 24,
  },
  headerTextBoxPlaats:{
    fontSize: 24,
    color: "white"
  },
  headerCounterLayout: {
    borderRadius: 7,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCounterLayoutDagen: {
    marginTop: 7,
    backgroundColor: "#FFD07F"
  },
  headerCounterLayoutPlaats: {
    marginTop: 7,
    backgroundColor: "#A496CB"
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    borderRadius: 50,
    height: 75,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreBordButton: {
    backgroundColor: "#A395CA",
  },
  quizButton: {
    borderRadius: 50,
    height: 100,
    width: 295,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF4F21",
  },
  overzichtButton: {
    backgroundColor: "#A1C2C2"
  },
  faqButton: {
    backgroundColor: "#FDCE7E"
  },
  logoutButton: {
    backgroundColor: "#FF4F21"
  },
  buttonText: {
    color: "white",
    fontSize: 26,
    marginHorizontal: 5,
  },
  buttonQuizText: {
    fontSize: 46,
    color: "white",
  }
});
