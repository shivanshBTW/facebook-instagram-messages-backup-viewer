import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import decodeEmojiString from '../../../utils/decodeEmojiString'

function MessageListItem (props) {
  let { folderName } = props
  let [userData, setUserData] = useState({})

  let getMessageData = useCallback(async () => {
    const importedUserData =
      await require(`../../../message-data/${folderName}/message_1.json`)
    setUserData(importedUserData)
  }, [folderName])

  useEffect(() => {
    getMessageData()
  }, [getMessageData])

  let decodeEmojiStringCallback = useCallback(decodeEmojiString, [])

  return (
    <Button
      to={folderName}
      variant='contained'
      className='messageItem'
      LinkComponent={Link}
    >
      {decodeEmojiStringCallback(userData?.title)}
    </Button>
  )
}

export default MessageListItem
