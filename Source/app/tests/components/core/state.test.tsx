import { expect, test, describe } from 'vitest'
import {render, fireEvent} from '@testing-library/react'
import React from 'react'

const TEST_ERROR_CASES = false

import { useMapState, useArrayState } from '../../../components/core/state/data'

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
    test('should initialize the state with an empty array or the provide array', () => {
        let value: number | undefined | readonly number[] = 0
        let value1: number | undefined | readonly number[] = 0
        const Component = () => {
            const [array] = useArrayState<number>()
            const [array1] = useArrayState<number>([1,2,3])
            value = array()
            value1 = array1()
            return <></>
        }

        render(<Component />)
        expect(value).toEqual([])
        expect(value1).toEqual([1,2,3])
    })

    test('should append values to the array', () => {
        let value: number | undefined | readonly number[] = 0

        const Component = () => {
            const [array, push] = useArrayState<number>()
            React.useEffect(() => {
                push(1)
            }, [])
            value = array()
            return <></>
        }

        render(<Component />)
        expect(value).toEqual([1])
    })

    test('should remove values from the array by index and value', () => {
        const Component = () => {
            const [array, push, remove] = useArrayState<number>()

            return (
                <>
                    <span data-value>{JSON.stringify(array())}</span>
                    <button onClick={() => {
                        push(1)
                        push(2)
                        push(3)
                        push(4)
                        remove({index: 0})
                        remove({value: 3})
                    }}></button>
                </>
            )
        }

        const {container} = render(<Component />)
        
        let button = container.querySelector("button") as HTMLButtonElement
        fireEvent.click(button)

        let value = container.querySelector("[data-value]") as HTMLSpanElement
        expect(value.textContent).toEqual(JSON.stringify([2,4]))
    })
})

import { ElementToggle, useToggleState } from '../../../components/core/state/toggle'

describe('ElementToggle', () => {
    test('renders StateGroup with the correct child element based on the display prop', () => {
        const { container } = render(
            <ElementToggle.StateGroup display="state1">
                <ElementToggle.State name="state1">
                    <p>State 1</p>
                </ElementToggle.State>
                <ElementToggle.State name="state2">
                    <p>State 2</p>
                </ElementToggle.State>
            </ElementToggle.StateGroup>
        )

        const state_1_element = container.querySelector(`[data-state-name="state1"]`)
        const state_2_element = container.querySelector(`[data-state-name="state2"]`)
        expect(state_1_element).toBeDefined()
        expect(state_2_element).toBeNull()
    })
  
    test.skipIf(!TEST_ERROR_CASES)('throws an error if a non-State element is passed as a direct child of StateGroup', () => {
        expect(() => {
            render(
                <ElementToggle.StateGroup display="state1">
                    <ElementToggle.State name="state1">
                        <p>State 1</p>
                    </ElementToggle.State>
                    <p>Invalid element</p>
                </ElementToggle.StateGroup>
            )
        }).toThrowError()
    })
})

describe('useToggleState', () => {
    const TestComponent: React.FC = () => {
        const [states, toggleState] = useToggleState([
            'item1',
            'item2',
            'item3',
        ], 'primary', 'secondary')

        return (
            <div>
                {Array.from(states.keys()).map((key) => (
                    <button data-key={key} key={key} onClick={() => toggleState(key)}>
                        {key}:{states.get(key)}
                    </button>
                ))}
            </div>
        )
    }

    test('toggles the state of an item between primary and secondary', () => {
        const {container} = render(<TestComponent />)

        let item1 = container.querySelector(`[data-key="item1"]`) as HTMLButtonElement
        let item2 = container.querySelector(`[data-key="item2"]`) as HTMLButtonElement
        let item3 = container.querySelector(`[data-key="item3"]`) as HTMLButtonElement
        expect(item1.textContent).toBe("item1:primary")
        expect(item2.textContent).toBe("item2:secondary")
        expect(item3.textContent).toBe("item3:secondary")
        
        fireEvent.click(item2)

        item1 = container.querySelector(`[data-key="item1"]`) as HTMLButtonElement
        item2 = container.querySelector(`[data-key="item2"]`) as HTMLButtonElement
        item3 = container.querySelector(`[data-key="item3"]`) as HTMLButtonElement
        expect(item1).not.toBeNull()
        expect(item1.textContent).toBe("item1:secondary")
        expect(item2.textContent).toBe("item2:primary")
        expect(item3.textContent).toBe("item3:secondary")
    })
})

import createLowRenderState from '../../../components/core/state/low-render'

