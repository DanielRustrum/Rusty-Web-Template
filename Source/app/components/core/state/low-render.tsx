import React from "react"

export function createLowRenderState <DataType>(initial_state: DataType): [
    (props: {
        children: React.ReactNode
    }) => JSX.Element,
    <SelectorOutput>(
        selector: ((value: DataType) => (SelectorOutput | DataType))
    ) => [
        SelectorOutput | DataType,
        (value: DataType | Partial<DataType>) => void
    ]
] {
    type PartialOrNot = DataType | Partial<DataType>

    function setup():{
        get: () => DataType
        set: (value: PartialOrNot) => void
        subscribe: (
            (callback: () => void) => (
                () => void
            )
        )
    } {
        const low_render_data_ref = React.useRef(initial_state)
        const get = React.useCallback(
            () => low_render_data_ref.current,
            []
        )
        
        const subscribers = React.useRef(
            new Set<() => void>()
        )
        
        const set = React.useCallback(
            (value: PartialOrNot) => {
                low_render_data_ref.current = {
                    ...low_render_data_ref.current,
                    ...value
                }
                subscribers.current.forEach(subscriber => subscriber());
            },
            []
        )


        const subscribe = React.useCallback(
            (
                callback: () => void
            )=> {
                subscribers.current.add(callback)
                return () => subscribers.current.delete(callback)
            },
            []
        )
        return {
            get,
            set,
            subscribe
        }
    }

    type setupReturnType = ReturnType<typeof setup>
    const lowRenderContext = React.createContext<setupReturnType | null>(null)

    function useState<SelectorOutput>(
        selector: 
            ((value: DataType) => (SelectorOutput | DataType)) 
            = (value) => value
    ): [
        SelectorOutput | DataType,
        (value: PartialOrNot) => void
    ] {
        const context = React.useContext(lowRenderContext)

        if(selector === undefined) selector = function<DataType>(value: DataType){return value}
        if(!context) throw new Error(`No Context found for ${initial_state}`);
        const state = React.useSyncExternalStore(context.subscribe, () => {
            return selector(context.get())
        })

        return [
            state,
            context.set
        ]
    }

    function Provider({children}:{
        children: React.ReactNode
    }): JSX.Element {
        return (
            <lowRenderContext.Provider value={setup()}>
                {children}
            </lowRenderContext.Provider>
        )
    }

    return [
        Provider,
        useState
    ]
}

export default createLowRenderState