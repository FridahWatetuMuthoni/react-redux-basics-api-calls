import { useSelector } from 'react-redux';
import { selectAllPosts } from './postSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom';


const PostList = () => {
  const posts = useSelector(selectAllPosts)
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  return (
      <div className='row'>
          <h2 className='text-center my-3'>Posts</h2>
          {
              orderedPosts.map((post) => {
                  return (
                    
<div className="card m-3 col-md-5 " key={post.id}>
  <div className="card-body">
    <h5 className="card-title">{post.title}</h5>
    <h6 className="card-subtitle mb-2 text-muted">
    <PostAuthor userId={post.user} />
    </h6>
    <p className='text-muted'>
    <TimeAgo timestamp={post.date}/> 
    </p>
    <p className="card-text">
    { post.content.substring(0,100)}...
    </p>
    <ReactionButtons post={post}/>
    <Link to={`/post/${post.id}`} className="card-link">Visit Post</Link>
  </div>
</div>
                  )
              })
          }
    </div>
  )
}

export default PostList
