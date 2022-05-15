import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { ReactComponent as CreditCardIcon } from '../../assets/icons/credit-card-fill.svg'
import { ReactComponent as SendIcon } from '../../assets/icons/plane-fill.svg'
import { ReactComponent as SwapIcon } from '../../assets/icons/repeat.svg'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24
    },
    action: {
        minWidth: 'unset !important',
        padding: '8px !important',
        borderRadius: '8px !important',
        background: '#F7F9FC !important',
        '&[disabled]': {
            opacity: 0.5
        }
    }
})

const WalletActions = ({ onSend }) => {
    const classes = useStyles()

    return (
        <Box className={classes.container}>
            <Button disabled className={classes.action}>
                <CreditCardIcon />
            </Button>
            <Button className={classes.action} onClick={onSend}>
                <SendIcon />
            </Button>
            <Button disabled className={classes.action}>
                <SwapIcon />
            </Button>
        </Box>
    )
}

export default WalletActions