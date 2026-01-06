import { Platform } from "react-native";
import { Faq, LoginUserResponse } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config";

const getApiUrl = () => {
  // For web deployment, ALWAYS use window.EXPO_PUBLIC_API_URL (injected at runtime)
  if (typeof window !== "undefined") {
    return window.EXPO_PUBLIC_API_URL || "http://localhost:8080";
  }
  // Native fallback
  return "http://localhost:8080";
};

const getFaqs = async () => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }

  return await fetch(getApiUrl() + "/faq", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getFaqById = async (id: number) => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return fetch(getApiUrl() + "/faq/" + id, {
    method: "GET", // ← hier stond PUT!
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateFaq = async (faq: Faq) => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return fetch(`${getApiUrl()}/faq`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(faq),
  });
};

const addQuestions = async (payload: Faq) => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return await fetch(getApiUrl() + "/faq", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

const deleteQuestions = async (id: number) => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return await fetch(getApiUrl() + "/faq/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const faqService = {
  getFaqs,
  updateFaq,
  getFaqById,
  addQuestions,
  deleteQuestions,
};

export default faqService;
