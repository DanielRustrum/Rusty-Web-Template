import React from "react"

/**
 * A namespace for creating a toggleable element that displays a specific child element based on a state.
 */
export namespace ElementToggle {
    /**
     * A toggleable element that displays a specific child element based on a state.
     *
     * @param display - The state that determines which child element to display
     * @param children - The child elements of the toggleable element
     * @returns A toggleable element that displays the appropriate child element based on the state
     */
    export function StateGroup<StateEnum>({
        display, children
    }:{
        display: StateEnum
        children: React.ReactNode
    }): JSX.Element {
        let display_child = null
    
        React.Children.forEach(children, (child, index) => {
            if (!React.isValidElement(child)) return;

            if (typeof child.type === 'string' || child.type.name !== 'State')
                throw new Error(`Invalid Element: element of${typeof child.type === 'string'? " string": child.type?.name} isn't valid as a direct child of StateGroup.`);
    
            if(child.props.name === display) 
                display_child = child.props.children;
        })
    
        return (
            <>
                {display_child}
            </>
        )
    }
    
    /**
     * A child element of the toggleable element.
     *
     * @param name - The state that determines whether this element is displayed by the toggleable element
     * @param children - The content of the child element
     * @returns A child element of the toggleable element
     */
    export function State({
        name, children
    }:{
        name: any
        children: React.ReactNode
    }): JSX.Element {
        return (
            <div data-state-name={`${name}`}>
                {children}
            </div>
        )
    }
}

/**
 * A custom React hook for managing a state that can be toggled between two values.
 *
 * @param items - The items that can be toggled
 * @param primary_state - The primary state
 * @param secondary_state - The secondary state
 * @returns A tuple containing a Map of the current states and a function for toggling the state of an item
 */
export function useToggleState<StateType, StateValue>(
    items: Array<StateType>,
    primary_state: StateValue,
    secondary_state: StateValue
): [Map<StateType, StateValue>, (set: StateType) => void ]{
    let init_map = new Map()
    items.forEach(item => {
        init_map.set(item, secondary_state)
    })
    init_map.set(items[0], primary_state)

    let [states, setState] = React.useState(init_map)

    return [states, (key:StateType) => {
        let new_map = new Map<StateType, StateValue>()
        
        for (const map_key of Object.keys(states)) {
            if(map_key === key) new_map.set(map_key as StateType, primary_state);
            else new_map.set(map_key as StateType, secondary_state);
        }

        setState(new_map)
    }]
}