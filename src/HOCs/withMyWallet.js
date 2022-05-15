import React from 'react'
import { useAuth } from '../contexts/AuthProvider'

const withMyWallet = (Component) => {
    const ComponentWithWalletInfo = (props) => {
        const { wallet } = useAuth()

        if (!wallet) return null

        return <Component {...props} />
    }
    return ComponentWithWalletInfo
}

export default withMyWallet