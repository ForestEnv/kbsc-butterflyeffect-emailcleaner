import axios from "axios";

const baseURL = __DEV__
    ? 'http://10.0.2.2:7000'
    : 'https://effect.com';

const client = axios.create({
    baseURL,
});

export default client;