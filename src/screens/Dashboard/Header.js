import { Person } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    roninWallet: {
        padding: '6px 19px 6px 12px',
        background: '#F7F9FC',
        borderRadius: 8,
        display: 'flex',
        gap: 12,
        alignItems: 'center'
    },
    dot: {
        borderRadius: '50%',
        width: 8,
        height: 8,
        background: '#1273EA'
    },
    profileMenu: {
        display: 'flex',
        alignItems: 'center'
    },
    profileBtn: {
        padding: '5px 10px !important',
        borderRadius: 8,
        minWidth: 'unset !important',
        background: '#F7F9FC !important'
    }
})

const DashboardHeader = () => {
    const classes = useStyles()

    return (
        <Box className={classes.container}>
            <Box className={classes.roninWallet}>
                <Box className={classes.dot} />
                <Typography variant="caption" fontWeight={700}>Ronin Wallet</Typography>
            </Box>
            <Box className={classes.profileMenu}>
                <Button className={classes.profileBtn} color="primary">
                    <Person />
                </Button>
            </Box>
        </Box>
    )
}

export default DashboardHeader