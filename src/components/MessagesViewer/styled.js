import { Paper } from '@mui/material'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

export const MessagesViewerRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    padding: theme.spacing(2, 3, 18)
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2, 7, 18)
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(1, 15, 13)
  }
}))

export const MessagesViewerPaginationBarContainer = styled(Paper)(
  ({ theme }) => ({
    padding: theme.spacing(3, 0),
    textAlign: 'center',
    display: 'flex',
    position: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: theme.palette.primary.contrastText,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(1)
    },
    '.MuiPagination-ul': {
      justifyContent: 'center'
    }
  })
)

export const MessagesViewerPaginationTextField = styled(TextField)(
  ({ theme }) => ({
    width: theme.spacing(12),
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  })
)
