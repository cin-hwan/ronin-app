import axios from 'axios'
import { AuthService } from './auth'

/**
 * 
 * @param {import('axios').AxiosRequestConfig} configs 
 */
export function createHttpClient(configs = {}) {
    const instance = axios.create({
        timeout: 60000,
        ...configs
    })

    instance.interceptors.request.use(async (req) => {
        if (!req.authenticated) return req
        const token = await AuthService.instance.acquireToken()
        if (token) {
            req.headers.Authorization = `Bearer ${token}`
        }
        return req
    })

    instance.interceptors.response.use(res => res.data, (error) => {
        error.message = error.response?.data?.message || error.message
        error.code = error.response?.data?.code
        throw error
    })

    return instance
}