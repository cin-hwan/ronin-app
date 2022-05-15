import { CloseRounded } from '@mui/icons-material'
import { Box, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { forwardRef, useCallback, useMemo, useState } from 'react'

const useStyles = makeStyles({
    dialog: {
        padding: '8px 0',
        borderRadius: '16px !important',
        height: '100%'
    },
    header: {
        display: 'grid',
        padding: '12px 20px !important',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        borderBottom: '1px solid #C5CEE0'
    },
    dialogTitle: {
        gridColumnStart: 2
    },
    dialogContent: {
        padding: '10px 0 !important'
    },
    closeBtn: {
        float: 'right',
        width: 14,
        height: 14
    },
    option: {
        cursor: 'pointer',
        padding: '10px 20px',
        '&:hover': {
            background: '#EDF1F7'
        }
    }
})

const SelectMenu = ({ options = [], isOpen, onClose, optionComponent: OptionComponent, onSelect }) => {
    const classes = useStyles()

    const onClickOption = useCallback((e) => {
        const element = e.currentTarget
        const value = element.getAttribute('data-value')
        onSelect?.(value)
        onClose()
    }, [onClose, onSelect])

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm" classes={{
            paper: classes.dialog
        }}>
            <DialogTitle className={classes.header}>
                <Typography
                    className={classes.dialogTitle}
                    variant="body2"
                    fontWeight={600}
                >
                        Assets
                </Typography>
                <Box>
                    <IconButton className={classes.closeBtn} onClick={onClose}>
                        <CloseRounded sx={{ width: 14, height: 14 }} />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                {options.map(
                    option => (
                        <Box
                            key={option.value}
                            data-value={option.value}
                            className={classes.option}
                            onClick={onClickOption}
                        >
                            {OptionComponent ? 
                                <OptionComponent option={option} />
                                : <Typography variant="body2">{option.label}</Typography>}
                        </Box>
                    )
                )}
            </DialogContent>
        </Dialog>
    )
}

const Select = ({ options = [], optionComponent, value, onChange, ...props }, ref) => {
    const [isOpen, setOpen] = useState(false)

    const onClose = useCallback(() => setOpen(false), [])
    const onOpen = useCallback(() => setOpen(true), [])

    const selected = useMemo(() => options.find(option => option.value === value), [options, value])

    const onKeyDown = useCallback((e) => {
        e.preventDefault()
    }, [])

    return (
        <>
            <SelectMenu
                isOpen={isOpen}
                onClose={onClose}
                options={options}
                optionComponent={optionComponent}
                onSelect={onChange}
            />
            <TextField
                ref={ref}
                autoFocus={false}
                {...props}
                value={selected?.label}
                onKeyDown={onKeyDown}
                onClick={onOpen}
            />
        </>
    )
}

export default forwardRef(Select)