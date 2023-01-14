import React from "react"
import { array } from "zod"

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
export function useArrayState<ArrayType>(init_state: Array<ArrayType> = new Array<ArrayType>()): [
    () => ArrayType[],
    (value: ArrayType) => void,
    (options: {
        index?: number,
        value?: ArrayType
    }) => void,
] {
    const [array_state, setArrayState] = React.useState(init_state)
    const getArray = () => array_state
    
    const pushToArrayState = (value: ArrayType) => {
        setArrayState(prev_array => [
            ...prev_array, value
        ])
    }

    const removeFromArrayState = (options: {
        index?: number,
        value?: ArrayType
    }) => {
        setArrayState(prev_array => {
            let index: number | undefined = undefined
            
            if(options.index !== undefined) {
                index = options.index
            }
            if(options.value !== undefined) {
                index = prev_array.indexOf(options.value);

                console.log(index)

                if(index === -1)
                    index = undefined;
            }

            if(index !== undefined)
                prev_array.splice(index, 1);

            return [...prev_array]
        })
    }

    return [getArray, pushToArrayState, removeFromArrayState]
}