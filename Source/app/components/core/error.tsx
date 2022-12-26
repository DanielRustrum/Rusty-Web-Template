import React from "react";

/**
 * 
 */
type ErrorHandlerCallback = ((error: unknown) => JSX.Element)

/**
 * 
 */
type ErrorBoundry = ((props: {
    children: React.ReactNode    
}) => JSX.Element)

/**
 * 
 * @param error_handler_callback 
 * @returns 
 * 
 * @public
 */
export function createErrorBoundry(error_handler_callback: ErrorHandlerCallback):ErrorBoundry {
    return function({ children }) {
        try {
            return (<>{children}</>)
        } catch (error) {
            return error_handler_callback(error)
        }
    }
    
}