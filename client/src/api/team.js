import axios from 'axios'
import {BASE_URL} from './env'

const api = (token) => 
  axios.create({
    baseURL: BASE_URL,
    headers: {Authorization: token}
  })

export const createTeam = async () => {
    try{
        const token = localStorage.getItem("token");
        const response = await api(token).post('/team/createTeam');
    }catch(err){
        console.log("Error creating project! ", err);
    }
}