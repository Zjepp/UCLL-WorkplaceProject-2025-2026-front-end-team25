import { Platform } from "react-native";

export const API_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:8080" // Android emulator
    : Platform.OS === "ios"
    ? "http://localhost:8080" // iOS simulator
    : typeof window !== "undefined" && window.location.hostname.includes("apps.okd.ucll.cloud")
    ? "https://back-end-team25-wpp-team-25.apps.okd.ucll.cloud" // Production
    : "http://localhost:8080"; // Local web
