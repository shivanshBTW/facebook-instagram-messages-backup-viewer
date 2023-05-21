import React from 'react'
import MessageListItem from './MessageListItem/MessageListItem'
import Stack from '@mui/material/Stack'
import { MessageListRoot } from './styled'

function MessageList (props) {
  let { userList } = props
  return (
    <MessageListRoot>
      <Stack spacing={1}>
        {userList.map(folderName => {
          return <MessageListItem folderName={folderName} key={folderName} />
        })}
      </Stack>
    </MessageListRoot>
  )
}

export default MessageList
