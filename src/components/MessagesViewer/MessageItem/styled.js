import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

export const MessageItemRoot = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1, 1),
  maxWidth: '60vw',
  textAlign: 'left'
}))

export const MessageItemContent = styled(Typography)(({ theme }) => ({}))

export const MessageItemSenderName = styled(Typography)(({ theme }) => ({}))

export const MessageItemImageContainer = styled('div')(({ theme }) => ({}))

export const MessageItemImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  maxHeight: '30vh'
}))

export const MessageItemVideoContainer = styled('div')(({ theme }) => ({}))

export const MessageItemVideo = styled('video')(({ theme }) => ({
  maxWidth: '100%',
  maxHeight: '50vh'
}))

export const MessageItemAudioContainer = styled('div')(({ theme }) => ({}))

export const MessageItemAudio = styled('audio')(({ theme }) => ({
  maxWidth: '100%',
  maxHeight: '50vh'
}))

export const MessageItemLargeImageContainer = styled('div')(({ theme }) => ({}))

export const MessageItemLargeImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: '80vh'
}))

export const MessageItemDateTimeString = styled(Typography)(({ theme }) => ({}))
