import React, { useCallback, useEffect, useRef } from 'react'
import { Grid, useTheme } from '@mui/material'
import { MessageItemRoot } from './styled'
import decodeEmojiString from '../../../utils/decodeEmojiString'
import commonConfig from '../../../config/commonConfig'

function MessageItem (props) {
  let {
    messageData: { content = '', sender_name = '' } = {},
    conversationData: { title = '' } = {}
  } = props

  let theme = useTheme()
  let isUserTheSender = commonConfig.userName === sender_name

  let decodeEmojiStringCallback = useCallback(decodeEmojiString, [])

  return (
    <Grid item alignSelf={isUserTheSender ? 'flex-end' : undefined}>
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
