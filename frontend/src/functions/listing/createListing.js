import axios from "axios";
import config from "../../config"

export const CreateListing = (body, token) => {
    return new Promise((resolve, reject) => {
        axios.post(`${config.baseUrl}/listing`, body, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response))
    });
}