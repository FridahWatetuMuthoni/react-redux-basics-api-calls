import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostById } from './postSlice';


const PostsExcerpt = ({ postId }) => {
  const post = useSelector(state => selectPostById(state,postId))

    return (
<div className="card m-3 col-md-5 ">
        {
          post ? (
      <div className="card-body">
    <h5 className="card-title">{post.title}</h5>
    <h6 className="card-subtitle mb-2 text-muted">
    <PostAuthor userId={post.userId} />
    </h6>
    <p className='text-muted'>
    <TimeAgo timestamp={post.date}/> 
    </p>
    <p className="card-text">
    { post.body.substring(0,75)}...
    </p>
    <ReactionButtons post={post}/>
    <Link to={`/post/${post.id}`} className="card-link">Visit Post</Link>
  </div>
          ):(<p>Something went wrong</p>)
  }
</div>
  )
}


export default PostsExcerpt