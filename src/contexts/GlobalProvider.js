import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { GlobalService } from '../services/global'

const GlobalContext = createContext({
    currencies: {},
    baseCurrency: null
})

export function useGlobal() {
    return useContext(GlobalContext)
}

const GlobalProvider = ({ children }) => {
    const [globalConfigs, setGlobalConfigs] = useState({})

    const init = async () => {
        try {
            const configs = await GlobalService.instance.getGlobalConfigs()
            setGlobalConfigs(configs || {})
        } catch (error) {
            console.error(error)
            toast(error.message, {
                type: 'error'
            })
        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <GlobalContext.Provider value={globalConfigs}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider