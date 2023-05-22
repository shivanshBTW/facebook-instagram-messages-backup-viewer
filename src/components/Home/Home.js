import React from 'react'
import folderList from '../../config/folderList'
import MessageList from '../MessageList/MessageList'

function Home (props) {
  return (
    <div className='messageList-root'>
      <MessageList userList={folderList} />
    </div>
  )
}

export default Home
