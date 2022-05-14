import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { AuthService } from '../services/auth'

export const authServiceInstance = new AuthService()

const AuthContext = createContext({
    isInitialized: false,
    user: null
})

export function useAuth() {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [isInitialized, setInitialized] = useState(false)
    const [user, setUser] = useState(null)

    const initAuthState = async () => {
        try {
            await authServiceInstance.init()
        } catch (error) {
            console.log(error)
        } finally {
            setInitialized(true)
        }
    }

    const onAuthStateChange = useCallback((state) => {
        setUser(state.user)
    }, [])

    useEffect(() => {
        initAuthState()
    }, [])

    useEffect(() => {
        authServiceInstance.onAuthStateChange(onAuthStateChange)
        return () => authServiceInstance.removeAuthStateListener(onAuthStateChange)
    }, [onAuthStateChange])

    return (
        <AuthContext.Provider value={{
            isInitialized,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider