import { createSlice } from "@reduxjs/toolkit";

const userLocal = JSON.parse(localStorage.getItem('user')) || null;

const initialState = {
  currentUser: userLocal,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, {payload}) => {
            localStorage.setItem('user', JSON.stringify(payload));
            state.currentUser = payload;
        },
        logout: (state) => {
            localStorage.removeItem('user');
            state.currentUser = null;
        }
    }
});

export const {setCurrentUser, logout} = userSlice.actions;
export default userSlice.reducer;