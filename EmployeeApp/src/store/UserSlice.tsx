import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User, { UserLogin } from "../models/User";
const API_URL = 'http://localhost:5071/users';

export const fetchUsers = createAsyncThunk('', async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL);
        return response.data as User[];
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});
export const addUser = createAsyncThunk('/register', async (user: User, thunkAPI) => {
    console.log("in add user");

    try {
        const response = await axios.post(`${API_URL}/register`, user);

        return response.data as User;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
})
export const updateUser = createAsyncThunk('/update', async (user: User, thunkAPI) => {
    try {
        const response = await axios.put(`${API_URL}/${user.id}/login`, user,
            { headers: { "id": user.id! } });// check what will be the call
        return response.data as User;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
})

export const login = createAsyncThunk('/login', async (credentials: UserLogin, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);//it isnt good
        if (response.data == null) {
            //treat the logic pare
        }
     if(response.data==500)
        alert("there is a problem try again later")
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
})

const UserSlice = createSlice({
    name: 'users',
    initialState: { list: [] as User[] },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled,
                (state, action: PayloadAction<User[]>) => {
                    state.list = [...action.payload]
                })
            .addCase(fetchUsers.rejected,
                () => {
                    alert('failed in getting users something went worng :{')
                }
            ).
            // .addCase(login.fulfilled,
            //     (state, action) => {
            //         state.list = [...state, { ...action. }]
            //     }).
            addCase(fetchUsers.rejected,
                () => {
                    alert('failed in login try agaun later:{')
                })
            .addCase(addUser.fulfilled,
                (state, action) => {
                    state.list = [...state.list, { ...action.payload }]
                })
            .addCase(addUser.rejected,
                () => {
                    alert('failed in adding you to our site try again later something went worng :{')
                }
            )
            .addCase(updateUser.fulfilled,
                (state, action) => {
                    state.list = [...state.list, { ...action.payload }]
                })
            .addCase(updateUser.rejected,
                () => {
                    alert('failed in edit your Details something went worng :{')
                }
            )
    }
});
export default UserSlice;
