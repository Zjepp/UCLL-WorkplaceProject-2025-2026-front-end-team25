import { LoginUser, User } from "@/types";

const apiUrl = 'http://10.0.2.2:8080'


const login = async (user: LoginUser) => {
  return await fetch(apiUrl+"/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const userService = {
  login
};

export default userService;