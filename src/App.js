import './App.scss'
import '@fontsource/montserrat/300.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/700.css'

import Header from './components/common/Header/Header'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import routesArray from './config/routes'
import router from './config/routes'
import { Paper, ThemeProvider, createTheme } from '@mui/material'
import { useState } from 'react'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function App () {
  const [isDarkMode, setDarkMode] = useState(true)
  // console.log('router', router)
  // const router = createBrowserRouter(routesArray)
  return (
    <div className='App'>
      <ThemeProvider theme={isDarkMode && darkTheme}>
        <Paper >
          <Header isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
          <RouterProvider router={router} />
        </Paper>
      </ThemeProvider>
    </div>
  )
}

export default App
