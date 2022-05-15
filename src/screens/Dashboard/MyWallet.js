import { Box, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useCallback, useMemo } from 'react'
import { ReactComponent as CopyIcon } from '../../assets/icons/copy.svg'
import { useAuth } from '../../contexts/AuthProvider'
import { useGlobal } from '../../contexts/GlobalProvider'
import { currencyFormatter } from '../../utils/formatter'


const useStyles = makeStyles({
    container: {
        position: 'relative',
        padding: 20,
        background: 'linear-gradient(256.28deg, #1C94F4 0%, #1273EA 100%)',
        borderRadius: 16,
        boxShadow: '0px 12px 20px -4px #C5CEE0'
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 14,
        borderBottom: '1px solid rgba(104, 184, 248, 0.5)'
    },
    copyBtn: {
        minWidth: 'unset !important',
        padding: '0 !important'
    },
    balance: {
        paddingTop: 12,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    },
    mainBalance: {
        fontSize: '32px !important',
        color: '#fff',
        fontWeight: '700 !important'
    },
    localBalance: {
        fontSize: '16px !important',
        fontWeight: '500 !important',
        color: '#8DC9F9'
    },
    logoContainer: {
        position: 'absolute',
        right: 20,
        bottom: 20
    }
})

const MyWallet = () => {
    const { baseCurrency, currencies = {} } = useGlobal()
    const { user, wallet } = useAuth()
    const classes = useStyles()

    const { baseBalance, baseCurrencyInfo } = useMemo(() => {
        const baseCurrencyInfo = currencies[baseCurrency]
        const baseAsset = wallet.assets.find(asset => asset.currency === baseCurrency)
        if (!baseCurrencyInfo || !baseAsset) return {
            baseBalance: 0,
            baseCurrencyInfo: baseCurrencyInfo ?? null
        }
        
        return {
            baseBalance: baseAsset.balance,
            baseCurrencyInfo
        }
    }, [baseCurrency, currencies, wallet.assets])

    const { localBalance, localCurrencyInfo } = useMemo(() => {
        const localCurrencyInfo = currencies[user.localCurrency]
        if (!localCurrencyInfo) return {
            localBalance: 0,
            localCurrencyInfo: null
        }
        const localBalance = baseBalance / localCurrencyInfo.rate

        return {
            localBalance,
            localCurrencyInfo
        }
    }, [baseBalance, currencies, user.localCurrency])

    const onCopyAddress = useCallback(() => {
        navigator.clipboard.writeText(user.walletNo)
    }, [user.walletNo])

    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Typography>
                    <Typography component="span" color="#fff" variant="body2" fontWeight={600}>
                        My Wallet
                    </Typography>
                    &nbsp;
                    <Typography component="span" color="#8DC9F9" variant="body2" fontWeight={400}>
                        ({user.walletNo})
                    </Typography>
                </Typography>
                <Box>
                    <Button className={classes.copyBtn} onClick={onCopyAddress}>
                        <CopyIcon />
                    </Button>
                </Box>
            </Box>
            <Box className={classes.balance}>
                <Typography className={classes.mainBalance}>
                    {currencyFormatter.format(baseBalance)} {baseCurrencyInfo?.displayText || ''}
                </Typography>
                <Typography className={classes.localBalance}>
                    {currencyFormatter.format(localBalance)} {localCurrencyInfo?.displayText || ''}
                </Typography>
            </Box>
            <Box className={classes.logoContainer}>
                <img src="/imgs/logo.png" alt="ronin-wallet" height={40} />
            </Box>
        </Box>
    )
}

export default MyWallet