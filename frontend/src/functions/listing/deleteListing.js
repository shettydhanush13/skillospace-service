import axios from "axios";
import config from "../../config"

export const DeleteListing = id => {
    const token = localStorage.getItem("accessToken")
    return new Promise((resolve, reject) => {
        axios.delete(`${config.baseUrl}/listing/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    });
}