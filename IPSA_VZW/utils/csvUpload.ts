import * as DocumentPicker from "expo-document-picker";
import { Platform, Alert } from "react-native";

// Types
export type CSVValidator = (firstLine: string) => boolean;

// CSV Validators
export const usersCSVValidator: CSVValidator = (firstLine: string) => {
  const headers = firstLine.toLowerCase();
  // Check for key user CSV headers
  return (
    headers.includes("volledige naam") ||
    headers.includes("gebruikersnaam") ||
    headers.includes("e-mailadres")
  );
};

export const questionsCSVValidator: CSVValidator = (firstLine: string) => {
  const headers = firstLine.toLowerCase();
  // Check for key question CSV headers
  return (
    headers.includes("type") &&
    headers.includes("vraag") &&
    headers.includes("category")
  );
};

// Main upload handler
export const handleCsvUpload = async (
  validator: CSVValidator,
  csvType: "users" | "questions"
): Promise<{ uri: string; name: string; type: string } | null> => {
  try {
    let fileUri: string;
    let fileName: string;
    let fileType: string;

    if (Platform.OS === "web") {
      return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".csv,text/csv,text/plain";

        input.onchange = (e: any) => {
          const file = e.target.files[0];
          if (!file) {
            resolve(null);
            return;
          }

          // Validate CSV format
          const reader = new FileReader();
          reader.onload = (event: any) => {
            const content = event.target.result as string;
            const firstLine = content.split("\n")[0];

            if (!validator(firstLine)) {
              Alert.alert(
                "Fout",
                `Dit is geen geldig ${csvType === "users" ? "gebruikers" : "vragen"} CSV bestand.`
              );
              resolve(null);
              return;
            }

            fileName = file.name;
            fileType = file.type || "text/csv";
            resolve({ uri: "", name: fileName, type: fileType });
          };

          reader.readAsText(file);
        };

        input.click();
      });
    } else {
      // Native (Android/iOS): gebruik expo-document-picker
      const result = await DocumentPicker.getDocumentAsync({
        type: ["text/csv", "text/comma-separated-values", "text/plain"],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) {
        console.log("Gebruiker annuleerde");
        return null;
      }

      const file = result.assets[0];
      fileUri = file.uri;
      fileName = file.name;
      fileType = file.mimeType ?? "text/csv";

      // Read and validate file content
      const content = await readFileContent(fileUri);
      const firstLine = content.split("\n")[0];

      if (!validator(firstLine)) {
        Alert.alert(
          "Fout",
          `Dit is geen geldige ${csvType === "users" ? "gebruikers" : "vragen"} CSV bestand.`
        );
        return null;
      }

      return { uri: fileUri, name: fileName, type: fileType };
    }
  } catch (err: any) {
    console.error("Upload error:", err);
    Alert.alert("Fout", err.message || "Upload mislukt");
    return null;
  }
};

// Helper to read file content on native
const readFileContent = async (uri: string): Promise<string> => {
  try {
    const response = await fetch(uri);
    return await response.text();
  } catch (error) {
    throw new Error("Kon bestand niet lezen");
  }
};
