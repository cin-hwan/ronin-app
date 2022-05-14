import { createAxiosInstance } from "../utils/axios";

const REFRESH_TOKEN_STORAGE_KEY = 'ronin_refresh_token'

export class AuthService {
    static accessToken = null
    static refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
    static user = null
    static http = createAxiosInstance({
        baseURL: `${process.env.REACT_APP_API_URL}/auth`
    })

    static _stateListeners = []

    static init = async () => {
        if(!AuthService.refreshToken) throw new Error('Refresh token not found')
        const res = await AuthService.http.post('/refresh', { refreshToken: AuthService.refreshToken })
        AuthService.changeAuthState(res)
    }

    static onAuthStateChange = (fn) => {
        AuthService._stateListeners.push(fn)
    }

    static removeAuthStateListener = (fn) => {
        AuthService._stateListeners = AuthService._stateListeners.filter(listener => listener !== fn)
    }

    static changeAuthState = ({ user, accessToken, refreshToken }) => {
        AuthService.user = user
        AuthService.accessToken = accessToken
        AuthService.refreshToken = refreshToken
        localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken)
        AuthService._stateListeners.forEach(fn => fn({ user, accessToken, refreshToken }))
    }

    static login = async ({ password }) => {
        const res = await AuthService.http.post('/login', { password })
        AuthService.changeAuthState(res)        
        return res
    }
}