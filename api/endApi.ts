import axios from 'axios';

const endApi = axios.create({
    baseURL: '/api'
});

export default endApi;