import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

export const MessagesViewerRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 15)
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
    width: theme.spacing(8),
    marginLeft: theme.spacing(4)
  })
)
