import { useSelector } from 'react-redux';
import { selectAllPosts,getPostsError,getPostsStatus} from './postSlice';
import PostsExcerpt from './PostsExcerpt';

const PostList = () => {
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)


  let content;
  
  if (postStatus === 'loading') {
    content = <p>Loading...</p>
  }
  else if (postStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post,index )=> <PostsExcerpt key={ index} post={post} />)
  }
  else if (postStatus === 'failed') {
    content = <p>{ error}</p>
  }


  return (
      <div className='row'>
      <h2 className='text-center my-3'>Posts</h2>
      {content}
    </div>
  )
}

export default PostList
