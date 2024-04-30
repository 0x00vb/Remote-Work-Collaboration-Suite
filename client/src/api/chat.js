import axios from 'axios';
import { toast } from 'react-toastify'
import { BASE_URL } from './env';

const API = (token) => {
    axios.create({
        baseUrl: BASE_URL,
        headers: {Authorization: token}
    })
}
export const acessCreate = async (body) => {
    try {
        const token = localStorage.getItem('token');

        const { data } = await API(token).post('/chat/', body);
        console.log(data);
        return data;
    } catch (error) {
        console.log('error in access create api');
    }
};
export const fetchAllChats = async () => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await API(token).get('/chat/:chatId');
        console.log(data);
        return data;
    } catch (error) {
        console.log('error in fetch all chats api');
    }
};