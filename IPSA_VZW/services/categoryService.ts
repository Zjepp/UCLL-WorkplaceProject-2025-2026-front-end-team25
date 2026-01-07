import { Category, LoginUserResponse } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/config";

const apiUrl = API_URL;

const getCategories = async () => {
  try {
    const userValue = await AsyncStorage.getItem("loggedInUser");
    let token = "";
    if (userValue) {
      const user: LoginUserResponse = JSON.parse(userValue);
      token = user.token;
    }

    console.log("[CategoryService] Fetching categories from:", apiUrl + "/categories");
    const response = await fetch(apiUrl + "/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("[CategoryService] Get categories response status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("[CategoryService] Get categories failed:", errorText);
    }
    return response;
  } catch (error) {
    console.error("[CategoryService] Get categories error:", error);
    throw error;
  }
};

const createCategory = async (payload: Category) => {
  try {
    const userValue = await AsyncStorage.getItem("loggedInUser");
    let token = "";
    if (userValue) {
      const user: LoginUserResponse = JSON.parse(userValue);
      token = user.token;
    }

    console.log("[CategoryService] Creating category:", payload);
    const response = await fetch(apiUrl + "/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    console.log("[CategoryService] Create category response status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("[CategoryService] Create category failed:", errorText);
    }
    return response;
  } catch (error) {
    console.error("[CategoryService] Create category error:", error);
    throw error;
  }
};

const categoryService = {
  getCategories,
  createCategory,
};

export default categoryService;
