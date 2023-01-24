import { useSelector } from 'react-redux'
import { selectAllUsers} from '../users/userSlice'

const PostAuthor = (props) => {
  const users = useSelector(selectAllUsers)

  const author = users.find(user => user.id === props.userId)
  return (
      <span>by { author ? author.username: 'unknown author'}</span>
  )
}

export default PostAuthor