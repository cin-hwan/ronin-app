import { styled, TextField } from '@mui/material'

const Input = styled(TextField)({
    width: '100%',
    '& input': {
        height: 40,
        padding: '0 16px'
    },
    '& .MuiInputBase-root': {
        borderRadius: 8
    }
})

export default Input