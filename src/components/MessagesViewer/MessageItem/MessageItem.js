import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Grid, Paper, useTheme } from '@mui/material'
import { Buffer } from 'buffer'
import { MessageItemRoot } from './styled'

function MessageItem (props) {
  let {
    messageData: { content = '', sender_name = '' } = {},
    conversationData: { title = '' } = {}
  } = props

  let theme = useTheme()
  let isReceiverTheSenderFlag = title === sender_name

  let decodeFBString = useCallback(str => {
    let arr = []
    for (var i = 0; i < str.length; i++) {
      arr.push(str.charCodeAt(i))
    }
    return Buffer.from(arr).toString('utf8')
  }, [])

  return (
    <Grid item alignSelf={!isReceiverTheSenderFlag ? 'flex-end' : undefined}>
      <MessageItemRoot
        elevation={3}
        style={{
          backgroundColor: isReceiverTheSenderFlag
            ? theme.palette.primary.main
            : undefined,
          color: isReceiverTheSenderFlag
            ? theme.palette.primary.contrastText
            : undefined
        }}
      >
        {decodeFBString(content)}
      </MessageItemRoot>
    </Grid>
  )
}

MessageItem.propTypes = {}

export default MessageItem
