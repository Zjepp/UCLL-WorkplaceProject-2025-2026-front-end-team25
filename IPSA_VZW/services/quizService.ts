import { LoginUserResponse, Vraag } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const apiUrl = API_URL;

const get18Questions = async () => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return await fetch(apiUrl + "/vragen/random18", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const get8Questions = async () => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return await fetch(apiUrl + "/vragen/random8", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const addQuestions = async (payload: Vraag) => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return await fetch(apiUrl + "/vragen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

const uploadCsv = async (uri: string, name: string, type: string) => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  const token = userValue ? JSON.parse(userValue).token : "";

  const formData = new FormData();
  formData.append("file", {
    uri,
    name,
    type: type || (name.endsWith(".csv") ? "text/csv" : "text/plain"),
  } as any);

  return fetch(apiUrl + "/vragen/upload-csv", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

const deleteQuestions = async (id: number) => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return await fetch(apiUrl + "/vragen/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAll = async () => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return await fetch(apiUrl + "/vragen/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getQuestionById = async (id: number) => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return fetch(apiUrl + "/vragen/" + id, {
    method: "GET", // ← hier stond PUT!
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateQuestion = async (vraag: Vraag) => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return fetch(`${apiUrl}/vragen`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(vraag),
  });
};

const getQuestionsByCategory = async (category: string) => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return await fetch(apiUrl + `/vragen/category/${category}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const quizService = {
  getAll,
  addQuestions,
  deleteQuestions,
  updateQuestion,
  getQuestionById,
  get18Questions,
  get8Questions,
  getQuestionsByCategory,
  uploadCsv
};

export default quizService;
