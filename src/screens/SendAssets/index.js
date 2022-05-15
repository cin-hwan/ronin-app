import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthProvider'
import withAuth from '../../HOCs/withAuth'
import withMyWallet from '../../HOCs/withMyWallet'
import Actions from './Actions'
import Form from './Form'
import Header from './Header'

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
    const { wallet } = useAuth()
    const classes = useStyles()
    const methods = useForm({
        defaultValues: {
            from: `(${wallet.no})`
        }
    })
    const navigate = useNavigate()

    const onGoBack = useCallback(() => navigate(-1), [navigate])

    const onSubmit = useCallback((data) => {
        console.log(data)
    }, [])

    return (
        <form className={classes.form} onSubmit={methods.handleSubmit(onSubmit)}>
            <Box className={classes.container}>
                <Header onGoBack={onGoBack} />
                <Form methods={methods} />
                <Actions onCancel={onGoBack} />
            </Box>
        </form>
    )
}

export default withAuth(withMyWallet(SendAssets))