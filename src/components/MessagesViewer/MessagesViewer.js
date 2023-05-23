import { Grid, TextField } from '@mui/material'
import {
  MessagesViewerPaginationBarContainer,
  MessagesViewerPaginationTextField,
  MessagesViewerRoot
} from './styled'
import React, { useCallback, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import MessageItem from './MessageItem/MessageItem'
import Pagination from '@mui/material/Pagination'
import Toolbar from '@mui/material/Toolbar'
import commonConfig from '../../config/commonConfig'
import { useParams } from 'react-router-dom'

function MessagesViewer (props) {
  const { userId } = useParams()
  const { drawerWidth, itemsPerPage: itemsPerPageConfig } = commonConfig
  const [selectedPage, setSelectedPage] = useState(1)
  const [itemsPerPage] = useState(itemsPerPageConfig)
  const [conversationData, setConversationData] = useState({})
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [isFilterDrawerOpenFlag, setIsFilterDrawerOpenFlag] = useState(true)
  const [searchText, setSearchText] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])

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
    setTotalPageCount(
      Math.ceil(finalConversationObject?.messages?.length / itemsPerPage)
    )
    setConversationData(finalConversationObject)
  }, [userId, itemsPerPage])

  useEffect(() => {
    getMessageData()
  }, [getMessageData])

  const handlePaginationTextChange = event => {
    setSelectedPage(event.target.value)
  }

  const handleSetSearchText = event => {
    setSearchText(event.target.value)
  }

  const handlePaginationSelectorChange = (event, value) => {
    setSelectedPage(value)
  }

  const handleFilterDrawerClose = () => {
    setIsFilterDrawerOpenFlag(false)
  }

  const pageStartMessageIndex = (selectedPage - 1) * itemsPerPage
  const pageEndMessageIndex = pageStartMessageIndex + itemsPerPage

  return (
    <MessagesViewerRoot>
      <Grid
        container
        direction='column'
        justifyContent='flex-start'
        alignItems='flex-start'
        spacing={{ xs: 2, md: 3 }}
      >
        {conversationData?.messages
          ?.slice(pageStartMessageIndex, pageEndMessageIndex)
          .map(messageData => {
            return (
              <MessageItem
                conversationData={conversationData}
                messageData={messageData}
                key={messageData.timestamp_ms}
              />
            )
          })}
      </Grid>

      {totalPageCount > 1 && (
        <MessagesViewerPaginationBarContainer>
          <Pagination
            showFirstButton
            showLastButton
            count={totalPageCount}
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
            sx={{ minWidth: `${totalPageCount.toString().length}ch` }}
          />
        </MessagesViewerPaginationBarContainer>
      )}

      <Drawer
        anchor={'right'}
        open={isFilterDrawerOpenFlag}
        onClose={handleFilterDrawerClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
      >
        <Toolbar variant='dense' disableGutters />
        <Box sx={{ overflow: 'auto', padding: 2 }}>
          <TextField
            type='text'
            label='Search'
            value={searchText}
            onChange={handleSetSearchText}
          />
        </Box>
      </Drawer>
    </MessagesViewerRoot>
  )
}

MessagesViewer.propTypes = {}

export default MessagesViewer
