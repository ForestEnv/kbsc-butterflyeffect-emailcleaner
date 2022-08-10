import axios from "axios";

const baseURL = __DEV__
    ? 'http://localhost:8000'
    : 'https://effect.com';

const client = axios.create({
    baseURL,
});

export default client;