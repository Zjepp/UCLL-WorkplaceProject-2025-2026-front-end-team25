const apiUrl = 'http://10.0.2.2:8080'

const get18Questions = async () => {
    return await fetch(apiUrl + '/vragen/random18', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const get8Questions = async () => {
    return await fetch(apiUrl + '/vragen/random8', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const quizService = {
    get18Questions,
    get8Questions,
};

export default quizService;