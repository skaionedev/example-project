import { createTheme } from '@mui/material/styles'

export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        // main: '#2869E9'
        // main: mode === 'dark' ? '#90CAF9' : '#3BAFDA'
        // main: '#3BAFDA',
        main: '#2196f3',
        dark: '#1769aa',
        light: '#4dabf5',
        contrastText: '#fff'
        // contrastText: mode === 'dark' ? '#fff' : '#222'
      },
      success: {
        main: '#66BB6A'
      },
      info: {
        main: '#90CAF9'
      },
      secondary: {
        main: '#19857b'
      },
      error: {
        main: '#ff3333'
      },

      background: {
        paper: mode === 'dark' ? '#22272E' : '#fcfcfc',
        default: mode === 'dark' ? '#1C2128' : '#F6F8FA'
      }
    },
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            background: mode === 'dark' ? '#1C2128' : '#F6F8FA'
          }
        }
      },

      MuiTableCell: {
        styleOverrides: {
          head: {
            userSelect: 'none'
          },
          stickyHeader: {
            background: mode === 'dark' ? '#22272E' : '#F6F8FA'
          }
        }
      },
      MuiChip: {}
    },

    typography: {
      button: {
        textTransform: 'none'
      }
    }
  })
}
