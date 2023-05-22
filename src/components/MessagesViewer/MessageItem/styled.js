import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

export const MessageItemRoot = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  maxWidth: '60vw',
  textAlign: 'left'
}))

export const MessageItemSenderName = styled(Typography)(({ theme }) => ({}))
