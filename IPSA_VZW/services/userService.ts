import { LoginUser, LoginUserResponse, User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config";
import { Platform } from 'react-native';

 
const getApiUrl = () => {
  if (typeof window !== "undefined" && window.EXPO_PUBLIC_API_URL) {
    console.log('✅ Using EXPO_PUBLIC_API_URL from window:', window.EXPO_PUBLIC_API_URL);
    return window.EXPO_PUBLIC_API_URL;
  }
  const envUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080";
  console.log('⚠️ Using fallback API URL:', envUrl, '(window.EXPO_PUBLIC_API_URL not set)');
  return envUrl;
};

const login = async (user: LoginUser) => {
  const apiUrl = getApiUrl();
  console.log('🔐 Login request to:', apiUrl + "/auth/login");
  return await fetch(apiUrl + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const getAll = async () => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
    return await fetch(getApiUrl() + '/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const deleteUser = async (id: number) => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
    return await fetch(getApiUrl() + '/users/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
};

const uploadCsv = async (uri: string, name: string, mimeType?: string) => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  if (!userValue) throw new Error("Niet ingelogd");

  const { token } = JSON.parse(userValue);

  const formData = new FormData();
  formData.append("file", {
    uri,
    name,
    type: mimeType || "text/csv",
  } as any);

  const response = await fetch(getApiUrl() + "/users/upload-csv", {
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
  const userValue = await AsyncStorage.getItem("loggedInUser");
  if (!userValue) throw new Error("Niet ingelogd");

  const { token } = JSON.parse(userValue);

  const formData = new FormData();
  formData.append("file", file); // op web: echte File object → perfect voor Spring Boot

  const response = await fetch(getApiUrl() + "/users/upload-csv", {
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

const userService = {
  login,
  getAll,
  deleteUser,
  uploadCsv,
  uploadCsvForWeb
};

export default userService;
