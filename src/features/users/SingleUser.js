import React from 'react'
import { useSelector} from 'react-redux'
import { selectUserById } from './userSlice'
import { useParams } from 'react-router-dom'
import {  selectPostsByUser } from '../post/postSlice'
import PostsExcerpt from '../post/PostsExcerpt'


function SingleUser() {
    const { id } = useParams()
  const user = useSelector(state => selectUserById(state, Number(id)))
  
    const postsForUser = useSelector(state =>selectPostsByUser(state,Number(id)))
  
    console.log(postsForUser)
     let  content = postsForUser.map((post )=> <PostsExcerpt key={ post.id} postId={post.id} />)
  return (
    <section>
          {
              user ? (
        <div className="col-md-9 my-5 mx-auto">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {user?.name}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {user?.email}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {user?.phone}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Website</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {user?.website}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {user?.address?.city}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info " target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
                    </div>
                  </div>
                </div>
                      </div>
            </div>

              )
                  :
                  (
                      <p>The user was not found</p>
                  )
          }
          <div className='row'>
            {content}
          </div>
    </section>
  )
}

export default SingleUser