import React from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'

import 'styles/globals'
import {trpc} from 'services/trpc/trpc'

import Head from 'next/head'

interface PageDataType {
    title: string
}

type NextPageWithLayout = NextPage & {
    setData?: () => PageDataType
    setLayout?: (page: JSX.Element, props: PageDataType) => JSX.Element
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
    const setData = Component.setData?? (() => {return{
        title: "Rusty Web Template"
    }})

    const getLayout = Component.setLayout ?? (
        (page, props) => <>
            <Head>
                <title>{props.title}</title>
            </Head>
            {page}
        </>
    )

    React.useEffect(() => {
        const style = document.getElementById('server-side-styles')
        if (style && style.parentNode) {
        style.parentNode.removeChild(style)
        }
    }, [])

    return getLayout(<Component {...pageProps} />, setData())
}

export default trpc.withTRPC(App)
