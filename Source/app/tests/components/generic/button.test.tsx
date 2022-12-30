import { expect, test, describe, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '../../../components/generic/button'

describe('Test Button', ()=>{
    test("Button Rendered", async () => {
        render(
            <Button
                sr={{
                    label: "Button",
                    descriptor: "Test Button Descriptor"
                }}
            >Button</Button>
        )
        expect(screen.getAllByText(/Button/i)).toBeDefined()
    })
})