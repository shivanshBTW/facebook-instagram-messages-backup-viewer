import React, { useCallback } from 'react'
import { Grid, useTheme } from '@mui/material'
import { MessageItemRoot, MessageItemSenderName } from './styled'
import decodeEmojiString from '../../../utils/decodeEmojiString'
import commonConfig from '../../../config/commonConfig'

function MessageItem (props) {
  let {
    messageData: { content = '', sender_name = '' } = {},
    conversationData: { title = '', joinable_mode } = {}
  } = props

  let theme = useTheme()
  let isUserTheSender = commonConfig.userName === sender_name
  let isGroupMessage = !!joinable_mode

  let decodeEmojiStringCallback = useCallback(decodeEmojiString, [])

  return (
    <Grid item alignSelf={isUserTheSender ? 'flex-end' : undefined}>
      {!isUserTheSender && isGroupMessage && (
        <MessageItemSenderName align='left' fontSize={14}>
          {decodeEmojiStringCallback(sender_name)}
        </MessageItemSenderName>
      )}
      <MessageItemRoot
        elevation={3}
        style={{
          backgroundColor: !isUserTheSender
            ? theme.palette.primary.main
            : undefined,
          color: !isUserTheSender
            ? theme.palette.primary.contrastText
            : undefined
        }}
      >
        {decodeEmojiStringCallback(content)}
      </MessageItemRoot>
    </Grid>
  )
}

MessageItem.propTypes = {}

export default MessageItem
