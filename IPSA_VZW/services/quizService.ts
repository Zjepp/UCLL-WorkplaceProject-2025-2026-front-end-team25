import { Vraag } from "../../types";

const apiUrl = 'http://10.0.2.2:8080'

const getQuestions = async () => {
    return await fetch(apiUrl + '/vragen/random20', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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

const quizService = {
    getQuestions,
    getAll,
    addQuestions,
    deleteQuestions
};

export default quizService;