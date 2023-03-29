import { rest } from "msw"
import { setupServer } from "msw/node"

import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { Home } from "."
import userEvent from "@testing-library/user-event"

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    return res(ctx.json(
      [
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1'
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2'
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3'
        },
      ]
    ))
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
    return res(ctx.json(
      [
        {
          url: 'img1.jpg'
        },
        {
          url: 'img2.jpg'
        },
        {
          url: 'img3.jpg'
        },
      ]
    ))
  }),
]

const server = setupServer(...handlers)

describe('<Home /> ', () => {

  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('should render Home page correctly', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não existem posts =(')
    await waitForElementToBeRemoved(noMorePosts)

    expect.assertions(3)

    const search = screen.getByPlaceholderText(/Type your search!@/i)
    expect(search).toBeInTheDocument()

    const images = screen.getAllByRole('img', { name: /title/i })
    expect(images).toHaveLength(2)

    const button = screen.getByRole('button', { name: /Load more posts/i })
    expect(button).toBeInTheDocument()

  })

  it('should search for posts', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não existem posts =(')
    await waitForElementToBeRemoved(noMorePosts)

    const search = screen.getByPlaceholderText(/Type your search!@/i)

    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument()

    userEvent.type(search, 'title1')
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'title2' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument()

    userEvent.clear(search)
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument()

  }) 

  it('should render the Seach value on the screen', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não existem posts =(')
    await waitForElementToBeRemoved(noMorePosts)

    expect.assertions(2)

    const search = screen.getByPlaceholderText(/Type your search!@/i)

    const valueToSearch = 'title'
    userEvent.type(search, valueToSearch)
    expect(screen.queryByRole('heading', { name: `Search value: ${valueToSearch}` })).toBeInTheDocument()

    userEvent.clear(search)
    expect(screen.queryByRole('heading', { name: `Search value: ${valueToSearch}` })).not.toBeInTheDocument()

  })

  it('should render no more posts text on the screen', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não existem posts =(')
    await waitForElementToBeRemoved(noMorePosts)

    expect.assertions(1)

    const search = screen.getByPlaceholderText(/Type your search!@/i)

    userEvent.type(search, 'thing that couldnt exist')
    expect(screen.getByText('Não existem posts =(')).toBeInTheDocument()
  }) 

  it('should have the right button behaviors', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText('Não existem posts =(')
    await waitForElementToBeRemoved(noMorePosts)
    screen.debug()

    const button = screen.getByRole('button', { name: /load more posts/i })

    userEvent.click(button)
    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument()
  }) 

})