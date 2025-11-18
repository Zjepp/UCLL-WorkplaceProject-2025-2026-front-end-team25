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
    getQuestions,
    getAll,
    addQuestions,
    deleteQuestions,
    updateQuestion,
    getQuestionById
};

export default quizService;