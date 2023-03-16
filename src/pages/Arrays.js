import { Component } from "react";

class Arrays extends Component {
  state = {
    counter: 0,
    posts: [
      {
        id: 1,
        title: "O titulo 1",
        body: "O corpo 1"
      },
      {
        id: 2,
        title: "O titulo 2",
        body: "O corpo 2"
      },
      {
        id: 3,
        title: "O titulo 3",
        body: "O corpo 3"
      },
    ]
  }
  timeOut = null

  componentDidMount() {
    this.handleTimeOut()  
  }

  componentDidUpdate() {
    this.handleTimeOut()
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut)
  }

  handleTimeOut = () => {
    const { posts, counter } = this.state
    posts[0].title = 'O titulo mudou!'
 
    this.timeOut = setTimeout(() => {
      this.setState({ posts, counter: counter + 1 })
    }, 1000)
  }

  render() {

    const { posts, counter } = this.state

    return (
      <>
        <h1>Arrays page</h1>
        <h1>{ counter }</h1>
        { posts.map(({ title, body, id }) => {
          return (
            <div key={id}>
              <h1>{ title }</h1>
              <p>{ body }</p>
            </div>
          )
        }) }
      </>
    )
  }
}

export { Arrays }