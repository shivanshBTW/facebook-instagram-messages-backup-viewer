import { createBrowserRouter } from 'react-router-dom'
import Home from '../components/Home/Home'
import MessagesViewer from '../components/MessagesViewer/MessagesViewer'

let routesArray = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'messages',
        children: [
          {
            path: '',
            element: <Home />
          },
          {
            path: ':userId',
            element: <MessagesViewer />
          }
        ]
      }
    ]
  }
])

export default routesArray
