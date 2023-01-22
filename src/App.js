import AddPostForm from "./features/post/AddPostForm";
import PostList from "./features/post/PostList";
import Navbar from "./app/Navbar";
import { Routes, Route } from 'react-router-dom';
import SinglePost from "./features/post/SinglePost";
import EditPost from './features/post/EditPost'


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
        <Route exact path="edit/:id" element={<EditPost/>}/>
        {/* Catches All Routes that does not match the above routes*/}
        <Route  path="*" element={<PostList/>} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
