// Use environment variable for API URL, fallback to localhost for local dev
declare global {
  interface Window {
    EXPO_PUBLIC_API_URL?: string;
  }
}

const getApiUrl = () => {
  if (typeof window !== "undefined" && window.EXPO_PUBLIC_API_URL) {
      return window.EXPO_PUBLIC_API_URL;
  }
  return process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080/";
};

const getQuestions = async () => {
    return await fetch(getApiUrl() + '/vragen/random20', {
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