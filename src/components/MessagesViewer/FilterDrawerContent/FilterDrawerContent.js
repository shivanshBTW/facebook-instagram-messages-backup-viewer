import { TextField } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { filter } from 'smart-array-filter'
import { FilterDrawerSearchResultItem } from './styled'
import { Stack } from '@mui/system'
import decodeEmojiString from '../../../utils/decodeEmojiString'

function FilterDrawerContent (props) {
  let {
    searchText,
    handleSetSearchText,
    conversationData,
    searchResults,
    setSearchResults,
    handleFilterMessageOpen
  } = props

  const handleFilterSearchList = () => {
    if (!conversationData?.messages?.length || !searchText) return
    let filteredSearchData = filter(conversationData.messages, {
      keywords: searchText,
      limit: 30
    })
    setSearchResults(filteredSearchData)
  }

  useEffect(handleFilterSearchList, [
    searchText,
    conversationData,
    setSearchResults
  ])
  let decodeEmojiStringCallback = useCallback(decodeEmojiString, [])

  const findSearchItemIndex = searchItem => {
    return conversationData.messages.findIndex(messageData => {
      return searchItem.timestamp_ms === messageData.timestamp_ms
    })
  }

  const handleSearchItemClick = searchItem => () => {
    let index = findSearchItemIndex(searchItem)
    handleFilterMessageOpen(index)
  }

  return (
    <>
      <Toolbar variant='dense' disableGutters />
      <Box sx={{ overflow: 'auto', padding: 2 }}>
        <TextField
          fullWidth
          type='text'
          label='Search'
          value={searchText}
          onChange={handleSetSearchText}
          variant='filled'
          size='small'
        />

        <Stack spacing={1} sx={{ my: 1 }}>
          {searchResults.map((filteredItemData, index) => {
            return (
              <FilterDrawerSearchResultItem
                onClick={handleSearchItemClick(filteredItemData)}
              >
                {decodeEmojiStringCallback(filteredItemData.content)}
              </FilterDrawerSearchResultItem>
            )
          })}
        </Stack>
      </Box>
    </>
  )
}

export default FilterDrawerContent
