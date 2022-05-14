import { Box, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import FormField from '../components/FormField'
import Input from '../components/Input'
import { authServiceInstance } from '../contexts/AuthProvider'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const useStyles = makeStyles({
    wrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    logoContainer: {
        width: 'fit-content'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%'
    }
})

const schema = object({
    password: string().trim().required('Please enter your password')
})

const SignIn = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [isSubmitting, setSubmitting] = useState(false)
    const methods = useForm({
        defaultValues: {
            password: ''
        },
        mode: 'all',
        resolver: yupResolver(schema)
    })

    const onSubmit = useCallback(async (data) => {
        try {
            setSubmitting(true)
            await authServiceInstance.login(data)
            navigate('/')
        } catch (error) {
            toast(error.message, {
                type: 'error'
            })
        } finally {
            setSubmitting(false)
        }
    }, [navigate])
    
    return (
        <Box className={classes.wrapper}>
            <form className={classes.form} onSubmit={methods.handleSubmit(onSubmit)}>
                <Box className={classes.formContainer}>
                    <Box className={classes.logoContainer}>
                        <img src="/imgs/logo.png" alt="ronin-logo" />
                    </Box>
                    <Box className={classes.titleContainer}>
                        <Typography variant="h4" fontWeight={700}>Ronin Wallet</Typography>
                        <Typography>Your Digital Passport</Typography>
                    </Box>
                        <FormField name="password" label="enter password" errors={methods.formState.errors}>
                            <Input {...methods.register('password')} type="password" />
                        </FormField>
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            Unlock
                        </Button>
                </Box>
            </form>
        </Box>
    )
}

export default SignIn