import axios from 'axios';

const server = process.env.GW_CRAFT_ENDPOINT_URL;

export const serverCall = (endPoint, data) => {
    return new Promise((resolve, reject) => {
        // handle parsing data and retries later, just get a call working.
        axios.get(`${server}${endPoint}`,{
            params: data || {}
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}