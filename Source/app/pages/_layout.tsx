import React from "react"
import Head from 'next/head'
import Error404 from './404'

export interface PageDataType {
    title: string
}

export const DefaultPageData: PageDataType = {
    title: "Rusty Web Template"
}

export function StaticLayout (
    root: JSX.Element,
    data: PageDataType
): JSX.Element {
    return (
        <>
            <Head>
                <title>{data.title}</title>
            </Head>
            <main>
                {root}
            </main>
        </>
    )
}

export function OverridableLayout (
    root: JSX.Element,
    data: PageDataType
): JSX.Element {
    return root
}

export type SetLayoutType = ((
    root: JSX.Element,
    data: PageDataType
) => JSX.Element)

// Hides Page from page navigation
export default Error404