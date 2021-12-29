import { CircularProgress, Stack } from '@mui/material'
import React from 'react'

interface Props {
  status: 'idle' | 'error' | 'loading' | 'success'
}

const PageStateComponent: React.FC<Props> = ({ children, status }) => {
  return (
    <>
      {status === 'loading' && (
        <Stack justifyContent="center" alignItems="center" sx={{ minHeight: 400 }}>
          <CircularProgress />
        </Stack>
      )}
      {status === 'error' && (
        <>
          <p>Error</p>
        </>
      )}
      {status === 'success' && children}
    </>
  )
}

export default PageStateComponent
