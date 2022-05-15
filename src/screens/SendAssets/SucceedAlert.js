import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles({
    dialog: {
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: '16px !important'
    },
    title: {
        paddingLeft: '0 !important',
        paddingRight: '0 !important'
    },
    content: {
        paddingLeft: '0 !important',
        paddingRight: '0 !important'
    },
    okBtn: {
        background: '#2F80ED !important',
        borderRadius: '8px !important'
    },
    actions: {
        paddingLeft: '0 !important',
        paddingRight: '0 !important'
    }
})

const SucceedAlert = ({ isOpen, onClose, currency }) => {
    const classes = useStyles()

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm" classes={{
            paper: classes.dialog
        }}>
            <DialogTitle className={classes.title}>
                <Typography variant="h6" fontWeight={700} textAlign="center" color="#151A30">
                    Successfully sent
                </Typography>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <Typography variant="body2" color="#151A30">
                    Your <Typography component="span" fontWeight={700}>{currency}</Typography> has been sent!
                </Typography>
                <Typography variant="body2" color="#151A30">
                    Thank you for using our service
                </Typography>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button variant="contained" className={classes.okBtn} fullWidth onClick={onClose}>
                    <Typography variant="body2" fontWeight={600}>OK</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SucceedAlert