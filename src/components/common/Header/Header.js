import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { matchPath, useLocation, useParams } from 'react-router-dom'

const pages = []

function Header (props) {
  const { isDarkMode, setDarkMode } = props

  const [anchorElNav, setAnchorElNav] = React.useState(null)

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleToggleDarkMode = () => {
    setDarkMode(!isDarkMode)
  }
  return (
    <AppBar position='sticky' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Container maxWidth='xl'>
        <Toolbar variant='dense' disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            INSTAGRAM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
            {pages.map(page => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Button
              onClick={handleToggleDarkMode}
              variant='contained'
              color='info'
            >
              {isDarkMode ? 'Light' : 'Dark'}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
