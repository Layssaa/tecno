import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:4000',
    headers: {
        "Access-Control-Allow-Origin": "http://127.0.0.1:4000",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Access-Control-Allow-Credentials": "true"
    }
});

axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://127.0.0.1:4000';
api.defaults.withCredentials = true

export default api;