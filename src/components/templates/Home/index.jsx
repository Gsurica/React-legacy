import './styles.css';

import { Component } from 'react';
import { loadPosts } from '../../../utils/load-post';
import { Posts } from '../../Posts';
import { Button } from '../../Button';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 10
  }

  componentDidMount() {
    this.loadpost()
  }

  loadpost = async () => {
    const { page, postPerPage } = this.state

    const postsAndPhotos = await loadPosts()
    this.setState({ 
      posts: postsAndPhotos.slice(page, postPerPage), 
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postPerPage,
      allPosts,
      posts
    } = this.state
    const nextPage = page + postPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage)
    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage })
  }

  render() {

    const { posts, page, postPerPage, allPosts } = this.state
    const noMorePosts = page + postPerPage >= allPosts.length

    return (
      <section className='container'>
        <Posts posts={posts} />
        <Button 
          onClick={this.loadMorePosts} 
          text="Load more!" 
          disable={noMorePosts}
        />
      </section>
    )
  }
}

export default Home;
