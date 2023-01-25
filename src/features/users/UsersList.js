import { useSelector } from "react-redux"
import { selectAllUsers } from "./userSlice"
import { Link } from "react-router-dom"

function UsersList() {
    const users = useSelector(selectAllUsers)
    const renderedUsers = users.map((user) => {
        return (
            <li key={user.id} className="list-group-item py-3">
                <Link to={`/user/${user.id}`}>{ user.name}</Link>
            </li>
        )
    })
  return (
      <section className="card my-5">
          <div className="card-header">
              UsersLists
          </div>
          <ul className="list-group list-group-flush">
              {renderedUsers}
          </ul>
    </section>
  )
}

export default UsersList