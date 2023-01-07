import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { ElementList } from '../../../components/core/list'

describe('ElementList', () => {
    test('should render a list of elements from the given data', () => {
        const data = ['item1', 'item2', 'item3']
        const template = (value: string) => <div data-value={value}>{value}</div>
        const element_list = ElementList(data, template)
        const { container } = render(<>{element_list}</>)
        
        data.forEach((item) => {
            const item_element = container.querySelector(`[data-value="${item}"]`)
            expect(item_element).toBeDefined()
        })
    })
})