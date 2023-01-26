import { createAsyncThunk, createSlice,createSelector,createEntityAdapter } from '@reduxjs/toolkit'
import {sub} from 'date-fns'
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const postsAdapter = createEntityAdapter({
    sortComparer: (a,b)=> b.date.localeCompare(a.date)
})

const initialState =postsAdapter.getInitialState( {
    status:"idle", // idle | loading | succeeded | failed
    error: null,
    count:0
})


// const initialState = {
//     posts:[],
//     status:"idle", // idle | loading | succeeded | failed
//     error: null,
//     count:0
// }

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

export const updatePosts = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id,post } = initialPost
    const response = await axios.put(`${POSTS_URL}/${id}`, post)
    return response.data
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const response = await axios.put(`${POSTS_URL}/${initialPost}`)
    if (response?.status === 200) return initialPost
    return`${response?.status}:${response?.statusText}`
})


const postsSlice= createSlice({
    name:'posts',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.entities[postId]
            console.log(postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        increaseCount(state, action) {
            state.count = state.count += 1
        }
    },
    extraReducers(builder) {
            builder
                .addCase(fetchPosts.pending, (state, action) => {
                    state.status = 'loading';
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
                    // add any fetched posts to the state
                    postsAdapter.upsertMany(state,loadedPosts)
                    
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
                    // state.posts.push(action.payload)
                    postsAdapter.addOne(state,action.payload)
                })
                .addCase(updatePosts.fulfilled, (state, action) => {
                    if (!action.payload?.id) {
                        console.log('update could not be complere')
                        console.log(action.payload)
                        return
                    }
                    // const { id } = action.payload
                    action.payload.date = new Date().toISOString()
                    // const posts = state.posts.filter(post => post.id !== id)
                    // state.posts = [...posts, action.payload]
                    postsAdapter.upsertOne(state,action.payload)
                })
                .addCase(deletePost.fulfilled, (state, action) => {
                    if (!action?.payload) {
                        console.log('Delete could not be complete')
                        console.log(action.payload)
                        return
                    }
                    // const posts = state.posts.filter(post => post.id !== action.payload)
                    // state.posts  =posts
                    postsAdapter.removeOne(state,action.payload)
        })
        },
})

// export const selectAllPosts = (state) => state.posts.posts
export const getPostsError = (state) => state.posts.error
export const getPostsStatus = (state) => state.posts.status
export const getCount = (state) => state.posts.count

// export const selectPostById = (state, id) => {
//     const singlePost = state.posts.posts.find(post => post.id === id)
//     return singlePost
// }

// getSelctor creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    //Pass in a selector that returns the posts slice of state
}=postsAdapter.getSelectors(state => state.posts)

//memorize selector
export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts,userId)=>posts.filter(post=> post.userId === userId)
)

export const {  reactionAdded,increaseCount} = postsSlice.actions


export default postsSlice.reducer