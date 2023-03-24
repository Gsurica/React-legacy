const { render, screen } = require("@testing-library/react")
import { Posts } from './index' 

const props = {
  posts: [
    {
      id: 1,
      title: 'title 1',
      body: 'body 1', 
      cover: 'testing image 1'
    }, 
    {
      id: 2,
      title: 'title 2',
      body: 'body 2', 
      cover: 'testing image 2'
    }, 
    {
      id: 3,
      title: 'title 3',
      body: 'body 3', 
      cover: 'testing image 3'
    }, 
  ]
}

describe('<Posts />', () => {
  it('should render posts', () => {
    render(<Posts { ...props } />)

    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(3)
    expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(3)
    expect(screen.getAllByText(/body/i)).toHaveLength(3)
    expect(screen.getByRole('img', { name: /title 3/i })).toHaveAttribute('src', 'testing image 3')
  }) 

  it('should render posts empty', () => {
    render(<Posts />)

    expect(screen.queryByRole('heading', { name: /title/i })).not.toBeInTheDocument()
  })

  it('should match the posts snapshot', () => {
    const { container } = render(<Posts {...props} />) 
    expect(container.firstChild).toMatchSnapshot()
  })

})