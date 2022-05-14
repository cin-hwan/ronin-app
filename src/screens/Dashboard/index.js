import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import withAuth from '../../HOCs/withAuth'
import DashboardHeader from './DashboardHeader'
import MyWallet from './MyWallet'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: '20px 0'
    }
})

const Dashboard = () => {
    const classes = useStyles()

    return (
        <Box className={classes.container}>
            <DashboardHeader />
            <MyWallet />
        </Box>
    )
}

export default withAuth(Dashboard)