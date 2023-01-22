import { useDispatch } from "react-redux"
import { reactionAdded } from "./postSlice"

function ReactionButtons({post}) {
    const dispatch = useDispatch()
    const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}
    const reactions_arr = Object.entries(reactionEmoji)
    const reaction_buttons = reactions_arr.map(([name,emoji])=>{
        return(
            <button key={name} type='button' className="reactionButton"
            onClick={()=>{
                dispatch(reactionAdded({postId:post.id,reaction:name}))
            }}
            >
            {emoji}{post.reactions[name]}
            </button>
        )
    })
  return (
    <div>
      {reaction_buttons}
    </div>
  )
}

export default ReactionButtons
