import React from "react"

/** Creates an array of React elements from a list of data.
 *
 * @param list - An array of data to be transformed into React elements
 * @param template - A function that takes a value from the list and its index, and returns a React element
 * @returns An array of React elements
 */
export function ElementList<DataType>(
    list: Array<DataType>, 
    template: (value: DataType, index: number) => React.ReactNode
): React.ReactNode[] {
    let result: React.ReactNode[] = []
    list.forEach((value, index) => {
        result.push(template(value, index))
    })
    return result
}