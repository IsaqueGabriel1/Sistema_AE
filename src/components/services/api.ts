import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api.clarifai.com',
    headers:{
        'Authorization': "Key 4ac8d3a5862a47569dbd82089c315eb8"
    }
})