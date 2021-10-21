import axios from "axios";
const URL = "http://localhost:4000";

function setConfig (token) {
    return {
        headers:
        {
            Authorization: `Bearer ${token}`
        }
    };
}

function postLogin (userData) {
    return axios.post(`${URL}`, userData);
}

function postUser (userData) {
    return axios.post(`${URL}/signup`, userData);
}

function getLoggedUser (token) {
    return axios.get(`${URL}/balances`, setConfig(token))
}

export {
    postLogin,
    postUser,
    getLoggedUser
}