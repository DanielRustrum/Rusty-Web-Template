import React from "react"
import CSS from 'csstype'
import { ElementList } from '../core/list'

namespace FormTypes {
    type PossibleInputTypes = (
        'text' |
        'textbox' |
        'checkbox' |
        'color' |
        'date' |
        'datetime' |
        'dropdown' |
        'email' |
        'file' |
        'month' |
        'number' |
        'password' |
        'radio' |
        'range' |
        'search' |
        'telephone' |
        'time' |
        'url' |
        'week'
    )

    type InputValueType<T> = (
        T extends 'text'? string : 
        T extends 'textbox'? string : 
        T extends 'checkbox'? boolean : 
        T extends 'color'? string : 
        T extends 'date'? string : 
        T extends 'datetime'? string : 
        T extends 'dropdown'? string : 
        T extends 'email'? string : 
        T extends 'file'? Blob | null : 
        T extends 'month'? string : 
        T extends 'numeric'? string : 
        T extends 'private'? string : 
        T extends 'radio'? boolean : 
        T extends 'slider'? number : 
        T extends 'telephone'? string : 
        T extends 'time'? string : 
        T extends 'url'? string : 
        T extends 'week'? string : 
        null
    )
    
    type ConditionalParamType<
        ConditionalType,
        ExpectedValue,
        ParamType
    > = ConditionalType extends ExpectedValue? ParamType: undefined

    export interface GenericInputProps {
        events?: {
            onChange?: (current_form_value: string) => void
            onValidationFailure?: (input_value: string) => void
            onRequiredFailure?: () => void
        }
        styles?: string | CSS.Properties
        disabled?: boolean
    }

    export type InputComponentType = (props: GenericInputProps) => JSX.Element

    export type GetFormDataFunction =  (
        <T>(key?: string) => 
            InputValueType<T> | 
            Record<string, InputValueType<T>> | 
            undefined
    )

    export type InputComponentMap = {
        [key: string]: FormTypes.InputComponentType
    }

    export type GenInputFunctionType = (<InputTypes extends PossibleInputTypes>(
        uid: string,
        uid_config: {
            label: string
            descriptor: string
            type: InputTypes
            default_value: InputValueType<InputTypes>
            required?: boolean
            options?: ConditionalParamType<InputTypes, "dropdown", InputValueType<InputTypes>[]>
            selected_value?: ConditionalParamType<InputTypes, "dropdown", InputValueType<InputTypes>>
            validation?: (input_value: string) => boolean
        }) => InputComponentType
    )

    export type CreateFormGroupFunction = (<InputTypes extends PossibleInputTypes>(
        group_id: string,
        config: {
            [uid: string]: {
                label: string
                descriptor: string
                type: InputTypes
                default_value: InputValueType<InputTypes>
                required?: boolean
                options?: ConditionalParamType<InputTypes, "dropdown", InputValueType<InputTypes>[]>
                selected_value?: ConditionalParamType<InputTypes, "dropdown", InputValueType<InputTypes>>
                validation?: (input_value: string) => boolean
            }
        }
    ) => [
        GetFormDataFunction,
        InputComponentMap
    ])
    
}

