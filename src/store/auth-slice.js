import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        users: [],
        changed: false,
    },
    reducers: {
        replaceData(state, action){
            state.users = action.payload.users;
        },

        addUser(state, action){

            state.users.push({
                userId: action.payload.userId,
                username: action.payload.username,
                password: action.payload.password
            });
        },

        setChanged(state){
            state.changed = true
        },

    }
})

export const authActions = authSlice.actions;

export default authSlice;