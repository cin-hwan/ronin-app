import { Box, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useCallback } from 'react'
import { ReactComponent as CopyIcon } from '../../assets/icons/copy.svg'
import { useAuth } from '../../contexts/AuthProvider'


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
        fontWeight: '600 !important',
        color: '#8DC9F9'
    },
    logoContainer: {
        position: 'absolute',
        right: 20,
        bottom: 20
    }
})

const MyWallet = () => {
    const { user } = useAuth()
    const classes = useStyles()

    const onCopyAddress = useCallback(() => {
        navigator.clipboard.writeText(user.walletNumber)
    }, [user.walletNumber])

    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Typography>
                    <Typography component="span" color="#fff" variant="body2">
                        My Wallet
                    </Typography>
                    &nbsp;
                    <Typography component="span" color="#8DC9F9" variant="body2">
                        ({user.walletNumber})
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
                    1000 USD
                </Typography>
                <Typography className={classes.localBalance}>
                    23,046,000 VND
                </Typography>
            </Box>
            <Box className={classes.logoContainer}>
                <img src="/imgs/logo.png" alt="ronin-wallet" height={40} />
            </Box>
        </Box>
    )
}

export default MyWallet