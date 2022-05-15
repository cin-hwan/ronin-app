import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthService } from '../services/auth'
import { WalletService } from '../services/wallet'

const AuthContext = createContext({
    isInitialized: false,
    user: null,
    wallet: null,
    refetchWallet: () => {}
})

export function useAuth() {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [isInitialized, setInitialized] = useState(false)
    const [user, setUser] = useState(null)
    const [wallet, setWallet] = useState(null)

    const getMyWallet = useCallback(async () => {
        try {
            const myWallet = await WalletService.instance.getMyWallet()
            setWallet(myWallet)
        } catch (error) {
            console.error(error)
            toast(error.message, {
                type: 'error'
            })
        }
    }, [])

    const init = async () => {
        try {
            await AuthService.instance.init()
            getMyWallet()
        } catch (error) {
            console.error(error)
            toast(error.message, {
                type: 'error'
            })
        } finally {
            setInitialized(true)
        }
    }

    const onAuthStateChange = useCallback((state) => {
        setUser(state.user)
    }, [])

    useEffect(() => {
        init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        AuthService.instance.onAuthStateChange(onAuthStateChange)
        return () => AuthService.instance.removeAuthStateListener(onAuthStateChange)
    }, [onAuthStateChange])

    return (
        <AuthContext.Provider value={{
            isInitialized,
            user,
            wallet,
            refetchWallet: getMyWallet
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider