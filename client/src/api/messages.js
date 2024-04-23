import axios from "axios";
import { BASE_URL } from "./env";
const API = (token) =>
  axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: token },
});

export const sendMessage = async (message) => {
    try {
        const token = localStorage.getItem('userToken');
        const { data } = await API(token).post('/api/message/', message);
        return data;
    } catch (error) {
        console.log('error in sendmessage api' + error);
    }
};

export const fetchMessages = async (id) => {
    try {
        const token = localStorage.getItem('userToken');

        const { data } = await API(token).get(`/api/message/${id}`);
        return data;
    } catch (error) {
        console.log('error in fetch Message API ' + error);
    }
};