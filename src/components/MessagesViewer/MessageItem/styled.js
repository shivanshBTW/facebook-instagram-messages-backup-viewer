import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

export const MessageItemRoot = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  maxWidth: '60vw',
  textAlign: 'left'
}))

export const MessageItemSenderName = styled(Typography)(({ theme }) => ({}))

export const MessageItemImageContainer = styled('div')(({ theme }) => ({}))

export const MessageItemImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  maxHeight: '30vh'
}))

export const MessageItemLargeImageContainer = styled('div')(({ theme }) => ({}))

export const MessageItemLargeImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: '80vh'
}))
