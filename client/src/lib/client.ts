import axios from "axios";

const baseURL = __DEV__
    ? 'http://10.0.2.2:7000'
    : 'https://effect.com';

const client = axios.create({
    baseURL,
});

export function applyToken(accesstoken: string) {
    //console.log('토큰',accesstoken);
    client.defaults.headers.common['Authorization'] = `Bearer ${accesstoken}`;
}

export function clearToken() {
    client.defaults.headers.common['Authorization'];
}

export default client;