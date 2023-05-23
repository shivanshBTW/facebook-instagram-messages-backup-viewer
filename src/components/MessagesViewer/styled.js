import { Paper } from '@mui/material'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

export const MessagesViewerRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    padding: theme.spacing(1, 3,12),
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1, 7,12)
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(1, 15,12)
  }
}))

export const MessagesViewerPaginationBarContainer = styled(Paper)(
  ({ theme }) => ({
    padding: theme.spacing(3, 0),
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: theme.palette.primary.contrastText
  })
)

export const MessagesViewerPaginationTextField = styled(TextField)(
  ({ theme }) => ({
    width: theme.spacing(12),
    marginLeft: theme.spacing(4)
  })
)
