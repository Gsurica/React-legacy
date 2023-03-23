import { render, screen } from "@testing-library/react"
import { PostCard } from "."
import { postCardMock } from './mock'

const props = postCardMock

describe('<PostCard />', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard {...props} />)
    
    expect(screen.getByRole('img', { name: /something/i })).toHaveAttribute('src', 'https//site.com.br')
    expect(screen.getByRole('heading', { name: /something/i })).toBeInTheDocument()
  })
})