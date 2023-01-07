import React from "react"

/** A custom React hook for managing state in a map.
 *
 * @returns A tuple containing two functions:
 * - The first function is used to retrieve the value associated with a given key in the map.
 * - The second function is used to update the value associated with a given key in the map.
 */
export function useMapState<Key, Value>(): [
    (key:Key) => Value | undefined,
    (key:Key, value:Value) => void
] {
    const [map_state, setMapState] = React.useState(new Map<Key, Value>())

    const getMapState = (key: Key) => {
        return map_state.get(key)
    }

    const updateMap = (key: Key, value: Value) => {
        setMapState(
            new Map(map_state.set(key, value))
        )
    }

    return [getMapState, updateMap]
}

/**
 * A custom React hook for managing state in an array.
 *
 * @returns A tuple containing four functions:
 * - The first function is used to retrieve the current state of the array.
 * - The second function is used to append a value to the end of the array.
 * - The third function is used to remove a value at a given index from the array.
 * - The fourth function is used to remove and return the last value from the array.
 */
export function useArrayState<ArrayType>(): [
    readonly ArrayType[],
    (value: ArrayType) => void,
    (index: number) => void,
    () => (ArrayType | undefined),
] {
    const [array_state, setArrayState] = React.useState(new Array<ArrayType>())
    const pushToArrayState = (value: ArrayType) => {
        setArrayState(prev_array => [
            ...prev_array, value
        ])
    }
    const popFromArrayState = () => {
        let popped_value: ArrayType | undefined

        setArrayState(prev_array => {
            popped_value = prev_array.pop()
            return [...prev_array]
        })

        return popped_value
    }

    const spliceFromArrayState = (index: number) => {

        setArrayState(prev_array => {
            if (array_state.length === 0) return [];

            prev_array.splice(index, 1)
            return [...prev_array]
        })
    }

    return [array_state, pushToArrayState, spliceFromArrayState, popFromArrayState]
}