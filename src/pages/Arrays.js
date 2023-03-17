import { Component } from "react";

class Arrays extends Component {
  state = {
    counter: 0,
    posts: []
  }

  componentDidMount() {
    this.loadpost()
  }

  loadpost = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts, photos] = await Promise.all([postsResponse, photosResponse])

    const postsJson = await posts.json()
    const photosJson = await photos.json()

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }
    })

    this.setState({ posts: postsAndPhotos })
  }

  render() {

    const { posts } = this.state

    return (
      <section className='container'>
        <div className='posts'>
          { posts.map((post) => {
            return (
              <div className='post'>
                <img src={post.cover} alt={post.title} />
                <div className='post-card' key={post.id}>
                  <h1>{ post.title }</h1>
                  <p>{ post.body }</p>
                </div>
              </div>
            )
          }) }
        </div>
      </section>
    )
  }
}

export { Arrays }