import axios from 'axios'
import {BASE_URL} from './env'

const api = (token) => 
  axios.create({
    baseURL: BASE_URL,
    headers: {Authorization: token}
  })


export const fetchProjectTasks = async (projectId) => {
    try{
        const token = localStorage.getItem('token');
        const response = await api(token).get(`/task/fetchTasks/${projectId}`);
        return response.data.tasks;
    }catch(err){
        console.log(err);
    }
}

export const createTask = async (title, description, assignee, due_date, projectId) => {
    try{
        const token = localStorage.getItem('token');
        const response = await api(token).post(`task/createTask/${projectId}`,
            {title, description, assignee, due_date, projectId}
        );
        console.log(response);
        return response.data;
    }catch(err){
        console.log(err);
    }
}