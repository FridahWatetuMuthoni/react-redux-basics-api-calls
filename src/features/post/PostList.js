import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts,getPostsError,getPostsStatus ,fetchPosts} from './postSlice';
import PostsExcerpt from './PostsExcerpt';

const PostList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)

useEffect(() => {
  if (postStatus === 'idle') {
    dispatch(fetchPosts())
  }
}, [postStatus, dispatch])

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
