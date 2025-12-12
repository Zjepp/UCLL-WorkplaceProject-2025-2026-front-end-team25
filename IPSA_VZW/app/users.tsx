import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import * as DocumentPicker from "expo-document-picker"; // ← nieuw
import userService from "@/services/userService";
import { MaterialIcons } from "@expo/vector-icons";
import { usersStyles as styles } from "@/style/page.styles";

type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  // andere velden...
};

const Users: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const response = await userService.getAll();
      if (response.ok) {
        const data: User[] = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Fout bij ophalen users:", error);
    }
  };

  const deleteUser = async (id: number) => {
    Alert.alert(
      "Verwijderen",
      "Ben je zeker dat je deze user wilt verwijderen?",
      [
        { text: "Annuleren", style: "cancel" },
        {
          text: "Verwijderen",
          style: "destructive",
          onPress: async () => {
            setUsers((prev) => prev.filter((u) => u.id !== id));
            const response = await userService.deleteUser(id);
            if (!response.ok) {
              Alert.alert("Fout", "Kon user niet verwijderen.");
              getUsers();
            }
          },
        },
      ]
    );
  };

  // DE NIEUWE CSV UPLOAD FUNCTIE
  const handleCsvUpload = async () => {
    try {
      // Dit opent de nieuwe, stabiele picker (werkt op alle Androids)
      const result = await DocumentPicker.getDocumentAsync({
        type: ["text/csv", "text/plain"], // accepteert .csv én .txt
        copyToCacheDirectory: true,
        multiple: false,
      });

      // Nieuwe API: check of canceled
      if (result.canceled) {
        console.log("Gebruiker annuleerde");
        return;
      }

      // Bestand is er!
      const file = result.assets[0];

      Alert.alert("Bestand gekozen", file.name); // test of je hier komt

      // Upload naar backend
      const response = await userService.uploadCsv(
        file.uri,
        file.name,
        file.mimeType || "text/plain"
      );

      if (response.ok) {
        const text = await response.text();
        Alert.alert("Succes", text || "Gebruikers toegevoegd!");
        getUsers(); // lijst verversen
      } else {
        const error = await response.text();
        Alert.alert("Fout", error || "Upload mislukt");
      }
    } catch (err: any) {
      console.error("Picker error:", err);
      Alert.alert("Fout", "Kon bestand niet kiezen");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const rowColors = ["#A89BC7", "#6FA8DC"];

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Pressable
          style={styles.terugButton}
          onPress={() => router.push("/")}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.terugButtonText}>Terug</Text>
        </Pressable>
        <Pressable style={styles.nieuwButton} onPress={handleCsvUpload}>
          <Text style={styles.nieuwButtonText}>Nieuw (CSV)</Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Users</Text>

        {users.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 50, fontSize: 18 }}>
            Nog geen users...
          </Text>
        ) : (
          users.map((user, index) => {
            const backgroundColor = rowColors[index % 2];

            return (
              <View key={user.id} style={[styles.row, { backgroundColor }]}>
                <Text style={styles.user} numberOfLines={2}>
                  {user.name} ({user.email})
                </Text>

                <View style={styles.iconRow}>
                  <Pressable
                    style={styles.iconButton1}
                    onPress={() => deleteUser(user.id)}
                  >
                    <MaterialIcons name="delete" size={30} color="white" />
                  </Pressable>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 20,
//   },

//   terugButton: {
//     backgroundColor: "#E73E07",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     marginBottom: 30,
//     borderRadius: 12,
//     minWidth: 120,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   title: {
//     fontSize: 30,
//     textAlign: "center",
//     color: "#222",
//     marginBottom: 30,
//     fontWeight: "400",
//   },
//   scrollContent: {
//     paddingBottom: 250,
//     flexGrow: 1,
//   },
//   terugButtonText: {
//     color: "#FFFFFF",
//     fontSize: 20,
//     fontWeight: "400",
//     textAlign: "center",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 14,
//     marginVertical: 10,
//     borderRadius: 20,
//   },
//   user: {
//     flex: 1,
//     fontSize: 18,
//     color: "#000000ff",
//     marginRight: 12,
//   },
//   user2: {
//     fontSize: 24,
//     color: "#000000ff",
//     textAlign: "center",
//   },
//   iconRow: {
//     flexDirection: "row",
//     gap: 16,
//   },
//   iconButton1: {
//     backgroundColor: "#FF4928", // rood
//     padding: 6,
//     borderRadius: 9,
//   },
//   Button: {
//     backgroundColor: "#FFD285", // rood
//     padding: 6,
//     width: "40%",
//     height: "100%",
//     borderRadius: 9,
//     marginTop: 50,
//     textAlign: "center",
//   },
//   iconButton2: {
//     backgroundColor: "#FFD285", // oranje
//     padding: 6,
//     borderRadius: 9,
//   },
//   container2: {
//     paddingHorizontal: 20,
//     marginTop: 50,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   nieuwButton: {
//     backgroundColor: "#FFD285", // rood
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     marginBottom: 30,
//     borderRadius: 12,
//     minWidth: 120,
//     alignItems: "center", // belangrijk!
//     justifyContent: "center", // belangrijk!
//   },

//   nieuwButtonText: {
//     color: "#000000ff", // WITTE tekst
//     fontSize: 20,
//     fontWeight: "400",
//     textAlign: "center",
//   },
// });

export default Users;
