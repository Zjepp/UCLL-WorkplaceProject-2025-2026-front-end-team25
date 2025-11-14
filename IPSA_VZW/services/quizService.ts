import { LoginUserResponse } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = 'http://10.0.2.2:8080'

const getQuestions = async () => {
    const userValue = await AsyncStorage.getItem('loggedInUser');
    let token = "";
    if (userValue) {
        const user: LoginUserResponse = JSON.parse(userValue);
        token = user.token;
    }
    return await fetch(apiUrl + '/vragen/random20', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const quizService = {
    getQuestions,
};

export default quizService;