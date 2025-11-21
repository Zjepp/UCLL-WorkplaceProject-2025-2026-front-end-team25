import { LoginUserResponse, Vraag } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = "http://10.0.2.2:8080";

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
    return await fetch(apiUrl + '/vragen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
};

const deleteQuestions = async (id: number) => {
    return await fetch(apiUrl + '/vragen/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

const getAll = async () => {
    return await fetch(apiUrl + '/vragen/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getQuestionById= async(id: number) =>{
  return fetch(`${apiUrl}/vragen/${id}`);
}

const updateQuestion = async(vraag: Vraag) =>{
  return fetch(`${apiUrl}/vragen`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vraag),
  });
}

const quizService = {
    getAll,
    addQuestions,
    deleteQuestions,
    updateQuestion,
    getQuestionById,
    get18Questions,
    get8Questions,
};

export default quizService;
