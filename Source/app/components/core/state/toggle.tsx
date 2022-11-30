import React from "react"

export namespace ElementToggle {
    enum BlankState {}

    export function StateGroup<StateEnum = BlankState>({
        display, children
    }:{
        display: StateEnum
        children: React.ReactNode
    }): JSX.Element {
        let display_child = null
    
        React.Children.forEach(children, (child, index) => {
            if (!React.isValidElement(child)) return;
            if (typeof child.type === 'string' || child.type.name !== 'State') {
                throw new Error(`Invalid Element: element of ${typeof child.type === 'string'? " string": child.type?.name} isn't valid as a direct child of PanelGroup.`);
            }
    
            if(child.props.name === display) 
                display_child = child.props.children;
        })
    
        return (
            <>
                {display_child}
            </>
        )
    }
    
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
        //@ts-ignore
        for (const map_key of states.keys()) {
            if(map_key === key) new_map.set(map_key, primary_state);
            else new_map.set(map_key, secondary_state);
        }

        setState(new_map)
    }]
}