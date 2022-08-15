import axios from "axios";
import authStorage from "../storages/authStorage"

axios.defaults.baseURL = 'http://10.0.2.2:7000';
// axios.interceptors.request.use(async (config) => {
//     if(!config.headers["Authorization"]){
//         config.headers["Authorization"] =`Bearer ${accesstoken}`
//     }
// })

const baseURL = __DEV__
    ? 'http://10.0.2.2:7000'
    : 'https://effect.com';

const client = axios.create({
    baseURL,
});


export function applyToken(accesstoken: string) {
    client.defaults.headers.common['Authorization'] = `Bearer ${accesstoken}`;
}

export function clearToken() {
    client.defaults.headers.common['Authorization'];
}

export default client;