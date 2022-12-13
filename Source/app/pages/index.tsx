import { createUseStyles } from 'react-jss'
import { trpc } from 'services/trpc/trpc'
import demoData from 'data/demo'
import styles from 'page_styles/index'
import { PageDataType } from './_layout'
import { Button } from 'components/generic/button'
import { createFormGroup } from 'components/generic/form'
import React from 'react'
import { m } from 'framer-motion'


const useStyles = createUseStyles({
    container: {
        marginTop: 100,
        textAlign: 'center',
    },

    header: {
        fontSize: 24,
        lineHeight: 1.25,
    },
})


const [getFormData, FormInput] = createFormGroup(
    "Test", {
    test1: {
        label: "input label",
        descriptor: "Test",
        type: "text",
        default_value: "Hi!",
        required: true,
        validation: (value) => value !== "fail validation"
    },
    test2: {
        label: "input label",
        descriptor: "Test-2",
        type: "password",
        default_value: "Heello",
        required: true
    },
    test3: {
        label: "input label",
        descriptor: "Test-3",
        type: "textbox",
        default_value: "Heello"
    },
    test4: {
        label: "input label",
        descriptor: "Test-4",
        type: "dropdown",
        default_value: "1",
        options: [
            "",
            "1",
            "2",
            "3",
            "4"
        ]
    }
})

export default function IndexPage() {
    const classes = useStyles()
    const query = trpc.demo.hello.useQuery({text: "Rusty!"}).data?.greeting
    const [clicked, setClicks] = React.useState<number>(0)
    const [form_data, setFormData] = React.useState<ReturnType<typeof getFormData>>(getFormData())

    return (
        <div className={classes.container}>
            <h1 className={classes.header}>
                Example on how to use react-jss with Next.js
            </h1>
            <p className={styles.jsonViewer}>Data: {JSON.stringify(demoData)}</p>
            <p>Query: {query}</p>
            <Button
                sr={{
                    label: "label",
                    descriptor: "description"
                }}
                events={{
                    onClick: () => {setClicks(clicked + 1)}
                }}
            >
                button
            </Button>
            <FormInput.test1
                events={{
                    onChange: (_) => setFormData(getFormData()),
                    onValidationFailure: (value) => console.log(`Failed Validation:: ${value}`)
                }}
                
            />
            <FormInput.test2
                events={{
                    onRequiredFailure: () => console.log(`Failed Requirement::`),
                    onChange: (_) => setFormData(getFormData())
                }}
            />
            <FormInput.test3
                events={{
                    onRequiredFailure: () => console.log(`Failed Requirement::`),
                    onChange: (_) => setFormData(getFormData())
                }}
            />
            <FormInput.test4
                events={{
                    onRequiredFailure: () => console.log(`Failed Requirement::`),
                    onChange: (_) => setFormData(getFormData())
                }}
            />
            <Button
                sr={{
                    label: "update form",
                    descriptor: "updates to form data to current value"
                }}
                events={{
                    onClick: () => {
                        setFormData(getFormData())
                    }
                }}
            >
                Update Form Data
            </Button>
            <p>
                <>
                    button: {clicked}<br/> 
                    form: {JSON.stringify(form_data)}
                </>
            </p>
           
        </div>
    )
}

const indexData: PageDataType = {
    title: "Rusty Web Template"
}

IndexPage.setData = indexData