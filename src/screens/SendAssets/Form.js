import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useCallback, useMemo } from 'react'
import { Controller } from 'react-hook-form'
import FormField from '../../components/FormField'
import Select from '../../components/Select'
import { useAuth } from '../../contexts/AuthProvider'
import { useGlobal } from '../../contexts/GlobalProvider'
import { currencyFormatter } from '../../utils/formatter'

const useStyles = makeStyles({
    container: {
        flexGrow: 1,
        padding: '25px 20px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: 16
    },
    asset: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        gap: 16,
        borderRadius: 8,
        '&:not(:last-child)': {
            marginBottom: 8
        }
    },
    maxBtn: {
        textTransform: 'uppercase !important',
        fontSize: '10px !important',
        fontWeight: '700 !important',
        padding: '2px 8px !important',
        minWidth: 'unset !important',
        background: '#EEF3FB !important',
        borderRadius: '8px !important',
        color: '#57627B !important'
    }
})

const AssetOption = ({ option }) => {
    const { currencies, baseCurrency } = useGlobal()
    const classes = useStyles()

    const { user } = useAuth()

    const currencyInfo = useMemo(() => currencies[option.currency], [option.currency, currencies])

    const { localBalance, localCurrencyInfo } = useMemo(() => {
        const localCurrencyInfo = currencies[user.localCurrency]
        const baseCurrencyInfo = currencies[baseCurrency]
        if (!localCurrencyInfo || !baseCurrencyInfo || !currencyInfo) return {
            localBalance: 0,
            localCurrencyInfo: localCurrencyInfo ?? null
        }
        const baseBalance = option.balance * currencyInfo.rate
        const localBalance = baseBalance / localCurrencyInfo.rate
        return {
            localBalance,
            localCurrencyInfo
        }
    }, [option.balance, baseCurrency, currencies, currencyInfo, user.localCurrency])

    if (!currencyInfo) return null

    return (
        <Box className={classes.asset}>
            {currencyInfo.img ? <img src={currencyInfo.img} alt={currencyInfo.displayText} /> : currencyInfo.displayText}
            <Box>
                <Typography variant="body2" fontWeight={500}>
                    {currencyFormatter.format(option.balance)} {currencyInfo.displayText}
                </Typography>
                <Typography variant="caption" color="#8F9BB3">
                    {currencyFormatter.format(localBalance)} {localCurrencyInfo.displayText}
                </Typography>
            </Box>
        </Box>
    )
}

const Form = ({ methods }) => {
    const { currencies } = useGlobal()
    const { wallet } = useAuth()
    const classes = useStyles()
    const selectedAsset = methods.watch('asset')

    const assetOptions = useMemo(() => wallet.assets.map(asset => {
        const currencyInfo = currencies[asset.currency]

        return {
            value: asset.currency,
            label: currencyInfo?.displayText,
            ...asset
        }
    }), [currencies, wallet.assets])

    const assetBalance = useMemo(() => {
        if (!selectedAsset) return 0;
        const asset = wallet.assets.find(a => a.currency === selectedAsset)
        return asset?.balance ?? 0
    }, [selectedAsset, wallet])

    const selectedCurrency = useMemo(() => currencies[selectedAsset], [currencies, selectedAsset])

    const onSetMaxAmount = useCallback(() => {
        methods.setValue('amount', assetBalance)
    }, [assetBalance, methods])

    return (
        <Box className={classes.container}>
            <FormField name="from" label="From" errors={methods.formState.errors}>
                <TextField
                    {...methods.register('from')}
                    disabled
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Typography variant="body2" fontWeight={600}>My Wallet</Typography>
                            </InputAdornment>
                        )
                    }}
                />
            </FormField>
            <FormField name="to" label="To" errors={methods.formState.errors}>
                <TextField
                    {...methods.register('to')}
                />
            </FormField>
            <Controller
                name="asset"
                control={methods.control}
                render={({ field }) => (
                    <FormField name={field.name} label="Asset" errors={methods.formState.errors}>
                        <Select
                            {...field}
                            options={assetOptions}
                            optionComponent={AssetOption}
                            InputProps={{
                                startAdornment: currencies[field.value]?.img && (
                                    <InputAdornment position="start">
                                        <img width={24} height={24} src={currencies[field.value]?.img} alt={field.value} />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormField>
                )}
            />
            <FormField errors={methods.formState.errors} name="amount" label={(
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography color="inherit" fontSize="inherit" fontWeight="inherit">
                        Amount
                    </Typography>
                    {!!selectedAsset && (
                        <Typography color="#151A30" fontSize="inherit" fontWeight="inherit">
                            Available: {currencyFormatter.format(assetBalance)} {selectedCurrency?.displayText ?? ''}
                        </Typography>
                    )}
                </Box>
            )}>
                <TextField
                    {...methods.register('amount')}
                    type="number"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="contained"
                                    color="inherit"
                                    className={classes.maxBtn}
                                    onClick={onSetMaxAmount}
                                >
                                    Max
                                </Button>
                            </InputAdornment>
                        )
                    }}
                />
            </FormField>
        </Box>
    )
}

export default Form