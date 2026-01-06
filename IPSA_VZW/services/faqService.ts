import { Platform } from "react-native";
import { Faq, LoginUserResponse } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config";

const getApiUrl = () => {
  // Production API URL for main branch deployment
  return "https://back-end-team25-wpp-team-25.apps.okd.ucll.cloud";
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
