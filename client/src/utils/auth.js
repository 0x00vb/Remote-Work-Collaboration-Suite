import axios from "axios"
import { BASE_URL } from "./api";

export const loginUser = async (username, password) => {
    try {
      const { data } = await axios.post(
            `${BASE_URL}/auth/login`,
            { username, password },
            { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.log(error);
      return { success: false, message: "An error occurred during login." };
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

