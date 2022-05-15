import { styled, TextField } from '@mui/material'

const Input = styled(TextField)({
    width: '100%',
    '& .MuiInputBase-root.Mui-disabled': {
        background: '#EDF1F7',
        '& *': {
            color: '#8F9BB3 !important'
        }
    },
    '& input': {
        height: 40,
        padding: '0 16px',
    },
    '& .MuiInputBase-root': {
        borderRadius: 8
    }
})

export default Input