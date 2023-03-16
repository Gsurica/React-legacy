import { Component } from "react";

class Arrays extends Component {
  state = {
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

  render() {

    const { posts } = this.state

    return (
      <>
        <h1>Arrays page</h1>
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