export const createFormGroup: FormTypes.CreateFormGroupFunction = (group_id, form_config) => {
    const group_map = new Map<string, any>()
    let component_map: FormTypes.InputComponentMap = {}

    const getFormData:FormTypes.GetFormDataFunction = key => {
        if(key === undefined) {
            let map_obj: Record<string, any> = {}
            group_map.forEach((value, key) => {
                map_obj[key] = value
            })
            return map_obj
        }

        return group_map.get(key)
    }

    const genInputComponent: FormTypes.GenInputFunctionType = (uid, uid_config) => {
        const injectRequiredProps = ({
            styles, disabled
        }: Partial<FormTypes.GenericInputProps> ) => {return {
            required: uid_config.required !== undefined? uid_config.required: undefined,
            className: typeof styles === "string"? styles : undefined,
            style: typeof styles !== "string"? styles : undefined,
            disabled: disabled?? false
        }}

        const setupFailureCallback = 
            (provided_failure?: Function) => {
                if(provided_failure !== undefined)
                    return provided_failure;
                else
                    return (dummy1: any, dummy2?: any) => {} 
            }

        switch(uid_config.type) {
            case "textbox":
                let textbox_props: React.HTMLProps<HTMLTextAreaElement> = {}
                return ({ styles, disabled, events }) => {
                    const onRequiredFail = setupFailureCallback(events?.onRequiredFailure)
                    const onValidationFail = setupFailureCallback(events?.onValidationFailure)
                    let [box_value, setBoxValue] = React.useState(`${uid_config.default_value}`)
                    return (
                        <textarea 
                            onChange={(event) => {
                                if(uid_config.validation && !uid_config.validation(event.target.value)) 
                                    onValidationFail(event.target.value);

                                if(uid_config.required && event.target.value === "") 
                                    onRequiredFail();

                                group_map.set(uid, event.target.value)
                                setBoxValue(event.target.value)
                                events?.onChange !== undefined? events.onChange(event.target.value): undefined
                            }}
                            data-form-group-id={group_id}
                            data-form-input-uid={uid}
                            value={box_value}
                            {...{
                                ...textbox_props, 
                                ...injectRequiredProps({ styles, disabled })
                            }}
                        />
                    )
                }
            case "dropdown":
                let select_props: React.HTMLProps<HTMLSelectElement> = {}
                return ({ styles, disabled, events }) => {
                    const onRequiredFail = setupFailureCallback(events?.onRequiredFailure)

                    let [select_value, setSelectValue] = React.useState(`${uid_config.default_value}`)

                    return (
                        <select 
                            onChange={(event) => {
                                if(uid_config.required && event.target.value === "") 
                                    onRequiredFail();

                                setSelectValue(event.target.value)
                                group_map.set(uid, event.target.value)
                                events?.onChange !== undefined? events.onChange(event.target.value): undefined
                            }}
                            data-form-group-id={group_id}
                            data-form-input-uid={uid}
                            value={select_value}
                            {...{
                                ...select_props, 
                                ...injectRequiredProps({ styles, disabled })
                            }}
                        >
                            {ElementList(
                                uid_config.options?? [],
                                (key, value, index) => {
                                    return <option 
                                        key={key}
                                        value={`${value}`}
                                    >
                                        {`${value}`}
                                    </option>
                                }
                            )}
                        </select>
                    )
                }
            default:
                let input_props: React.HTMLProps<HTMLInputElement> = {
                    type: uid_config.type,
                }

                return ({ styles, disabled, events }) => {
                    const onRequiredFail = setupFailureCallback(events?.onRequiredFailure)
                    const onValidationFail = setupFailureCallback(events?.onValidationFailure)

                    let [value, setValue] = React.useState(`${uid_config.default_value}`)
                    return (
                        <input
                            onChange={(event) => {
                                if(uid_config.validation && !uid_config.validation(event.target.value)) 
                                    onValidationFail(event.target.value);

                                if(uid_config.required && event.target.value === "") 
                                    onRequiredFail();

                                group_map.set(uid, event.target.value)
                                setValue(event.target.value)
                                events?.onChange !== undefined? events.onChange(event.target.value): undefined
                            }}
                            data-form-group-id={group_id}
                            data-form-input-uid={uid}
                            value={value}
                            {...{
                                ...input_props, 
                                ...injectRequiredProps({ styles, disabled })
                            }}
                        />
                    )
                }
        }
    }

    for( let [uid, uid_config] of Object.entries(form_config) ) {
        component_map[uid] = genInputComponent(uid, uid_config)
        group_map.set(uid, uid_config.default_value)
    }

    return [
        getFormData,
        component_map
    ]
}