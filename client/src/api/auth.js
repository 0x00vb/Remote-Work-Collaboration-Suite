import axios from "axios"
import { BASE_URL } from "./env"
const api = (token) => 
  axios.create({
    baseURL: BASE_URL,
    headers: {Authorization: token}
  })

export const loginUser = async (username, password) => {
    try {
      const response = await axios.post(
            `${BASE_URL}/auth/login`,
            { username, password },
            { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.log(error);
      return { message: "An error occurred during login." };
    }
}

export const signinUser = async (email, username, password) => {
    try {
        const { data } = await axios.post(
            `${BASE_URL}/auth/signin`,
            { email, username, password },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        console.log(error);
        return { success: false, message: "An error occurred during registration." };
    }
}

export const validUser = async () => {
  try {
    const token = localStorage.getItem('token');
    return await api(token).get(`/auth/valid`);
  } catch (error) {
    console.log('error in valid user api: ', error);
  }
};

export const searchUsers = async (username) => {
  try {
    const token = localStorage.getItem('token');
    return await api(token).get(`auth/user?search=${username}`);
  } catch (error) {
    console.log('error in search users api');
  }
};
