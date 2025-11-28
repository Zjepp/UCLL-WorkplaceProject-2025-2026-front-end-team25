import { LoginUserResponse } from "@/types";
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

const addFaq = async (question: string, answer: string) => {
    const userValue = await AsyncStorage.getItem('loggedInUser');
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
        body: JSON.stringify({
            question: question,
            answer: answer
        }),
    });
};

const faqService = {
    getFaqs,
    addFaq,
};

export default faqService;