import React, { useCallback, useEffect, useState } from 'react'
import { Grid, Typography, useTheme } from '@mui/material'
import {
  MessageItemContent,
  MessageItemDateTimeString,
  MessageItemImage,
  MessageItemImageContainer,
  MessageItemLargeImage,
  MessageItemLargeImageContainer,
  MessageItemReaction,
  MessageItemReactionsContainer,
  MessageItemRoot,
  MessageItemSenderName,
  MessageItemAudioVideo,
  MessageItemAudioVideoContainer,
  MessageItemSharedInstagramMedia,
  MessageItemCallDuration,
  MessageItemSharedLinkAccountName
} from './styled'
import decodeEmojiString from '../../../utils/decodeEmojiString'
import commonConfig from '../../../config/commonConfig'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import stringIncludesArrayOfStrings from '../../../utils/stringIncludesArrayOfStrings'
import toHoursAndMinutes from '../../../utils/toHoursAndMinutes'

function MessageItem (props) {
  let {
    messageData: {
      content = '',
      sender_name = '',
      videos,
      photos,
      audio_files,
      timestamp_ms,
      reactions,
      share: sharedMedia,
      call_duration,
      users
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

  const [callDuration, setCallDuration] = useState()
  useEffect(() => {
    if (!call_duration) return
    setCallDuration(toHoursAndMinutes(call_duration))
  }, [call_duration])

  useEffect(() => {
    handlePullFilesData(videos || photos || audio_files)
  }, [
    photos,
    videos,
    audio_files
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
          {callDuration && (
            <MessageItemCallDuration>
              <Typography
                align={isUserTheSender ? 'right' : 'left'}
                fontSize={14 + extraFontSize}
              >
                The call lasted for {callDuration.h}:{callDuration.m}:
                {callDuration.s} hours
              </Typography>
            </MessageItemCallDuration>
          )}
          {filesDataArray.length
            ? filesDataArray.map((fileData, index) => {
                let { uri, creation_timestamp } = fileData
                if (videos?.length || audio_files?.length) {
                  return (
                    <MessageItemAudioVideoContainer key={creation_timestamp}>
                      <MessageItemAudioVideo
                        controls
                        url={uri}
                        alt={decodeEmojiStringCallback(sender_name) + "'s post"}
                        width='unset'
                        height={audio_files?.length ? 'unset' : undefined}
                      />
                    </MessageItemAudioVideoContainer>
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
                }
              })
            : null}

          {sharedMedia?.link ? (
            <MessageItemSharedInstagramMedia>
              {sharedMedia.link.includes('instagram') ? (
                <>
                  <a
                    href={`https://www.instagram.com/${sharedMedia.original_content_owner}/`}
                    target='_blank'
                    rel='noreferrer'
                    style={{ textDecoration: 'none' }}
                  >
                    <MessageItemSharedLinkAccountName
                      fontWeight={'bold'}
                      color={'black'}
                      fontSize={16 + extraFontSize}
                    >
                      {decodeEmojiStringCallback(
                        sharedMedia.original_content_owner
                      )}
                    </MessageItemSharedLinkAccountName>
                  </a>
                  <Typography fontSize={16 + extraFontSize}>
                    {decodeEmojiStringCallback(sharedMedia.share_text)}
                  </Typography>
                  <hr />
                </>
              ) : null}

              {stringIncludesArrayOfStrings(sharedMedia.link, [
                'youtu',
                'facebook',
                'fb',
                'soundcloud',
                'twitch'
              ]) ? (
                <MessageItemAudioVideoContainer>
                  <MessageItemAudioVideo
                    controls
                    url={sharedMedia.link}
                    alt={decodeEmojiStringCallback(sender_name) + "'s post"}
                    width='unset'
                    height={audio_files?.length ? 'unset' : undefined}
                  />
                </MessageItemAudioVideoContainer>
              ) : (
                <a href={sharedMedia.link} target='_blank' rel='noreferrer'>
                  {sharedMedia.link}
                </a>
              )}
            </MessageItemSharedInstagramMedia>
          ) : null}

          {!content && !filesDataArray.length && !sharedMedia?.link ? (
            <div style={{ fontStyle: 'italic' }}>Empty Message</div>
          ) : null}
        </MessageItemContent>

        {reactions?.length ? (
          <MessageItemReactionsContainer
            style={
              isUserTheSender
                ? {
                    left: 'unset',
                    right: '100%'
                  }
                : undefined
            }
          >
            {reactions.map((reactionData, index) => {
              let { reaction, actor } = reactionData
              return (
                <MessageItemReaction key={actor} elevation={8}>
                  {actor} {decodeEmojiStringCallback(reaction)}
                </MessageItemReaction>
              )
            })}
          </MessageItemReactionsContainer>
        ) : null}
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
