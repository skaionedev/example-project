import { Badge } from '@mui/material'
import { styled } from '@mui/material/styles'

interface BageProps {
  status: 'warning' | 'error' | 'success'
}

export const StyledBadge = styled(Badge, {
  shouldForwardProp: prop => prop !== 'status'
})<BageProps>(props => ({
  '& .MuiBadge-badge': {
    backgroundColor:
      props.status === 'error' ? '#ff3333' : props.status === 'warning' ? '#ffa726' : '#44b700',
    color:
      props.status === 'error' ? '#ff3333' : props.status === 'warning' ? '#ffa726' : '#44b700',
    boxShadow: `0 0 0 2px ${props.theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))
