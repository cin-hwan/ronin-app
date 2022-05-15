import { Box, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import classNames from 'classnames'
import React from 'react'

const useStyles = makeStyles({
    container: {
        width: '100%'
    },
    wrapper: {
        padding: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16
    },
    action: {
        flex: 1,
        borderRadius: '8px !important',
        padding: '10px !important'
    },
    send: {
        background: 'linear-gradient(256.28deg, #1C94F4 0%, #1273EA 100%) !important'
    },
    cancel: {
        background: '#F7F9FC !important'
    }
})

const Actions = ({ onCancel, isSubmitting }) => {
    const classes = useStyles()

    return (
        <Box className={classes.container}>
            <Box className={classes.wrapper}>
                <Button onClick={onCancel} className={classNames(classes.action, classes.cancel)} disabled={isSubmitting}>
                    <Typography variant="body2">Cancel</Typography>
                </Button>
                <Button type="submit" variant="contained" className={classNames(classes.action, classes.send)} disabled={isSubmitting}>
                    <Typography variant="body2">Send</Typography>
                </Button>
            </Box>
        </Box>
    )
}

export default Actions