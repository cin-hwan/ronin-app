import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { number, object, string } from 'yup'
import { useAuth } from '../../contexts/AuthProvider'
import withAuth from '../../HOCs/withAuth'
import withMyWallet from '../../HOCs/withMyWallet'
import useRouterPrompt from '../../hooks/useCustomPrompt'
import Actions from './Actions'
import Form from './Form'
import Header from './Header'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { WalletService } from '../../services/wallet'
import SucceedAlert from './SucceedAlert'
import { useGlobal } from '../../contexts/GlobalProvider'

const useStyles = makeStyles({
    form: {
        width: '100%',
        height: '100%'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#fff'
    }
})

const SendAssets = () => {
    const { currencies } = useGlobal()
    const { wallet, refetchWallet } = useAuth()
    const classes = useStyles()
    const [isSubmitting, setSubmitting] = useState(false)
    const [transferedCurrency, setTransferedCurrency] = useState(null)

    useEffect(() => {
        refetchWallet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const schema = useMemo(() => object({
        to: string().trim().required("Please enter receiver's wallet number"),
        asset: string().trim().required('Please select an asset'),
        amount: number().typeError('Please enter a valid amount').test('maxAmount', 'Invalid amount', (value, ctx) => {
            const asset = wallet.assets.find(a => a.currency === ctx.parent.asset)
            if (!asset) return true
            return value > 0 && value <= asset.balance
        })
    }), [wallet])

    const defaultValues = useMemo(() => ({
        from: `(${wallet.no})`,
        to: '',
        asset: wallet.assets[0]?.currency
    }), [wallet.assets, wallet.no])

    const methods = useForm({
        mode: 'all',
        defaultValues,
        resolver: yupResolver(schema)
    })
    const navigate = useNavigate()

    useRouterPrompt({
        title: 'Changes not saved',
        message: 'Are you sure to cancel sending assets?',
        cancelText: 'No',
        confirmText: 'Yes'
    }, methods.formState.isDirty)

    const onGoBack = useCallback(() => navigate(-1), [navigate])

    const onSubmit = useCallback(async (data) => {
        try {
            setSubmitting(true)
            const payload = {
                ...data,
                from: wallet.no
            }
            await WalletService.instance.sendAsset(payload)
            methods.reset(defaultValues)
            setTransferedCurrency(currencies[payload.asset])
        } catch (error) {
            console.error(error)
            toast(error.message, {
                type: 'error'
            })
        } finally {
            setSubmitting(false)
        }
    }, [currencies, defaultValues, methods, wallet.no])

    const onConfirmSuccess = useCallback(() => {
        setTransferedCurrency(null)
        navigate('/')
    }, [navigate])

    return (
        <>
            <SucceedAlert isOpen={!!transferedCurrency} onClose={onConfirmSuccess} currency={transferedCurrency?.displayText} />
            <form className={classes.form} onSubmit={methods.handleSubmit(onSubmit)}>
                <Box className={classes.container}>
                    <Header onGoBack={onGoBack} />
                    <Form methods={methods} />
                    <Actions onCancel={onGoBack} isSubmitting={isSubmitting} />
                </Box>
            </form>
        </>
    )
}

export default withAuth(withMyWallet(SendAssets))