import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

export const MessagesViewerRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    padding: theme.spacing(1, 3)
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1, 7)
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(1, 15)
  }
}))

export const MessagesViewerPaginationBarContainer = styled('div')(
  ({ theme }) => ({
    padding: theme.spacing(3, 0),
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
  })
)

export const MessagesViewerPaginationTextField = styled(TextField)(
  ({ theme }) => ({
    width: theme.spacing(12),
    marginLeft: theme.spacing(4)
  })
)
