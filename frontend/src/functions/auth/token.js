import axios from "axios";
import config from "../../config"

export const Token = (history) => {
    const token = localStorage.getItem("refreshToken")
    if(!token) history.push("/register")
    return new Promise((resolve, reject) => {
        axios.post(`${config.baseUrl}/auth/token`, { token })
        .then((res) => {
            localStorage.setItem("accessToken", res.data.accessToken)
            resolve(res.data.accessToken)
        }).catch((err) => reject(err))
    });
}