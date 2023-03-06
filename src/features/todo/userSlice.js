import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            console.log(action.payload)
            const {id,name,email,mobile,password,role,username} = action.payload;
            state.push({id,name,email,mobile,password,role,username});
            return state;
        },
        removeUser:(state,action)=>{
            const id = action.payload;
            console.log("DELETED: ",id)
            console.log(state)
            return state.filter(item => item.id !== id)
        },
        updateUser:(state,action) => {
            // const id = action.payload[0]
            // const newTodo = action.payload[1]

            console.log(state)
            console.log(action.payload)

            state.map(data =>{
                if(data.id === action.payload.details.id){
                    data.name = action.payload.details.name;
                    data.email = action.payload.details.email;
                    data.username = action.payload.details.username;
                    data.mobile = action.payload.details.mobile;
                    data.role = action.payload.details.role;
                    data.password = action.payload.details.password;
                }
            })
        }
    }
})

export const {addUser,removeUser,updateUser} = todoSlice.actions 

export default todoSlice.reducer;