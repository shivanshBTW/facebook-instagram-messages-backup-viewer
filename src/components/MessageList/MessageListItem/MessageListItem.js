import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

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

  return (
    <Button
      to={folderName}
      variant='contained'
      className='messageItem'
      LinkComponent={Link}
    >
      {userData?.title}
    </Button>
  )
}

export default MessageListItem
