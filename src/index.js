import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { fetchUsers } from './features/users/userSlice';
import { fetchPosts } from './features/post/postSlice'

//Loading data when the app is initialized
store.dispatch(fetchUsers())
store.dispatch(fetchPosts())



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App/>}/>
      </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
