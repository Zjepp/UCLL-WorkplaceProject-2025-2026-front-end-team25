const apiUrl = 'http.//localhost:8080'

const getQuestions = async () => {
    return await fetch(apiUrl + '/vragen', {
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