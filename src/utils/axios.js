import axios from 'axios'

/**
 * 
 * @param {import('axios').AxiosRequestConfig} configs 
 */
export function createAxiosInstance(configs = {}) {
    const instance = axios.create({
        timeout: 60000,
        ...configs
    })

    instance.interceptors.response.use(res => res.data, (error) => {
        error.message = error.response?.data?.message || error.message
        error.code = error.response?.data?.code
        throw error
    })

    return instance
}