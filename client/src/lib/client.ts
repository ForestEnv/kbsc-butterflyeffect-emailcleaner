import axios from "axios";

const baseURL = __DEV__
    ? 'http://10.0.2.2:7000'
    : 'https://effect.com';

const client = axios.create({
    baseURL,
});

//http 통신: jwt 헤더 설정
export function applyToken(accesstoken: string) {
    client.defaults.headers.common['Authorization'] = `Bearer ${accesstoken}`;
}

//로그아웃시 jwt 해제
export function clearToken() {
    client.defaults.headers.common['Authorization'];
}

export default client;