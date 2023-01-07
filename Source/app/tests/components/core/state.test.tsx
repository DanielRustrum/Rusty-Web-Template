import { expect, test, describe } from 'vitest'
import { useMapState, useArrayState } from '../../../components/core/state/data'
import {render} from '@testing-library/react'
import React from 'react'

describe('useMapState', () => {
    test('should initialize the state with an empty map', () => {
        let value: number | undefined = 0
        const Component = () => {
            const [getValue] = useMapState<string, number>()
            value = getValue('key')

            return (<></>)
        }
        
        render(<Component />)
        expect(value).toBeUndefined()
    })

    test('should set and get values from the map', () => {
        let value: number | undefined = 0

        const Component = () => {
            const [getValue, setValue] = useMapState<string, number>()
            React.useEffect(() => {
                setValue('key', 1)
            }, [])
            value = getValue('key')
            return (<></>)
        }

        render(<Component />)
        expect(value).toBe(1)
    })

    test('should update values in the map', () => {
        let value: number | undefined = 0

        const Component = () => {
            const [getValue, setValue] = useMapState<string, number>()
            React.useEffect(() => {
                setValue('key', 1)
                setValue('key', 2)
            }, [])
            value = getValue('key')
            return (<></>)
        }
        
        render(<Component />)
        expect(value).toBe(2)  
    })
})


describe('useArrayState', () => {
    test('should initialize the state with an empty array', () => {
        let value: number | undefined | readonly number[] = 0
        const Component = () => {
            const [array] = useArrayState<number>()
            React.useEffect(() => {}, [])
            value = array
            return <></>
        }

        render(<Component />)
        expect(value).toEqual([])
    })

    test('should append values to the array', () => {
        let value: number | undefined | readonly number[] = 0

        const Component = () => {
            const [array, push] = useArrayState<number>()
            React.useEffect(() => {
                push(1)
            }, [])
            value = array
            return <></>
        }

        render(<Component />)
        expect(value).toEqual([1])
    })

    test('should remove values from the array by index', () => {
        let value: number | undefined | readonly number[] = 0

        const Component = () => {
            const [array, push, splice] = useArrayState<number>()
            React.useEffect(() => {
                push(1)
                push(2)
                splice(0)
            }, [])
            value = array
            return <></>
        }

        render(<Component />)
        expect(value).toEqual([2])
    })

    test('should remove and return the last value from the array', () => {
        let value1: number | undefined | readonly number[] = 0
        let value2: number | undefined | readonly number[] = 0

        const Component = () => {
            const [array, push, _, pop] = useArrayState<number>()
            let temp_value: number | undefined = 0

            React.useEffect(() => {
                push(1)
                temp_value = pop()
            }, [])

            value1 = temp_value
            value2 = array
            return <></>
        }

        render(<Component />)
        expect(value1).toBe(1)
        expect(value2).toEqual([])
    })
})