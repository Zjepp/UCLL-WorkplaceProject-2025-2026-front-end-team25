import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const Admin: React.FC = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
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
});

export default Admin;
