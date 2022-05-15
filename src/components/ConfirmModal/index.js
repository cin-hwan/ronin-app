import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { makeStyles } from '@mui/styles'
import classNames from 'classnames'
import React from 'react'
import { useGlobal } from '../../contexts/GlobalProvider'

const useStyles = makeStyles({
    action: {
        borderRadius: '8px !important',
        padding: '8px 20px !important'
    },
    cancel: {
        background: '#F7F9FC !important'
    },
    confirm: {
        background: 'linear-gradient(256.28deg, #1C94F4 0%, #1273EA 100%) !important'
    }
})

const ConfirmModal = () => {
    const { confirmDialog } = useGlobal()
    const classes = useStyles()

    return (
        <Dialog open={!!confirmDialog} onClose={confirmDialog?.onCancel} fullWidth maxWidth="sm">
            <DialogTitle>{confirmDialog?.title}</DialogTitle>
            <DialogContent>
                {confirmDialog?.message}
            </DialogContent>
            <DialogActions>
                <Button onClick={confirmDialog?.onCancel} className={classNames(classes.action, classes.cancel)}>
                    {confirmDialog?.cancelText}
                </Button>
                <Button variant="contained" onClick={confirmDialog?.onConfirm} className={classNames(classes.action, classes.confirm)}>
                    {confirmDialog?.confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmModal