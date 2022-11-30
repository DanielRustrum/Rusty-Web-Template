import React from "react"
import dynamic from "next/dynamic"

export function LazyImportComponent({
    component_path
}: {
    component_path: string
}): JSX.Element {
    const ImportedElement = dynamic(() => import(`../${component_path}`), {
        suspense: true
    })

    return(
        <React.Suspense>
            <ImportedElement/>
        </React.Suspense>
    )
}