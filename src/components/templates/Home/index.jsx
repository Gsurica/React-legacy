import './styles.css';

import { Component } from 'react';
import { loadPosts } from '../../../utils/load-post';
import { Posts } from '../../Posts';
import { Button } from '../../Button';
import { TextINput } from '../../TextInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 10,
    searchValue: ''
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

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }

  render() {

    const { posts, page, postPerPage, allPosts, searchValue  } = this.state
    const noMorePosts = page + postPerPage >= allPosts.length

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    })
    : posts

    return (
      <section className='container'>
        <div className="search-container">
          {!!searchValue && (
            <>
              <h1>Seach value: { searchValue }</h1>
            </>
          ) }

          <TextINput 
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>

        {filteredPosts.length > 0 && (  
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts!</p>
        )}

        {!searchValue && (
          <Button 
            onClick={this.loadMorePosts} 
            text="Load more!" 
            disable={noMorePosts}
          />
        )}
      </section>
    )
  }
}

export default Home;
