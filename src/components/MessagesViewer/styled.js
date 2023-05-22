import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

export const MessagesViewerRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 15)
  //   maxWidth: '60vw'
}))

export const MessagesViewerPaginationBarContainer = styled('div')(
  ({ theme }) => ({
    padding: theme.spacing(3, 0),
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
    //   maxWidth: '60vw'
  })
)

export const MessagesViewerPaginationTextField = styled(TextField)(
  ({ theme }) => ({
    width: theme.spacing(8),
    marginLeft: theme.spacing(4)
  })
)
