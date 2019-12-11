import axios from 'axios';

const server = process.env.GW_CRAFT_ENDPOINT_URL;
const retryTimeMs = 500;
const maxRetries = 5;

export const serverCall = (endPoint, data) => {
    return new Promise((resolve, reject) => {
        attemptCall(endPoint, data, resolve, reject, 0);
    });
}

const attemptCall = (endPoint, data, resolve, reject, attempt) => {
    axios.get(`${server}${endPoint}`,{
        params:data || {}
    })
    .then((response) => {
        resolve(response.data);
    })
    .catch((error) => {
        if (attempt < maxRetries) {
            setTimeout(() => {
                attempt++;
                attemptCall(endPoint, data, resolve, reject, attempt);
            }, attempt * retryTimeMs);
        }
        else {
            reject(error);
        }
    })
}