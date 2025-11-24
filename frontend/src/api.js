import axios from 'axios'
import { ACCESS_TOKEN } from './constants'

const apiUrl="https://752ff785-740c-4c95-a52d-d310c3974530.e1-us-east-azure.choreoapps.dev/"
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config

    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api