import axios from "axios";
import config from "../../config"

export const GetAllListing = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${config.baseUrl}/listing`)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response))
    });
}