import axios from "axios"
import { BASE_URL } from "./env"

const api = (token) => 
    axios.create({
        baseURL: BASE_URL,
        headers: {Authorization: token}
    })

export const createProject = async (projectName, projectDesc, teamId) => {
    try{
        const token = localStorage.getItem('token');
        const response = await api(token).post('/project/createProject', {
            projectName, projectDesc, teamId
        })
        return response;
    }catch(err){
        console.log("Error creating project! ", err);
    }
}

export const searchUserProjects = async () => {
    try{
        const token = localStorage.getItem('token');
        return await api(token).get('/project/searchUserProjects');
    }catch(err){
        console.log(err);
    }
}