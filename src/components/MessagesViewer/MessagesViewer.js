import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import MessageItem from './MessageItem/MessageItem'
import Stack from '@mui/material/Stack'
import { Grid } from '@mui/material'
import { MessagesViewerRoot } from './styled'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList } from 'react-window'
import { useWindowResize } from '../../utils/useWindowResize'
import Pagination from '@mui/material/Pagination';

function MessagesViewer (props) {
  let { userId } = useParams()

  let [conversationData, setConversationData] = useState({})
  let getMessageData = useCallback(async () => {
    let allConversationsArray = []
    let areAllFilesReadFlag = false
    try {
      let index = 1
      while (!areAllFilesReadFlag) {
        const importedConversationFileData =
          await require(`../../message-data/${userId}/message_${index}.json`)
        if (!importedConversationFileData) break
        allConversationsArray.push(importedConversationFileData)
        index++
      }
    } catch (error) {
      areAllFilesReadFlag = true
    }

    let finalConversationObject = allConversationsArray.reduce(
      (accumulatedData, currentData, index) => {
        let finalData
        if (!accumulatedData) {
          finalData = currentData
        } else {
          finalData = {
            ...accumulatedData,
            messages: [...accumulatedData.messages, ...currentData.messages]
          }
        }
        return finalData
      }
    )

    finalConversationObject.messages =
      finalConversationObject.messages.reverse()

    console.log('finalConversationObject', finalConversationObject)
    setConversationData(finalConversationObject)
  }, [userId])

  useEffect(() => {
    getMessageData()
  }, [getMessageData])

  return (
    <MessagesViewerRoot>
      <Grid
        container
        direction='column'
        justifyContent='flex-start'
        alignItems='flex-start'
        spacing={{ xs: 2, md: 3 }}
        // columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {conversationData?.messages?.map(messageData => {
          return (
            <MessageItem
              conversationData={conversationData}
              messageData={messageData}
              key={messageData.timestamp_ms}
            />
          )
        })}
      </Grid>

      <Pagination count={10} color='primary' />
    </MessagesViewerRoot>
  )
}

MessagesViewer.propTypes = {}

export default MessagesViewer
