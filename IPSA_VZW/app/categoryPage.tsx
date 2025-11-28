import { useRouter } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, Pressable, FlatList } from "react-native";

export default function CategoryPage() {
  const router = useRouter();

  const categories = [
    { name: "Cardiovasculair", color: "#28A0A0" },     
    { name: "Gastro-intestinaal", color: "#FED57A" },       
    { name: "Respiratoir stelsel", color: "#E73E07" },   
    { name: "Hormonaal stelsel", color: "#B196C7" },         
    { name: "Pijn", color: "#28A0A0" },       
    { name: "Centraal zenuwstelsel", color: "#FED57A" },         
    { name: "Infecties & immuniteit", color: "#E73E07" },          
    { name: "Uro-genitaal stelsel", color: "#B196C7" },
    { name: "Osteo-articulaire aandoeningen", color: "#28A0A0" },
    { name: "Kanker", color: "#FED57A" },
    { name: "Dermatologie", color: "#E73E07" },
    { name: "Oftalmologie", color: "#B196C7" },
    { name: "Toxicomanie", color: "#28A0A0" },
    { name: "Mentaal welzijn", color: "#FED57A" },
    { name: "Veterinair", color: "#E73E07" },
    { name: "Gezonde levensstijl", color: "#B196C7" },
    { name: "Geriatrische patiënt", color: "#28A0A0" },
    { name: "Pediatrische patiënt", color: "#FED57A" },
    { name: "Zwangerschap & borstvoeding", color: "#E73E07" },
    { name: "Fytotherapeutica", color: "#B196C7" },
    { name: "Vaccinatie", color: "#28A0A0" },
    { name: "Medicatienazicht", color: "#FED57A" },
    { name: "Medische materialen", color: "#E73E07" },
    { name: "Communicatie", color: "#B196C7" },
    { name: "GGG: Goed geneesmiddelengebruik", color: "#28A0A0" },
    { name: "Magistrale bereidingen", color: "#FED57A" },
    { name: "Actua", color: "#E73E07" },
  ];

  const handleCategoryPress = (category: string) => {
    // Navigate to quiz page with selected category
    router.push({
      pathname: "/quizPage",
      params: { category }
    } as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Terug</Text>
        </Pressable>
        <Text style={styles.title}>Categorie</Text>
      </View>
      
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.categoryButton, { backgroundColor: item.color }]}
            onPress={() => handleCategoryPress(item.name)}
          >
            <Text style={styles.categoryText}>{item.name}</Text>
          </Pressable>
        )}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: "#28A0A0",
    fontWeight: "500",
  },
  title: {
    fontSize: 42,
    fontWeight: "400",
    textAlign: "center",
    color: "#000000",
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryButton: {
    width: "47%",
    aspectRatio: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryText: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "400",
    textAlign: "center",
    paddingHorizontal: 8,
  },
});
