import {createSlice } from "@reduxjs/toolkit";

const initialState={ 
    status:false,   // no user is authenticated
    userData:null   // no user data is present
}
const authSLice=createSlice({
    name:"auth",
    initialState,
    reducers:{
login:(state,action)=>{
    state.status=true;
    state.userData=action.payload.userData;


},
logout:(state,action)=>{
    state.status=false,
    state.userData=null;
}
//aisw hi post bna lo ussme state.getpost ,state.userpost values add kr skte hai 

    }
})
export const {login,logout}=authSLice.actions;  
  //action authslice mai reducers mai jo andar hai login logout
export default authSLice.reducer;
