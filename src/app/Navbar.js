import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { increaseCount,getCount } from '../features/post/postSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const count = useSelector(getCount)
  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse   " id="navbarNavAltMarkup">
      <div className="navbar-nav mx-auto ">
        <Link className="nav-link" to='posts'>Posts</Link>
            <Link className="nav-link" to='/create'>Create</Link>
            <Link className="nav-link" to='/users'>Users</Link>
            <button className='btn btn-primary btn-sm btn-custom' onClick={()=> dispatch(increaseCount())}>{ count}</button>
      </div>
    </div>
  </div>
</nav>
  )
}

export default Navbar
