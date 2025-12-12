import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import faqService from "@/services/faqService";
import { faqStyles as styles } from "@/style/page.styles";

type FaqItem = {
  id?: number | string;
  question: string;
  answer: string;
};

export default function FAQPage() {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    setLoading(true);
    try {
      const res = await faqService.getFaqs();
      if (!res.ok) throw new Error("network");
      const data = await res.json();
      if (Array.isArray(data)) {
        setFaqs(data);
      }
    } catch (e) {
      console.error("Failed to load FAQs:", e);
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  const openForumPage = async () => {
    const url = "https://ipsa.be/totara/dashboard/index.php?id=6";
    console.log("Attempting to open URL:", url);
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        console.log("Opening URL:", url);
        await Linking.openURL(url);
      } else {
        console.error("Cannot open URL:", url);
      }
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  };

  const renderItem = ({ item }: { item: FaqItem }) => (
    <View style={styles.card}>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.answer}>- {item.answer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.colorBars}>
        <View style={[styles.colorBar, { backgroundColor: "#28A0A0" }]} />
        <View style={[styles.colorBar, { backgroundColor: "#FED57A" }]} />
        <View style={[styles.colorBar, { backgroundColor: "#B196C7" }]} />
        <View style={[styles.colorBar, { backgroundColor: "#E73E07" }]} />
      </View>

      <View style={styles.headerRow}>
        <Pressable
          style={[styles.headerButton, styles.chatButton]}
          onPress={openForumPage}
        >
          <Text style={styles.headerButtonText}>Chat met ons</Text>
        </Pressable>

        <Pressable
          style={[styles.headerButton, styles.returnButton]}
          onPress={() => router.push("/")}
        >
          <Text style={[styles.headerButtonText, { color: "white" }]}>
            Terug
          </Text>
        </Pressable>
      </View>

      <Text style={styles.title}>FAQ</Text>

      <View style={styles.listWrapper}>
        {loading ? (
          <ActivityIndicator size="large" color="#333" />
        ) : (
          <FlatList
            data={faqs}
            keyExtractor={(item) => String(item.id ?? item.question)}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
            contentContainerStyle={{ paddingBottom: 40 }}
            ListEmptyComponent={() => (
              <View style={styles.card}>
                <Text style={styles.question}>Nog geen FAQ's beschikbaar</Text>
                <Text style={styles.answer}>
                  - Er zijn momenteel geen veelgestelde vragen opgeslagen.
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   colorBars: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     flexDirection: "row",
//     zIndex: 1,
//   },
//   colorBar: { width: "25%", height: "100%" },
//   headerRow: {
//     zIndex: 2,
//     marginTop: 30,
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   headerButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 18,
//   },
//   chatButton: { backgroundColor: "#B196C7" },
//   returnButton: { backgroundColor: "#28A0A0" },
//   headerButtonText: { color: "#fff", fontSize: 20 },
//   title: {
//     zIndex: 2,
//     fontSize: 36,
//     textAlign: "center",
//     marginTop: 22,
//     marginBottom: 12,
//     color: "#222",
//   },
//   listWrapper: { zIndex: 2, paddingHorizontal: 18, paddingTop: 10 },
//   card: {
//     backgroundColor: "white",
//     borderRadius: 18,
//     padding: 18,
//   },
//   question: { fontSize: 28, marginBottom: 8, color: "#111" },
//   answer: { fontSize: 16, color: "#222" },
// });
