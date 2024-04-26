import axios from 'axios'
import {BASE_URL} from './env'

const api = (token) => 
  axios.create({
    baseURL: BASE_URL,
    headers: {Authorization: token}
  })

export const createTeam = async (teamMembersId, leaderId) => {
    try{
        const token = localStorage.getItem("token");
        return await api(token).post('/team/createTeam', {teamMembersId, leaderId});
    }catch(err){
        console.log("Error creating project! ", err);
    }
}