import axios from "axios";
import config from "../../config"

export const Login = body => {
    return new Promise((resolve, reject) => {
        axios.post(`${config.baseUrl}/auth/login`, body)
        .then((res) => {
            localStorage.setItem("accessToken", res.data.accessToken)
            localStorage.setItem("refreshToken", res.data.refreshToken)
            resolve(res.data)
        }).catch((err) => reject(err))
    });
}