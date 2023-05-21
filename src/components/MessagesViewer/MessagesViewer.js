import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

function MessagesViewer (props) {
  let { userId } = useParams()
  return <div>MessagesViewer {userId}</div>
}

MessagesViewer.propTypes = {}

export default MessagesViewer
