import React from "react"
import CSS from 'csstype'

/**
 * A function that returns a JSX element representing a button.
 *
 * @param {object} props - The properties for the button.
 * @param {string|CSS.Properties} [props.styles] - A string or a CSS object that can be used to style the button element.
 * @param {boolean} [props.disabled] - A boolean value that specifies whether the button should be disabled or not.
 * @param {object} props.sr - An object that contains properties related to screen reader accessibility.
 * @param {string} props.sr.label - A string that specifies the label for the button.
 * @param {string} props.sr.descriptor - A string that specifies a description for the button.
 * @param {string} [props.sr.controls_element] - A string that specifies the element that the button controls.
 * @param {boolean} [props.sr.expanded] - A boolean value that specifies whether the button is in an expanded state or not.
 * @param {boolean} [props.sr.toggled] - A boolean value that specifies whether the button is in a toggled state or not.
 * @param {object} [props.events] - An object that contains event handlers for the button.
 * @param {function} [props.events.onClick] - A function that is called when the button is clicked.
 * @param {React.ReactNode} props.children - A React node that represents the content of the button.
 *
 * @returns {JSX.Element} A `button` element with the specified properties and content.
 */
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
        "aria-labelledby": `generic-button-${sr.label}`
    }

    return (
        <button {...button_props} disabled={disabled}>
            <span className="sr-only" id={`generic-button-${sr.label}`}>
                {sr.descriptor}
            </span>
            <div aria-hidden="true">
                {children}
            </div>
        </button>
    )
}