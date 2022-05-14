import axios from "axios";

const http = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/auth`
})

http.interceptors.response.use(res => res.data, error => {
    error.message = error.response?.data?.message || error.message
    error.code = error.response?.data?.code
    throw error
})

const REFRESH_TOKEN_STORAGE_KEY = 'ronin_refresh_token'

export class AuthService {
    accessToken = null
    refreshToken = null
    user = null

    _stateListeners = []

    constructor() {
        this.refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
    }

    init = async () => {
        if(!this.refreshToken) throw new Error('Refresh token not found')
        const res = await http.post('/refresh', { refreshToken: this.refreshToken })
        this.changeAuthState(res)
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
}