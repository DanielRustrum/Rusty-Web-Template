import React from "react"

/** Create a list of JSX Elements
 * 
 * @param list List of the data to be Iterated
 * @param template Template for the data to be applied
 * @returns A list of JSX Elements
 * 
 */
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