import axios from "axios";
import config from "../../config"

export const Signup = body => {
    return new Promise((resolve, reject) => {
        axios.post(`${config.baseUrl}/auth/signup`, body)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err))
    });
}