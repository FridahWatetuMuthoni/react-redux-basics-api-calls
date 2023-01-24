import { useSelector,useDispatch } from 'react-redux'
import { selectPostById } from './postSlice'
import { useParams } from 'react-router-dom'
import TimeAgo from './TimeAgo'
import { postDelete } from './postSlice'
import { useNavigate ,Link} from 'react-router-dom';


const SinglePost = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const nagivate =useNavigate()
  const post = useSelector(state => selectPostById(state, Number(id)))

console.log(post)  
  const handleDelete = () => {
    dispatch(postDelete(post.id))
    nagivate('/',{replace:true})
  }
    return (
<div className="card text-center mt-5 card-h">
    <div className="card-header mb-5">
                Single Post
        </div>
        {
          post ? (
          <>
        <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body}</p>
              <div className='mt-3'>
              <Link to={`/edit/${post.id}`} className="btn btn-warning mx-2">Edit</Link>
              <button onClick={handleDelete} className="btn btn-danger">Delete</button>
            </div>
          </div>
          <div className="card-footer text-muted">
            <TimeAgo timestamp={post.date}/>
              </div>
              </>
          ):
            (<p>Something went wrong</p>)
        }
</div>
  )
}

export default SinglePost