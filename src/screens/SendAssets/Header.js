import { ChevronLeft } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles({
    container: {
        width: '100%',
        background: '#fff',
        boxShadow: '0px 4px 12px #F7F9FC'
    },
    wrapper: {
        padding: '18px 20px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center'
    },
    backBtn: {
        padding: '0 !important'
    },
    screenTitle: {
        gridColumnStart: 2,
        textAlign: 'center',
        fontWeight: '600 !important'
    }
})

const Header = ({ onGoBack }) => {
    const classes = useStyles()

    return (
        <Box className={classes.container}>
            <Box className={classes.wrapper}>
                <Box>
                    <Button color="inherit" onClick={onGoBack} className={classes.backBtn}>
                        <ChevronLeft />
                    </Button>
                </Box>
                <Typography variant="body2" className={classes.screenTitle}>
                    Send Assets
                </Typography>
            </Box>
        </Box>
    )
}

export default Header