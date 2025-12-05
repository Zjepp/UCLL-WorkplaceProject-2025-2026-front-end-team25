import { LoginUser, LoginUserResponse, User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config";

const apiUrl = API_URL;

const login = async (user: LoginUser) => {
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
    return await fetch(apiUrl + '/users', {
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
    return await fetch(apiUrl + '/users/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
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

  return fetch(apiUrl + "/users/upload-csv", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

const userService = {
  login,
  getAll,
  deleteUser,
  uploadCsv
};

export default userService;