describe("createLowRenderState" , () => {
    test('Provider passes state to children', () => {
        // Initialize the createLowRenderState function with an initial state
        const initialState = {count: 0}
        const [Provider, useState] = createLowRenderState(initialState)
    
        // Define a component that consumes the state using the useState hook
        function Counter() {
            const [state, setState] = useState(value => value)
            return (
                <div>
                    <span data-testid="count">{state.count}</span>
                    <button onClick={() => setState({count: state.count + 1})}>Increment</button>
                </div>
            )
        }
    
        // Define a component that consumes a selected value of the state using the useState hook with a selector function
        function CounterWithSelector() {
            const [doubleCount, setDoubleCount] = useState<number>(state => state.count)
            return (
                <div>
                    <span data-testid="double-count">{`${doubleCount}`}</span>
                    <button onClick={() => setDoubleCount({count: (doubleCount as number) + 2})}>Increment</button>
                </div>
            )
        }
    
        // Test that the Provider component correctly passes the state to the children components that consume the state using the useState hook
        function TestProvider() {
            return (
                <Provider>
                    <Counter />
                    <CounterWithSelector />
                </Provider>
            )
        }
        const {container} = render(<TestProvider />)
        
        let count = container.querySelector("[data-testid='count']") as HTMLSpanElement
        let double_count = container.querySelector("[data-testid='count']") as HTMLSpanElement

        expect(count.textContent).toBe('0')
        expect(double_count.textContent).toBe('0')
    })
    
    test('useState returns current state and setter function', () => {
        // Initialize the createLowRenderState function with an initial state
        const initialState = {count: 0}
        const [Provider, useState] = createLowRenderState(initialState)
    
        // Test that the useState hook correctly returns the current state and a setter function to update the state
        function TestUseState() {
            const [state, setState] = useState();
            return (
                <div>
                <span data-testid="state">{JSON.stringify(state)}</span>
                <button onClick={() => setState({count: 10})}>Set State</button>
                </div>
            )
        }
        const {container} = render(
            <Provider>
                <TestUseState />
            </Provider>
        )

        let state = container.querySelector(`[data-testid="state"]`) as HTMLSpanElement
        let button = container.querySelector(`button`) as HTMLButtonElement

        expect(state.textContent).toBe(JSON.stringify(initialState))

        fireEvent.click(button)

        state = container.querySelector(`[data-testid="state"]`) as HTMLSpanElement
        expect(state.textContent).toBe(JSON.stringify({count: 10}))
    })

    test('setter function updates state', () => {
        // Initialize the createLowRenderState function with an initial state
        const initialState = {count: 0}
        const [Provider, useState] = createLowRenderState(initialState)
        
        // Test that the setter function returned by the useState hook correctly updates the state, and that the updates are correctly propagated to the children components that consume the state
        function TestSetState() {
            const [state, setState] = useState<{count: number}>()
            return (
                <div>
                    <span data-testid="state">{JSON.stringify(state)}</span>
                    <button onClick={() => setState({count: (state.count as number) + 2})}>Increment</button>
                </div>
            )
        }

        const {container} = render(
            <Provider>
            <TestSetState />
            </Provider>
        )

        let state = container.querySelector(`[data-testid="state"]`) as HTMLSpanElement
        let button = container.querySelector(`button`) as HTMLButtonElement

        fireEvent.click(button)
        expect(state.textContent).toBe(JSON.stringify({count: 2}))
    })
        
    test('useState handles selector function', () => {
        // Initialize the createLowRenderState function with an initial state
        const initialState = {count: 0}
        const [Provider, useState] = createLowRenderState(initialState)
        
        // Test that the useState hook correctly handles a selector function passed as an argument, and that the hook returns the selected value of the state
        function TestSelector() {
            const [doubleCount, setDoubleCount] = useState(state => state.count * 2)
            return (
            <div>
                <span data-testid="double-count">{`${doubleCount}`}</span>
                <button onClick={() => setDoubleCount({count: (doubleCount as number) + 1})}>Increment</button>
            </div>
            )
        }
        
        const {container} = render(
            <Provider>
                <TestSelector />
            </Provider>
        )

        let double_count = container.querySelector(`[data-testid="double-count"]`) as HTMLSpanElement
        let button = container.querySelector(`button`) as HTMLButtonElement
        expect(double_count.textContent).toBe('0')
        fireEvent.click(button)

        double_count = container.querySelector(`[data-testid="double-count"]`) as HTMLSpanElement
        expect(double_count.textContent).toBe('2')
    })
        
    test('useState handles partial state updates', () => {
        // Initialize the createLowRenderState function with an initial state
        const initialState = {count: 0}
        const [Provider, useState] = createLowRenderState(initialState)
    
        // Test that the useState hook correctly handles updates to a partial state, and that the hook merges the partial updates with the existing state
        function TestPartialState() {
        const [state, setState] = useState()
        return (
            <div>
            <span data-testid="state">{JSON.stringify(state)}</span>
            {/*@ts-expect-error  */}
            <button onClick={() => setState({foo: 'bar'})}>Set Partial State</button>
            </div>
        )
        }
        const {container} = render(
            <Provider>
                <TestPartialState />
            </Provider>
        )
        fireEvent.click(container.querySelector('button') as HTMLButtonElement)
        let span = container.querySelector('[data-testid="state"]') as HTMLSpanElement
        expect(span.textContent).toBe(JSON.stringify({count: 0, foo: 'bar'}))
    })
})