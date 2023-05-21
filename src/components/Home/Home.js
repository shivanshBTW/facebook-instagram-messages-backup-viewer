import React from 'react'
import Header from '../common/Header/Header'
import folderList from '../../message-data/folderList'
import MessageList from '../MessageList/MessageList'

function Home (props) {
  return (
    <div className='messageList-root'>
      <MessageList userList={folderList} />
    </div>
  )
}

export default Home
