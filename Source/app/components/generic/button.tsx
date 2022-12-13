import React from "react"
import CSS from 'csstype'

export function ButtonContainer({
    gap = 10,
    direction = "horizontal", 
    padding = 10,
    children
}:{
    gap?: number | [number, number]
    direction?: "horizontal" | "vertical"
    padding?: number | [number, number]
    children: React.ReactNode
}): JSX.Element {
    return (
        <div style={{
            display: "flex",
            flexDirection: direction === "horizontal"? "row" : "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: typeof gap === "number"? `${gap}px` : `${gap[0]}px ${gap[1]}px`,
            padding: typeof padding === "number"? `${padding}px` : `${padding[0]}px ${padding[1]}px`,
        }}>
            {children}
        </div>
    )
}

export function Button({
    styles, disabled, 
    sr,  events, 
    children
}:{
    sr: {
        label: string
        descriptor: string
        controls_element?: string
        expanded?: boolean
        toggled?: boolean
    }
    disabled?: boolean
    styles?: string | CSS.Properties
    events?: {
        onClick?: () => void
    }
    children: React.ReactNode
}): JSX.Element {
    const button_props = {
        className: typeof styles === "string"? styles : undefined,
        style: typeof styles !== "string"? styles : undefined,
        onClick: events?.onClick?? (() => {}),
        "aria-labelledby": `generic-button-${sr.label}`,
        disabled: disabled?? false
    }

    return (
        <button {...button_props}>
            <span className="sr-only" id={`generic-button-${sr.label}`}>
                {sr.descriptor}
            </span>
            <div aria-hidden="true">
                {children}
            </div>
        </button>
    )
}