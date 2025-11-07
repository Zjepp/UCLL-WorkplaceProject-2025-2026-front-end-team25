const apiUrl = 'http://10.0.2.2:8080'

const getQuestions = async () => {
    return await fetch(apiUrl + '/vragen/random20', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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

const quizService = {
    getQuestions,
    getAll
};

export default quizService;