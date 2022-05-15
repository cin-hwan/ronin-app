import axios from "axios";
import jwtDecode from 'jwt-decode';

const REFRESH_TOKEN_STORAGE_KEY = 'ronin_refresh_token'

const http = axios.create({
    timeout: 60000,
    baseURL: `${process.env.REACT_APP_API_URL}/auth`
})

http.interceptors.response.use(res => res.data, (error) => {
    error.message = error.response?.data?.message || error.message
    error.code = error.response?.data?.code
    throw error
})

/**
 * @type {AuthService} instance
 */
let instance = null
export class AuthService {
    accessToken = null
    refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
    user = null

    _stateListeners = []

    static get instance() {
        if (!instance) instance = new AuthService()
        return instance
    }

    init = async () => {
        if(!this.refreshToken) throw new Error('Refresh token not found')
        await this.refresh()
    }

    onAuthStateChange = (fn) => {
        this._stateListeners.push(fn)
    }

    removeAuthStateListener = (fn) => {
        this._stateListeners = this._stateListeners.filter(listener => listener !== fn)
    }

    changeAuthState = ({ user, accessToken, refreshToken }) => {
        this.user = user
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken)
        this._stateListeners.forEach(fn => fn({ user, accessToken, refreshToken }))
    }

    login = async ({ password }) => {
        const res = await http.post('/login', { password })
        this.changeAuthState(res)        
        return res
    }

    refresh = async () => {
        const res = await http.post('/refresh', { refreshToken: this.refreshToken })
        this.changeAuthState(res)
    }

    acquireToken = async () => {
        if (this.accessToken) {
            const accessTokenPayload = jwtDecode(this.accessToken)
            if(!accessTokenPayload?.exp) return null
            const expAt = accessTokenPayload.exp * 1000;
            const now = Date.now()
            if (now < expAt) {
                return this.accessToken
            }
        }
        await this.refresh()
        return this.accessToken
    }
}