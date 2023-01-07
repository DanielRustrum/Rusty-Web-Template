import { expect, test, describe, vi, beforeEach, ArgumentsType } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { createFormGroup, FormTypes } from '../../../components/generic/form'

type CreateFormGroupSuiteContext = {
    form_group: ReturnType<typeof createFormGroup>
}

describe('createFormGroup Function', () => {
    const groupId = 'group-1'
    const formConfig: ArgumentsType<typeof createFormGroup>[1] = {
        input1: {
            label: 'Input 1',
            descriptor: 'This is input 1',
            type: 'text',
            default_value: '',
            required: true,
            validation: () => true
        },
        input2: {
            label: 'Input 2',
            descriptor: 'This is input 2',
            type: 'textbox',
            default_value: '',
            required: false,
        },
        input3: {
            label: 'Input 3',
            descriptor: 'This is input 3',
            type: 'checkbox',
            default_value: false,
            required: false,
        },
        input4: {
            label: 'Input 4',
            descriptor: 'This is input 4',
            type: 'color',
            default_value: '#ffffff',
            required: false,
        },
        input5: {
            label: 'Input 5',
            descriptor: 'This is input 5',
            type: 'date',
            default_value: '',
            required: false,
        },
        input6: {
            label: 'Input 6',
            descriptor: 'This is input 6',
            type: 'datetime',
            default_value: '',
            required: false,
        },
        input7: {
            label: 'Input 7',
            descriptor: 'This is input 7',
            type: 'dropdown',
            default_value: '',
            required: false,
            options: ['Option 1', 'Option 2', 'Option 3'],
            selected_value: 'Option 2',
        },
        input8: {
            label: 'Input 8',
            descriptor: 'This is input 8',
            type: 'email',
            default_value: '',
            required: false,
        },
        input9: {
            label: 'Input 9',
            descriptor: 'This is input 9',
            type: 'file',
            default_value: null,
            required: false,
        },
        input10: {
            label: 'Input 10',
            descriptor: 'This is input 10',
            type: 'month',
            default_value: '',
            required: false,
        },
        input11: {
            label: 'Input 11',
            descriptor: 'This is input 11',
            type: 'number',
            default_value: '',
            required: false,
        },
        input12: {
            label: 'Input 12',
            descriptor: 'This is input 12',
            type: 'password',
            default_value: '',
            required: false,
        },
        input13: {
            label: 'Input 13',
            descriptor: 'This is input 13',
            type: 'radio',
            default_value: false,
            required: false,
        },
        input14: {
            label: 'Input 14',
            descriptor: 'This is input 14',
            type: 'range',
            default_value: "2",
            required: false,
        },
        input15: {
            label: 'Input 15',
            descriptor: 'This is input 15',
            type: 'search',
            default_value: '',
            required: false,
        },
        input16: {
            label: 'Input 16',
            descriptor: 'This is input 16',
            type: 'telephone',
            default_value: '',
            required: false,
        },
        input17: {
            label: 'Input 17',
            descriptor: 'This is input 17',
            type: 'time',
            default_value: '',
            required: false,
        },
        input18: {
            label: 'Input 18',
            descriptor: 'This is input 18',
            type: 'url',
            default_value: '',
            required: false,
        },
        input19: {
            label: 'Input 19',
            descriptor: 'This is input 19',
            type: 'week',
            default_value: '',
            required: false,
        },
        input20: {
            label: 'Input 20',
            descriptor: 'This is input 20',
            type: 'text',
            default_value: '',
            required: false,
            validation: () => false
        },
    }

    beforeEach<CreateFormGroupSuiteContext>(async (context) => {
        context.form_group = createFormGroup(groupId, formConfig)
    })

    test<CreateFormGroupSuiteContext>('creates a form group correctly', (context) => {
        const [getFormData, inputComponents] = context.form_group
        expect(getFormData()).toEqual({
            input1: "",
            input2: "",
            input3: false,
            input4: "#ffffff",
            input5: "",
            input6: "",
            input7: "",
            input8: "",
            input9: null,
            input10: "",
            input11: "",
            input12: "",
            input13: false,
            input14: "2",
            input15: "",
            input16: "",
            input17: "",
            input18: "",
            input19: "",
            input20: ""
        })
    })

    test<CreateFormGroupSuiteContext>('renders all input types correctly', (context) => {
        const [_, inputComponents] = context.form_group

        const inputElements = [
            'input', 
            'textarea', 
            'input', 
            'input', 
            'input', 
            'input', 
            'select', 
            'input', 
            'input', 
            'input', 
            'input', 
            'input', 
            'input', 
            'input', 
            'input', 
            'input', 
            'input', 
            'input',
            'input',
            'input',
        ]
        
        const TypeToNameMap: Partial<Record<FormTypes.PossibleInputTypes, string | null>> = {
            "textbox": null,
            "dropdown": null
        }
        Object.keys(inputComponents).forEach((inputId, index) => {
            const Element = inputComponents[inputId] 
            const { container } = render(<Element />)
            const inputElement = container.querySelector(inputElements[index]) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            expect(inputElement).toBeDefined()
            expect(inputElement.getAttribute("type")).toBe(
                TypeToNameMap[formConfig[inputId].type] !== undefined? 
                TypeToNameMap[formConfig[inputId].type]: formConfig[inputId].type
            )
        })
    })

    test<CreateFormGroupSuiteContext>('handles onChange event correctly', (context) => {
        const [getFormData, inputComponents] = context.form_group
        const inputId = 'input1'
        const Element = inputComponents[inputId] 
        
        const onChangeMock = vi.fn()
        const onValidationMock = vi.fn<string[], boolean>((value) => false)
        const onRequiredFailureMock = vi.fn()
        const newValue = "New Test Value"

        const { container } = render(
            <Element 
                events = {{
                    onChange: onChangeMock,
                    onValidationFailure: onValidationMock,
                    onRequiredFailure: onRequiredFailureMock,
                }}
            />
        )
        const inputElement = container.querySelector('input') as HTMLInputElement

        fireEvent.change(inputElement, { target: { value: newValue } })
        expect(onChangeMock).toHaveBeenCalledWith(newValue)
        expect(getFormData(inputId)).toBe(newValue)
    })

    test<CreateFormGroupSuiteContext>('validates input correctly', (context) => {
        const [_, inputComponents] = context.form_group

        const PassOnValidationMock = vi.fn()
        const FailOnValidationMock = vi.fn()
        
        const inputId1 = 'input1'
        const inputId2 = 'input20'
        const Element1 = inputComponents[inputId1] 
        const Element2 = inputComponents[inputId2] 

        const { container } = render(
            <>
                <Element1 
                    events={{
                        onValidationFailure: PassOnValidationMock,
                    }}
                />
                <Element2 
                    events={{
                        onValidationFailure: FailOnValidationMock,
                    }}
                />
            </>
        )
        const inputElement1 = container.querySelector('[data-form-input-uid="input1"]') as HTMLInputElement
        const inputElement2 = container.querySelector('[data-form-input-uid="input20"]') as HTMLInputElement

        fireEvent.blur(inputElement1)
        expect(PassOnValidationMock).not.toHaveBeenCalled()
        fireEvent.blur(inputElement2)
        expect(FailOnValidationMock).toHaveBeenCalled()
    })

    test<CreateFormGroupSuiteContext>('handles required fields correctly', (context) => {
        const [_, inputComponents] = context.form_group

        const onRequiredMock1 = vi.fn()
        const onRequiredMock2 = vi.fn()

        const inputIdRequired = 'input1'
        const inputIdOptional = 'input20'
        const Element1 = inputComponents[inputIdRequired] 
        const Element2 = inputComponents[inputIdOptional] 

        const { container } = render(
        <>
            <Element1 
                events={{
                    onRequiredFailure: onRequiredMock1
                }}
            />
            <Element2 
                events={{
                    onRequiredFailure: onRequiredMock2
                }}
            />
        </>
        )
        const inputElement1 = container.querySelector('[data-form-input-uid="input1"]') as HTMLInputElement
        const inputElement2 = container.querySelector('[data-form-input-uid="input20"]') as HTMLInputElement

        fireEvent.blur(inputElement1)
        expect(onRequiredMock1).toHaveBeenCalled()
        fireEvent.blur(inputElement2)
        expect(onRequiredMock2).not.toHaveBeenCalled()
    })

    test('handles edge cases correctly', () => {
        // Test createFormGroup with invalid input types
        expect(() => {
            createFormGroup(groupId, {
                input1: {
                    label: 'Input 1',
                    descriptor: 'This is input 1',
                    //@ts-ignore
                    type: 'invalid', // Invalid input type 
                    default_value: '',
                    required: true,
                },
            })
        }).toThrow()
    })
  })