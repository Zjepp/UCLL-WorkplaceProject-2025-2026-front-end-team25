import { Platform } from "react-native";
import { Faq, LoginUserResponse } from "@/types";
import storage from "@/utils/storage";
import { API_URL } from "@/config";

const getApiUrl = () => {
  // Detect production vs local based on hostname
  if (typeof window !== "undefined" && window.location.hostname.includes("apps.okd.ucll.cloud")) {
    return "https://back-end-team25-wpp-team-25.apps.okd.ucll.cloud";
  }
  // Local development
  return "http://localhost:8080";
};

const getFaqs = async () => {
  const userValue = await storage.getItem("loggedInUser");
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
  const userValue = await storage.getItem("loggedInUser");
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
  const userValue = await storage.getItem("loggedInUser");
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
  const userValue = await storage.getItem("loggedInUser");
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
  const userValue = await storage.getItem("loggedInUser");
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
