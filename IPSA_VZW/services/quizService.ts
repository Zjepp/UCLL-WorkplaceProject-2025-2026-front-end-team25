// Use environment variable for API URL, fallback to localhost for local dev
const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080';

const getQuestions = async () => {
    return await fetch(apiUrl + '/vragen/random20', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const quizService = {
    getQuestions,
};

export default quizService;