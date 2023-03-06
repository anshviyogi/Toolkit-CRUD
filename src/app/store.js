import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../features/todo/userSlice'

const store = configureStore({
    reducer:{
        todo: todoReducer
    }
})

export default store;