import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import React from 'react'

interface Props {
  open: boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
  title: string | JSX.Element
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  actions?: JSX.Element | JSX.Element[]
  disableBackdropClick?: boolean
}

const AppModal: React.FC<Props> = ({
  onClose,
  open,
  children,
  title,
  maxWidth = 'xs',
  fullWidth = true,
  actions,
  disableBackdropClick = false
}) => {
  const handleClose = () => {
    onClose(false)
  }
  return (
    <Dialog
      onBackdropClick={disableBackdropClick ? undefined : handleClose}
      keepMounted={disableBackdropClick}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText component={'div'}>{children}</DialogContentText>
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  )
}

export default AppModal
