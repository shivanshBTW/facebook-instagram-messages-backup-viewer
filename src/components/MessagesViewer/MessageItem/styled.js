import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

export const MessageItemRoot = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  maxWidth: '60vw',
  textAlign: 'left'
}))
