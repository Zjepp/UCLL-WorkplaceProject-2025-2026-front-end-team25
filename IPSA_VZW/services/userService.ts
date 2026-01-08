import { LoginUser, LoginUserResponse, User } from "@/types";
import storage from "@/utils/storage";
import { API_URL } from "@/config";

const login = async (user: LoginUser) => {
  console.log('🔐 Login request to:', API_URL + "/auth/login");
  return await fetch(API_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const getAll = async () => {
  const userValue = await storage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
    return await fetch(API_URL + '/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const deleteUser = async (id: number) => {
  const userValue = await storage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
    return await fetch(API_URL + '/users/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
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

  const response = await fetch(API_URL + "/users/upload-csv", {
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

  const response = await fetch(API_URL + "/users/upload-csv", {
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
