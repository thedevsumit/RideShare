import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'userName',
    initialState: { username: ""},
    reducers: {
        newName: (state,action) => {
            state.username = action.payload
        },
       
    }
})
export default userSlice;
export const userAction = userSlice.actions;