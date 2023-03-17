import './App.css';

import { Component } from 'react';
import { loadPosts } from './utils/load-post'
import { Posts } from './components/Posts'

class App extends Component {
  state = {
    counter: 0,
    posts: []
  }

  componentDidMount() {
    this.loadpost()
  }

  loadpost = async () => {
    const postsAndPhotos = await loadPosts()
    this.setState({ posts: postsAndPhotos })
  }

  render() {

    const { posts } = this.state

    return (
      <section className='container'>
        <Posts posts={posts} />
      </section>
    )
  }
}

export default App;
