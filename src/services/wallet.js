import { createHttpClient } from "./http";

/**
 * @type {WalletService} instance
 */
let instance

export class WalletService {
    http = createHttpClient({
        baseURL: `${process.env.REACT_APP_API_URL}/wallet`,
        authenticated: true
    })

    static get instance() {
        if (!instance) instance = new WalletService()
        return instance
    }

    getMyWallet = () => {
        return this.http.get('/me')
    }

    sendAsset = (data) => {
        return this.http.post('/send', data)
    }
}