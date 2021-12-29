import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '../lib/createEmotionCache'
import { getTheme } from '../providers/theme/getTheme'
import { parseCookies } from 'nookies'
import { APP_THEME } from '@/lib/constants'
import { ITheme } from '@/providers/theme/types'

interface MyProps {
  mode: ITheme
}

export default class MyDocument extends Document<MyProps> {
  render() {
    const theme = getTheme(this.props.mode)

    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.background.default} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body style={{ background: theme.palette.background.default }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage

  const cookies = await parseCookies(ctx.res)
  const mode = (cookies[APP_THEME] as ITheme) || 'dark'

  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line react/display-name
      enhanceApp: (App: any) => props => <App emotionCache={cache} {...props} />
    })

  const initialProps = await Document.getInitialProps(ctx)

  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    mode,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags]
  }
}
