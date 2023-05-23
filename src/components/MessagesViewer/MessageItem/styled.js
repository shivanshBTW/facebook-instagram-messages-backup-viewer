import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import ReactPlayer from 'react-player'

export const MessageItemRoot = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1, 1),
  maxWidth: '60vw',
  textAlign: 'left',
  position: 'relative',
  overflow:'hidden'
}))

export const MessageItemContent = styled(Typography)(({ theme }) => ({}))

export const MessageItemCallDuration = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.5, 1)
}))

export const MessageItemSenderName = styled(Typography)(({ theme }) => ({}))

export const MessageItemImageContainer = styled('div')(({ theme }) => ({}))

export const MessageItemImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  maxHeight: '30vh'
}))

export const MessageItemAudioVideoContainer = styled('div')(({ theme }) => ({}))

export const MessageItemAudioVideo = styled(ReactPlayer)(({ theme }) => ({
  maxWidth: '100%',
  maxHeight: '50vh'
}))

export const MessageItemLargeImageContainer = styled('div')(({ theme }) => ({}))

export const MessageItemLargeImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: '80vh'
}))

export const MessageItemSharedInstagramMedia = styled('div')(
  ({ theme }) => ({})
)

export const MessageItemSharedLinkAccountName = styled(Typography)(
  ({ theme }) => ({
    color: theme.palette.primary.contrastText
  })
)

export const MessageItemDateTimeString = styled(Typography)(({ theme }) => ({}))

export const MessageItemReactionsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  position: 'absolute',
  top: '50%',
  left: '100%',
  transform: 'translate(0, -50%)',
  width: 'max-content',
  maxWidth: '40vw',
  flexWrap: 'wrap',
  margin: theme.spacing(0, 1)
}))

export const MessageItemReaction = styled(Paper)(({ theme }) => ({
  width: 'fit-content',
  padding: theme.spacing(0.5, 1)
}))
