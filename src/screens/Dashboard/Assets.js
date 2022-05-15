import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useMemo } from 'react'
import { useAuth } from '../../contexts/AuthProvider'
import { useGlobal } from '../../contexts/GlobalProvider'
import { currencyFormatter } from '../../utils/formatter'

const useStyles = makeStyles({
    title: {
        marginLeft: '12px !important',
        marginBottom: '12px !important'  
    },
    assetList: {
        width: '100%'
    },
    asset: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        gap: 16,
        background: '#F7F9FC',
        borderRadius: 8,
        padding: '12px 20px',
        '&:not(:last-child)': {
            marginBottom: 8
        }
    }
})

const Asset = ({ classes, asset }) => {
    const { currencies, baseCurrency } = useGlobal()
    const { user } = useAuth()

    const currencyInfo = useMemo(() => currencies[asset.currency], [asset.currency, currencies])

    const { localBalance, localCurrencyInfo } = useMemo(() => {
        const localCurrencyInfo = currencies[user.localCurrency]
        const baseCurrencyInfo = currencies[baseCurrency]
        if (!localCurrencyInfo || !baseCurrencyInfo || !currencyInfo) return {
            localBalance: 0,
            localCurrencyInfo: localCurrencyInfo ?? null
        }
        const baseBalance = asset.balance * currencyInfo.rate
        const localBalance = baseBalance / localCurrencyInfo.rate
        return {
            localBalance,
            localCurrencyInfo
        }
    }, [asset.balance, baseCurrency, currencies, currencyInfo, user.localCurrency])

    if (!currencyInfo) return null

    return (
        <Box className={classes.asset}>
            {currencyInfo.img ? <img src={currencyInfo.img} alt={currencyInfo.displayText} /> : currencyInfo.displayText}
            <Box>
                <Typography variant="body2" fontWeight={500}>
                    {currencyFormatter.format(asset.balance)} {currencyInfo.displayText}
                </Typography>
                <Typography variant="caption" color="#8F9BB3">
                    {currencyFormatter.format(localBalance)} {localCurrencyInfo.displayText}
                </Typography>
            </Box>
        </Box>
    )
}

const Assets = () => {
    const { wallet } = useAuth()
    const classes = useStyles()

    return (
        <Box>
            <Typography className={classes.title} variant="body1" fontWeight={700}>Assets</Typography>
            <Box className={classes.assetList}>
                {wallet?.assets?.map(asset => (
                    <Asset key={asset.currency} classes={classes} asset={asset} />
                ))}
            </Box>
        </Box>
    )
}

export default Assets