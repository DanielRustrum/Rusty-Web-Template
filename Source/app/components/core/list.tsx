import React from "react"

export function ElementList<DataType>(
    list: Array<DataType>, 
    template: (key: string, value: DataType, index: number) => React.ReactNode
): React.ReactNode[] {
    let result: React.ReactNode[] = []
    list.forEach((value, index) => {
        result.push(template(index.toString(), value, index))
    })
    return result
}