import { CardActionArea } from '@mui/material'
import { styled } from '@mui/material/styles'

export const FilterDrawerSearchResultItem = styled(CardActionArea)(
  ({ theme }) => ({
    padding: theme.spacing(2, 1),
    width: '100%',
    borderRadius: 5
  })
)
