import React, { useCallback, useEffect, useState } from 'react'
import { Grid, useTheme } from '@mui/material'
import {
  MessageItemAudio,
  MessageItemAudioContainer,
  MessageItemContent,
  MessageItemDateTimeString,
  MessageItemImage,
  MessageItemImageContainer,
  MessageItemLargeImage,
  MessageItemLargeImageContainer,
  MessageItemRoot,
  MessageItemSenderName,
  MessageItemVideo,
  MessageItemVideoContainer
} from './styled'
import decodeEmojiString from '../../../utils/decodeEmojiString'
import commonConfig from '../../../config/commonConfig'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

function MessageItem (props) {
  let {
    messageData: {
      content = '',
      sender_name = '',
      videos,
      photos,
      audio_files,
      timestamp_ms
    } = {},
    conversationData: { joinable_mode } = {}
  } = props

  let { extraFontSize } = commonConfig

  let theme = useTheme()
  let isUserTheSender = commonConfig.userName === sender_name
  let isGroupMessage = !!joinable_mode

  let decodeEmojiStringCallback = useCallback(decodeEmojiString, [])

  const [filesDataArray, setFilesDataArray] = useState([])

  let handlePullFilesData = filesArray => {
    Promise.all(
      filesArray?.map(async (fileData, index) => {
        let { uri, creation_timestamp } = fileData
        let imageURI = uri.replace('messages/inbox/', '')
        let imageFile = await require(`../../../message-data/${imageURI}`)
        return { uri: imageFile, creation_timestamp }
      }) || []
    ).then(photosArray => {
      setFilesDataArray(photosArray)
    })
  }

  useEffect(() => {
    handlePullFilesData(videos || photos || audio_files)
  }, [
    photos,
    videos,
    audio_files
    // photos?.length ? photos[0] : undefined,
    // videos?.length ? videos[0] : undefined
  ])

  const [largeImageData, setLargeImageData] = useState()
  const handleImageViewerOpen = photoData => () => {
    setLargeImageData(photoData)
  }
  const handleImageViewerClose = () => {
    setLargeImageData(undefined)
  }

  return (
    <Grid item alignSelf={isUserTheSender ? 'flex-end' : undefined}>
      {!isUserTheSender && isGroupMessage && (
        <MessageItemSenderName
          align={isUserTheSender ? 'right' : 'left'}
          fontSize={14 + extraFontSize}
        >
          {decodeEmojiStringCallback(sender_name)}
        </MessageItemSenderName>
      )}
      <MessageItemRoot
        elevation={3}
        style={
          !isUserTheSender
            ? {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText
              }
            : undefined
        }
      >
        {/* reel: train pencture ho gya */}

        <MessageItemContent
          align={isUserTheSender ? 'right' : 'left'}
          fontSize={16 + extraFontSize}
        >
          {content && decodeEmojiStringCallback(content)}
          {filesDataArray.length
            ? filesDataArray.map((fileData, index) => {
                let { uri, creation_timestamp } = fileData
                if (videos?.length) {
                  return (
                    <MessageItemVideoContainer key={creation_timestamp}>
                      <MessageItemVideo
                        controls
                        src={uri}
                        alt={decodeEmojiStringCallback(sender_name) + "'s post"}
                        //   onClick={handleImageViewerOpen(fileData)}
                      />
                    </MessageItemVideoContainer>
                  )
                } else if (photos?.length) {
                  return (
                    <MessageItemImageContainer key={creation_timestamp}>
                      <MessageItemImage
                        src={uri}
                        alt={decodeEmojiStringCallback(sender_name) + "'s post"}
                        onClick={handleImageViewerOpen(fileData)}
                      />
                    </MessageItemImageContainer>
                  )
                } else {
                  return (
                    <MessageItemAudioContainer key={creation_timestamp}>
                      <MessageItemAudio
                        controls
                        src={uri}
                        alt={decodeEmojiStringCallback(sender_name) + "'s post"}
                        onClick={handleImageViewerOpen(fileData)}
                      />
                    </MessageItemAudioContainer>
                  )
                }
              })
            : null}
        </MessageItemContent>
      </MessageItemRoot>

      <MessageItemDateTimeString
        align={isUserTheSender ? 'right' : 'left'}
        fontSize={14 + extraFontSize}
      >
        {new Date(timestamp_ms).toLocaleString()}
      </MessageItemDateTimeString>

      <Dialog
        open={!!largeImageData}
        onClose={handleImageViewerClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {decodeEmojiStringCallback(sender_name)}'s post
        </DialogTitle>
        <DialogContent>
          <MessageItemLargeImageContainer>
            <MessageItemLargeImage
              src={largeImageData?.uri}
              alt={decodeEmojiStringCallback(sender_name) + "'s post"}
            />
          </MessageItemLargeImageContainer>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

MessageItem.propTypes = {}

export default MessageItem
