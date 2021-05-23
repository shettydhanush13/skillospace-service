import axios from "axios";
import config from "../../config"

export const GetMyListing = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(`${config.baseUrl}/listing/myListing`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response))
    });
}