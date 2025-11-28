import { Platform } from "react-native";

export const API_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:8080" // Android emulator
    : Platform.OS === "ios"
    ? "http://localhost:8080" // iOS simulator
    : "http://localhost:8080"; // Web
