import { PostCard } from "../PostCard"
import './styles.css'

export const Posts = ({ posts }) => {
  return (
    <div className='posts'>
      { posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            title={post.title} 
            body={post.body}
            id={post.id}
            cover={post.cover}
          />
        )
      }) }
    </div>
  )  
}