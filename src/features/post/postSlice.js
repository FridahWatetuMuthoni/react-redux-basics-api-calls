import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {sub} from 'date-fns'
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts:[],
    status:"idle", // idle | loading | succeeded | failed
    error:null
}

/*
asycn thunk accepts two arguements
A string => The string is used as the prefix for the generated action type
callback function => The callback function is a payload creator callback. its returns a promise that
contains some data or rejected promise with an error
 */
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

const postsSlice= createSlice({
    name:'posts',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
            builder
                .addCase(fetchPosts.pending, (state, action) => {
                    state.status = 'loading'
                })
                .addCase(fetchPosts.fulfilled, (state, action) => {
                    state.status = 'succeeded'
                    // Adding date and reactions
                    let min = 1;
                    const loadedPosts = action.payload.map(post => {
                        post.date = sub(new Date(), { minutes: min++ }).toISOString()
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                        return post
                    })
                    // add any fetched posts to the array
                    state.posts = state.posts.concat(loadedPosts)
                })
                .addCase(fetchPosts.rejected, (state, action) => {
                    state.status = 'failed'
                    state.error = action.error.message
                })
                .addCase(addNewPost.fulfilled, (state, action) => {
                    const sortedPosts = state.posts.sort((a, b) => {
                        if (a.id > b.id) return 1
                        if (a.id < b.id) return -1
                        return 0
                    })
                    action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1
                    action.payload.useId = Number(action.payload.useId)
                    action.payload.date = new Date().toISOString()
                    action.payload.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                    }
                    console.log(action.payload)
                    state.posts.push(action.payload)
            })
        },
})

export const selectAllPosts = (state) => state.posts.posts
export const getPostsError = (state) => state.posts.error
export const getPostsStatus = (state) => state.posts.status

export const {postAdded,reactionAdded,postDelete,postEdit}=postsSlice.actions

export default postsSlice.reducer