import { LoginUser, User } from "@/types";
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

const userService = {
  login,
};

export default userService;
