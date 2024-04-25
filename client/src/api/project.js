import axios from "axios"
import { BASE_URL } from "./env"

const api = (token) => 
    axios.create({
        baseURL: BASE_URL,
        headers: {Authorization: token}
    })

export const createProject = async () => {
    try{

    }catch(err){
        console.log("Error creating project! ", err);
    }
}