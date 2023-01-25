import AddPostForm from "./features/post/AddPostForm";
import PostList from "./features/post/PostList";
import Navbar from "./app/Navbar";
import { Routes, Route } from 'react-router-dom';
import SinglePost from "./features/post/SinglePost";
import EditPost from './features/post/EditPost'
import SingleUser from "./features/users/SingleUser";
import UsersList from "./features/users/UsersList";


function App() {
  return (
    <div >
      <Navbar />
      <div className="container">
        <Routes>
        {/* public routes */}
        <Route exact path="/" element={<PostList/>}/>
        <Route exact path="create" element={<AddPostForm />} />
        <Route exact path="post/:id" element={<SinglePost />} />
          <Route exact path="edit/:id" element={<EditPost />} />
          <Route exact path="users" element={ <UsersList/>} />
          <Route exact path="/user/:id" element={<SingleUser/>} />
        {/* Catches All Routes that does not match the above routes*/}
        <Route  path="*" element={<PostList/>} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
