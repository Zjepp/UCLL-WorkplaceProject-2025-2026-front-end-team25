import { Faq, LoginUserResponse } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = 'http://10.0.2.2:8080'

const getFaqs = async () => {
    const userValue = await AsyncStorage.getItem('loggedInUser');
    let token = "";
    if (userValue) {
        const user: LoginUserResponse = JSON.parse(userValue);
        token = user.token;
    }
    
    return await fetch(apiUrl + '/faq', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const getFaqById= async(id: number) =>{
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return fetch(apiUrl + '/faq/' + id, {
    method: "GET",  // ← hier stond PUT!
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

const updateFaq = async(faq: Faq) =>{
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
  return fetch(`${apiUrl}/faq`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(faq),
  });
}

const addQuestions = async (payload: Faq) => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
    return await fetch(apiUrl + '/faq', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload)
    });
};

const deleteQuestions = async (id: number) => {
  const userValue = await AsyncStorage.getItem("loggedInUser");
  let token = "";
  if (userValue) {
    const user: LoginUserResponse = JSON.parse(userValue);
    token = user.token;
  }
    return await fetch(apiUrl + '/faq/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
};

const faqService = {
    getFaqs,
    updateFaq,
    getFaqById,
    addQuestions,
    deleteQuestions
};

export default faqService;