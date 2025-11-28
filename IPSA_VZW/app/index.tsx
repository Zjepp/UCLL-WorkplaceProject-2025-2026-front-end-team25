import Login from "@/components/login";
import { LoginUserResponse } from "@/types";
import { useRouter } from "expo-router";
import React, { use, useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomePage() {
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

  return (
    <View style={styles.container}>
      {user == null && <Login user={user} setUser={setUser}/>}
      {user && user.role == 'USER' && <View style={[styles.container, { marginTop: 35 }]}>
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

          <Pressable onPress={() => router.push("/categoryPage" as any)} style={[styles.quizButton]}>
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

      {user && user.role == 'ADMIN' && <View style={[styles.container, { marginTop: 35, justifyContent: "center" , alignItems: "center"}]}>
          <Text style={styles.title}>Admin Paneel</Text>

          <LinearGradient
            colors={["#A89BC7", "#5B4D9F"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.5, 0.5]}
            style={styles.button}
          >
            <Pressable onPress={() => router.push("/users")}>
              <Text style={styles.buttonText}>Gebruikers</Text>
            </Pressable>
          </LinearGradient>

          <LinearGradient
            colors={["#FF4928", "#A91E00"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.5, 0.5]}
            style={styles.button}
          >
            <Pressable onPress={() => router.push("/scorebord")}>
              <Text style={styles.buttonText}>Scorebord</Text>
            </Pressable>
          </LinearGradient>

          <LinearGradient
            colors={["#A5BCBC", "#1CA0A0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.5, 0.5]}
            style={styles.button}
          >
            <Pressable onPress={() => router.push("/vragen")}>
              <Text style={styles.buttonText}>Vragen</Text>
            </Pressable>
          </LinearGradient>

          <LinearGradient
            colors={["#FFD285", "#CE9935"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.5, 0.5]}
            style={styles.button}
          >
            <Pressable onPress={() => router.push("/faq")}>
              <Text style={styles.buttonText}>FAQ</Text>
            </Pressable>
          </LinearGradient>

          <Pressable style={[styles.button, styles.logoutButton]} onPress={async () => {
            await AsyncStorage.removeItem('loggedInUser');
            setUser(null);}}>
            <Text style={styles.buttonText}>Log out</Text>
          </Pressable>
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
  logoutButton: {
    backgroundColor: "#FF4F21"
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "400",
    marginRight: 10,
  },
  buttonQuizText: {
    fontSize: 46,
    color: "white",
  },
  overzichtButton: {
    backgroundColor: "#A1C2C2"
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
  faqButton: {
    backgroundColor: "#FDCE7E"
  }
});
