import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthProvider'
import withAuth from '../../HOCs/withAuth'
import withMyWallet from '../../HOCs/withMyWallet'
import Assets from './Assets'
import Header from './Header'
import MyWallet from './MyWallet'
import WalletActions from './WalletActions'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: 20
    }
})

const Dashboard = () => {
    const classes = useStyles()
    const { refetchWallet } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        refetchWallet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSend = useCallback(() => {
        navigate('/send')
    }, [navigate])

    return (
        <Box className={classes.container}>
            <Header />
            <MyWallet />
            <WalletActions onSend={onSend} />
            <Assets />
        </Box>
    )
}

export default withAuth(withMyWallet(Dashboard))