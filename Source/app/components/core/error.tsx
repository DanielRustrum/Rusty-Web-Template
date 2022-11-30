import React from "react";

type ErrorHandlerCallback = ((error: unknown) => JSX.Element)

type ErrorBoundry = ((props: {
    children: React.ReactNode    
}) => JSX.Element)

export function createErrorBoundry(error_handler_callback: ErrorHandlerCallback):ErrorBoundry {
    return function({ children }) {
        try {
            return (<>{children}</>)
        } catch (error) {
            return error_handler_callback(error)
        }
    }
    
}