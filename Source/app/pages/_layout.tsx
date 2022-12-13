import React from "react"
import Head from 'next/head'
import Error404 from './404'

export interface PageDataType {
    title: string
}

export const DefaultPageData: PageDataType = {
    title: "Rusty Web Template"
}

export function layout (
    page: JSX.Element,
    props: PageDataType
) {
    return (
        <>
            <Head>
                <title>{props.title}</title>
            </Head>
            {page}
        </>
    )
}

export type SetLayoutType = ((
    page: JSX.Element,
    props: PageDataType
) => JSX.Element)

// Hides Page from page navigation
export default Error404