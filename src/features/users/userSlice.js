import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const baseURL = 'https://jsonplaceholder.typicode.com/users'

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(baseURL)
    return response.data
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            //completely replacing the state
            return action.payload
        })
    }
})

export const selectAllUsers = (state) => state.users



export default userSlice.reducer