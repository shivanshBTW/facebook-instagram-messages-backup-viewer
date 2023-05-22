import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MessageItem from './MessageItem/MessageItem'
import { Grid } from '@mui/material'
import {
  MessagesViewerPaginationBarContainer,
  MessagesViewerPaginationTextField,
  MessagesViewerRoot
} from './styled'
import Pagination from '@mui/material/Pagination'

function MessagesViewer (props) {
  let { userId } = useParams()
  let [selectedPage, setSelectedPage] = useState(2)

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
      finalConversationObject.messages.toReversed()

    console.log('finalConversationObject', finalConversationObject)
    setConversationData(finalConversationObject)
  }, [userId])

  useEffect(() => {
    getMessageData()
  }, [getMessageData])

  const handlePaginationTextChange = event => {
    setSelectedPage(event.target.value)
  }

  const handlePaginationSelectorChange = (event, value) => {
    setSelectedPage(value)
  }

  return (
    <MessagesViewerRoot>
      <Grid
        container
        direction='column'
        justifyContent='flex-start'
        alignItems='flex-start'
        spacing={{ xs: 2, md: 3 }}
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

      <MessagesViewerPaginationBarContainer>
        <Pagination
          showFirstButton
          showLastButton
          count={10}
          color='primary'
          size='large'
          shape='rounded'
          variant='outlined'
          name='pagination-selector'
          page={selectedPage}
          onChange={handlePaginationSelectorChange}
        />
        <MessagesViewerPaginationTextField
          type='number'
          label='Page'
          id='outlined-size-small'
          size='small'
          name='pagination-text-input'
          value={selectedPage}
          onChange={handlePaginationTextChange}
        />
      </MessagesViewerPaginationBarContainer>
    </MessagesViewerRoot>
  )
}

MessagesViewer.propTypes = {}

export default MessagesViewer
