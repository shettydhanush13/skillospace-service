import axios from "axios";
import config from "../../config"

export const Logout = () => {
    const token = localStorage.getItem("refreshToken")
    const body = { token }
    return new Promise((resolve, reject) => {
        axios.delete(`${config.baseUrl}/auth/logout`, { data: body })
        .then((res) => {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            resolve(res.data)
        }).catch((err) => reject(err))
    });
}