import axios from 'axios'

/**
 * 
 * @param {import('axios').AxiosRequestConfig} configs 
 */
export function getHttpClient(configs = {}) {
    const instance = axios.create({
        timeout: 60000,
        ...configs
    })

    instance.interceptors.response.use(res => res.data)

    return instance
}