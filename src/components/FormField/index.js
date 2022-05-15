import { Box, FormLabel, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { get } from 'lodash'
import React from 'react'

const useStyles = makeStyles({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: 4
    },
    label: {
        fontSize: '10px !important',
        fontWeight: '700 !important',
        textTransform: 'uppercase',
        color: '#57627B',
        width: '100%'
    },
    errorMessage: {
        fontSize: '12px !important',
        color: 'red'
    }
})

const FormField = ({ label, children, errors = {}, name }) => {
    const classes = useStyles()

    const error = get(errors, name)

    const inputElement = React.cloneElement(children, {
        ...children.props,
        error: !!error
    })

    return (
        <Box className={classes.container}>
            {!!label && (
                <FormLabel className={classes.label}>{label}</FormLabel>
            )}
            {inputElement}
            {!!error?.message && (
                <Typography className={classes.errorMessage}>{error.message}</Typography>
            )}
        </Box>
    )
}

export default FormField