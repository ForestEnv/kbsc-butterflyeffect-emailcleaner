import axios from "axios";

const baseURL = __DEV__
    ? 'http://10.0.2.2:7000'
    : 'https://effect.com';

const client = axios.create({
    baseURL,
});

export function applyToken(jwt: string) {
    client.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

export function clearToken(jwt: string) {
    client.defaults.headers.common['Authorization'];
}

export default client;