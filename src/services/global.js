import { createHttpClient } from "./http"

/**
 * @type {GlobalService} instance
 */
let instance = null

export class GlobalService {
    http = createHttpClient({
        baseURL: `${process.env.REACT_APP_API_URL}/global`
    })

    static get instance() {
        if (!instance) instance = new GlobalService()
        return instance
    }

    getGlobalConfigs() {
        return this.http.get('/configs')
    }
}