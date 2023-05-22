import React, { useCallback, useEffect, useState } from 'react'
import { Grid, useTheme } from '@mui/material'
import {
  MessageItemImage,
  MessageItemImageContainer,
  MessageItemLargeImage,
  MessageItemLargeImageContainer,
  MessageItemRoot,
  MessageItemSenderName
} from './styled'
import decodeEmojiString from '../../../utils/decodeEmojiString'
import commonConfig from '../../../config/commonConfig'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

function MessageItem (props) {
  //   let { userId } = useParams()
  let {
    messageData: { content = '', sender_name = '', photos = [] } = {},
    conversationData: { joinable_mode } = {}
  } = props

  let theme = useTheme()
  let isUserTheSender = commonConfig.userName === sender_name
  let isGroupMessage = !!joinable_mode

  let decodeEmojiStringCallback = useCallback(decodeEmojiString, [])

  const [imageFileArray, setImageFileArray] = useState([])
  useEffect(() => {
    Promise.all(
      photos.map(async (photoData, index) => {
        let { uri, creation_timestamp } = photoData
        let imageURI = uri.replace('messages/inbox/', '')
        let imageFile = await require(`../../../message-data/${imageURI}`)
        return { uri: imageFile, creation_timestamp }
      })
    ).then(photosArray => {
      setImageFileArray(photosArray)
    })
  }, [photos?.length ? photos[0] : undefined])
  console.log('imageFileArray', imageFileArray)

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
        <MessageItemSenderName align='left' fontSize={14}>
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
        {content && decodeEmojiStringCallback(content)}
        {imageFileArray.length
          ? imageFileArray.map((photoData, index) => {
              let { uri, creation_timestamp } = photoData
              return (
                <MessageItemImageContainer key={creation_timestamp}>
                  <MessageItemImage
                    src={uri}
                    alt={decodeEmojiStringCallback(sender_name) + "'s post"}
                    onClick={handleImageViewerOpen(photoData)}
                  />
                </MessageItemImageContainer>
              )
            })
          : null}
      </MessageItemRoot>

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
