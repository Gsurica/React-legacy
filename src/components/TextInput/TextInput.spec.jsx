import { screen, render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { TextINput } from ".";

describe('<TextInput />', () => {
  it('should value be the default value passed', () => {
    const fn = jest.fn()
    render(<TextINput handleChange={fn} searchValue={'test'} />)

    const input = screen.getByPlaceholderText(/Type your search!@/i)
    expect(input.value).toBe('test')
  })

  it('should call handle change func on each key pressed', () => {
    const fn = jest.fn()
    render(<TextINput handleChange={fn} />)

    const input = screen.getByPlaceholderText(/type your search!@/i)
    const value = 'the value'

    userEvent.type(input, value)
    expect(input.value).toBe(value)
    expect(fn).toHaveBeenCalledTimes(value.length)
  })  

  it('should match the input snapshoot', () => {
    const fn = jest.fn()
    const { container } = render(<TextINput handleChange={fn} searchValue={'test'} />)
    
    expect(container.firstChild).toMatchSnapshot()
  }) 
})