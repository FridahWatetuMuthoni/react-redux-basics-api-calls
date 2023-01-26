import { useSelector } from 'react-redux';
import { selectPostIds,getPostsError,getPostsStatus} from './postSlice';
import PostsExcerpt from './PostsExcerpt';

const PostList = () => {
  const orderedPosts= useSelector(selectPostIds)
  const postStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)


  let content;
  
  if (postStatus === 'loading') {
    content = <p>Loading...</p>
  }
  else if (postStatus === 'succeeded') {
    content = orderedPosts.map((postId)=> <PostsExcerpt key={ postId} postId={postId} />)
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
