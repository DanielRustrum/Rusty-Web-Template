import React from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'

import 'styles/globals'
import {trpc} from 'services/trpc/trpc'
import { layout, PageDataType, DefaultPageData } from './_layout'

type NextPageWithLayout = NextPage & {
    setData?: PageDataType
    setLayout?: (page: JSX.Element, props: PageDataType) => JSX.Element
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
    const setData = Component.setData?? DefaultPageData

    const getLayout = Component.setLayout ?? layout

    React.useEffect(() => {
        const style = document.getElementById('server-side-styles')
        if (style && style.parentNode) {
        style.parentNode.removeChild(style)
        }
    }, [])

    return getLayout(<Component {...pageProps} />, setData)
}

export default trpc.withTRPC(App)
