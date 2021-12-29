export type AppThemeContextType = {
  mode: ITheme
  toggleTheme: () => void
}

export type ITheme = 'dark' | 'light'

import { Theme as EmotionTheme } from '@emotion/react/macro'
import { Theme as MaterialUITheme } from '@material-ui/core'

// Re-declare the emotion theme to have the properties of the MaterialUiTheme
declare module '@emotion/react' {
  export interface Theme extends MaterialUITheme {}
}
