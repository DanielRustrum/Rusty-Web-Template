import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import React from 'react'
import {trpc} from '../services/trpc/trpc'

function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const style = document.getElementById('server-side-styles')
    if (style && style.parentNode) {
      style.parentNode.removeChild(style)
    }
  }, [])

  return <Component {...pageProps} />
}

export default trpc.withTRPC(App)
