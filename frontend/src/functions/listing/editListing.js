import axios from "axios";
import config from "../../config"

export const EditListing = (body, id, token) => {
    return new Promise((resolve, reject) => {
        axios.put(`${config.baseUrl}/listing/${id}`, body, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response))
    });
}