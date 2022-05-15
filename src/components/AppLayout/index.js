import { Container, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles({
    container: {
        height: '100vh',
        padding: '0 !important'
    },
    paper: {
        height: '100%',
        backgroundImage: 'url("/imgs/background.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: 'top',
        backgroundSize: 'contain'
    }
})

const AppLayout = ({ children }) => {
    const classes = useStyles()
    
    return (
        <Container maxWidth="sm" className={classes.container}>
            <Paper elevation={0} className={classes.paper}>
                {children}
            </Paper>
        </Container>
    )
}

export default AppLayout