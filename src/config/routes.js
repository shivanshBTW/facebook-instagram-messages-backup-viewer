import { Navigate, createBrowserRouter } from 'react-router-dom'
import Home from '../components/Home/Home'
import MessagesViewer from '../components/MessagesViewer/MessagesViewer'

let routesArray = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '',
        element: <Navigate to='/messages' replace />
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
            children: [
              {
                path: '',
                element: <Navigate to='1' replace />
              },
              { path: ':selectedPage', element: <MessagesViewer /> }
            ]
          }
        ]
      }
    ]
  }
])

export default routesArray
