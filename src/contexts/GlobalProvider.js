import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { GlobalService } from '../services/global'

const GlobalContext = createContext({
    currencies: {},
    baseCurrency: null,
    confirmDialog: null,
    showConfirmDialog: (options) => {},
    hideConfirmDialog: () => {}
})

export function useGlobal() {
    return useContext(GlobalContext)
}

const GlobalProvider = ({ children }) => {
    const [confirmDialog, setConfirmDialog] = useState(null)
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

    const showConfirmDialog = useCallback((options) => setConfirmDialog(options), [])
    const hideConfirmDialog = useCallback(() => setConfirmDialog(null), [])

    return (
        <GlobalContext.Provider value={{
            ...globalConfigs,
            confirmDialog,
            showConfirmDialog,
            hideConfirmDialog
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider