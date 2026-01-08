const getCategories = async () => {
  const userValue = await storage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return await fetch(API_URL + "/vragen/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
import { LoginUserResponse, Vraag } from "@/types";
import storage from "@/utils/storage";
import { API_URL } from "@/config";

const get18Questions = async () => {
  const userValue = await storage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return await fetch(API_URL + "/vragen/random18", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const get8Questions = async () => {
  const userValue = await storage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return await fetch(API_URL + "/vragen/random8", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const addQuestions = async (payload: Vraag) => {
  const userValue = await storage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return await fetch(API_URL + "/vragen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

const uploadCsv = async (uri: string, name: string, mimeType?: string) => {
  const userValue = await storage.getItem("loggedInUser");
  if (!userValue) throw new Error("Niet ingelogd");

  const { token } = JSON.parse(userValue);

  const formData = new FormData();
  formData.append("file", {
    uri,
    name,
    type: mimeType || "text/csv",
  } as any);

  const response = await fetch(API_URL + "/vragen/upload-csv", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // GEEN Content-Type header zetten!
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Upload mislukt");
  }

  return await response.text();
};

const uploadCsvForWeb = async (file: File | any) => { // File op web, object op native
  const userValue = await storage.getItem("loggedInUser");
  if (!userValue) throw new Error("Niet ingelogd");

  const { token } = JSON.parse(userValue);

  const formData = new FormData();
  formData.append("file", file); // op web: echte File object → perfect voor Spring Boot

  const response = await fetch(API_URL + "/vragen/upload-csv", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // GEEN Content-Type zetten! Browser/fetch doet het automatisch correct
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Upload mislukt");
  }

  return await response.text();
};

const deleteQuestions = async (id: number) => {
  const userValue = await storage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return await fetch(API_URL + "/vragen/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAll = async () => {
  const userValue = await storage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return await fetch(API_URL + "/vragen/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getQuestionById = async (id: number) => {
  const userValue = await storage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return fetch(API_URL + "/vragen/" + id, {
    method: "GET", // ← hier stond PUT!
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateQuestion = async (vraag: Vraag) => {
  const userValue = await storage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return fetch(`${API_URL}/vragen`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(vraag),
  });
};

const getQuestionsByCategory = async (category: string) => {
  const userValue = await storage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return await fetch(API_URL + `/vragen/category/${category}`, {
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
  uploadCsv,
  uploadCsvForWeb,
  getCategories
};

export default quizService;
