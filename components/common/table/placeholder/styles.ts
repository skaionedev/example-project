import { LinearProgress, TableCell, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTableCell = styled(TableCell)`
  position: absolute;
  width: 100%;
  border-bottom: none;
`

export const StyledLinearProgress = styled(LinearProgress)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`

export const StyledText = styled(Typography)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`
