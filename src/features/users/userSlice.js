import {createSlice,nanoid} from '@reduxjs/toolkit'

const initialState = [
    {
        id: nanoid(),
        username: "frizz",
        email:'frizz@gmail.com'
    },
    {
        id: nanoid(),
        username: "jane",
        email:'jane@gmail.com'
    },
    {
        id: nanoid(),
        username: "emily",
        email:'emily@gmail.com'
    },
]

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{}
})

export const selectAllUsers = (state)=>state.users

export default userSlice.reducer