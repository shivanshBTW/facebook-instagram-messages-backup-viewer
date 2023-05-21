import React, { lazy, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Item } from './styled'
import { Button } from '@mui/material'

function MessageListItem (props) {
  let { folderName } = props
  let [userData, setUserData] = useState({})

  let getMessageData = useCallback(async () => {
    try {
      console.log('folderName', folderName)
      let importedUserData = await import(
        `../../../message-data/${folderName}/message_1.json`
      )
      console.log('importedUserData', importedUserData)
      setUserData(importedUserData)
    } catch (error) {}
  }, [folderName])

  useEffect(() => {
    getMessageData()
  }, [getMessageData])

  return (
    <Button
      to={folderName}
      variant='contained'
      className='messageItem'
      LinkComponent={Link}
    >
      {folderName}
      {/* {userData?.title} */}
    </Button>
  )
}

export default MessageListItem
