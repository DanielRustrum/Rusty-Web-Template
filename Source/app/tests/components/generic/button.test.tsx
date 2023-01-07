import { describe, it, expect, vi  } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { Button } from '../../../components/generic/button'

describe('Button component', () => {
  it('renders a button with the correct label and descriptor', () => {
    const { getByLabelText } = render(
      <Button sr={{ label: 'label', descriptor: 'descriptor' }}>
        Button Text
      </Button>
    )

    const button = getByLabelText('descriptor')
    expect(button).toBeDefined()
  })

  it('calls the onClick event handler when clicked', () => {
    const onClick = vi.fn()
    const { getByLabelText } = render(
      <Button sr={{ label: 'label', descriptor: 'descriptor' }} events={{ onClick }}>
        Button Text
      </Button>
    )

    const button = getByLabelText('descriptor')
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })

  it('renders with the correct styles', () => {
    const styles = { backgroundColor: 'red' }
    const { getByLabelText } = render(
      <Button sr={{ label: 'label', descriptor: 'descriptor' }} styles={styles}>
        Button Text
      </Button>
    )

    const button = getByLabelText('descriptor')
    expect(button.getAttribute("style")).toBe(`background-color: red;`)
  })

  it('is disabled when the disabled prop is set to true', () => {
    const { getAllByRole } = render(
      <Button sr={{ label: 'label', descriptor: 'descriptor' }} disabled>
        Button Text
      </Button>
    )

    const button = getAllByRole("button")[0] as HTMLButtonElement
     expect(button.disabled).toBe(true)
  })
})