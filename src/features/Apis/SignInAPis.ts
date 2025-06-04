import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//defines async thunk based API call before create slice
export const signInAPI = createAsyncThunk(
    "auth/login" ,
    async(credentials:{Email:string,Password:string},thunkAPI
    )=>{
        try{
            const response = await axios.post('http://localhost:3000/auth/login',credentials)
            // Save email to localStorage
            // ✅ Destructure from nested user object
const { Email, Name } = response.data.user;
const token = response.data.accessToken;
console.log("check1",Email);
    localStorage.setItem("userEmail", response.data.user.Email);
            return response.data
        }
        catch(error:any){
           return thunkAPI.rejectWithValue(error.response?.data?.message || 'login failed')
        }
    }
)