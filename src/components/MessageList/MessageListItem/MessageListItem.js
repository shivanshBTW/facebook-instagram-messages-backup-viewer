import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Item } from './styled'
import { Button } from '@mui/material'

function MessageListItem (props) {
  let { folderName } = props
  let [userData, setUserData] = useState([])

  useEffect(() => {
    let setterFn = async () => {
      let importedUserData = await import(
        `../../../message-data/${folderName}/message_1.json`
      )
      // console.log('importedUserData', importedUserData)
      setUserData(importedUserData)
    }
    setterFn()
  }, [folderName])

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
