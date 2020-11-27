import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://www.breakingbadapi.com/api/',
    headers: {
        "Content-type": "application/json"
    }
});

export default {
    getCharacters: (offset = 0) =>
        axiosInstance({
            'method': 'GET',
            'url': `characters?limit=10&offset=${offset}`,
        })
}