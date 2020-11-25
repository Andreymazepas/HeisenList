import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://www.breakingbadapi.com/api/',
    headers: {
        "Content-type": "application/json"
    }
});

export default {
    getCharacters: () =>
        axiosInstance({
            'method': 'GET',
            'url': '/characters',
        })
}