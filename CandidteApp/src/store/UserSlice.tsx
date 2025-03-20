import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User, { UserLogin } from "../models/User";
const API_URL = 'http://localhost:5071/auth';



export const fetchUsers = createAsyncThunk('', async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL);

        return response.data as User[];
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});
export const addUser = createAsyncThunk('auth/register', async (user: User, thunkAPI) => {
    console.log("in add user");

    try {
        const response = await axios.post(`${API_URL}/register`, user);
        console.log(response);

        if (typeof response.data === 'object' && response.data !== null && 'id' in response.data) {
            localStorage.setItem('userId', response.data.id as string);
        } else {
            throw new Error("Invalid response data");
        }

        if (typeof response.data === 'object' && response.data !== null && 'token' in response.data) {
            localStorage.setItem('token', response.data.token as string);
        } else {
            throw new Error("Invalid response data: token is missing");
        }


        if (typeof response.data === 'object' && response.data !== null && 'user' in response.data) {
            return response.data.user as User;
        } else {
            throw new Error("Invalid response data: user is missing");
        }
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
})
export const updateUser = createAsyncThunk('/update', async (user: User, thunkAPI) => {
    try {
        const response = await axios.put(`${API_URL}/${user.id}/login`, user,
            { headers: { "id": user.id! } });// check what will be the call
        console.log("userId" + user.id);
       
        localStorage.setItem('token', "" + (response.data as {user:User, token: string }).token);
        localStorage.setItem('userId', "" + user.id);

        return response.data as User;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
})

export const login = createAsyncThunk('auth/login', async (credentials: UserLogin, thunkAPI) => {
    try {
        console.log("in login");

        const response = await axios.post<{ token: string }>(`${API_URL}/login`, credentials);//it isnt good
        console.log(response);
        return { token: response.data.token, email: credentials.email };
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 404) {
                return thunkAPI.rejectWithValue("User not found");
            }
            if (error.response.status === 500) {
                alert("There is a problem, try again later");
                return thunkAPI.rejectWithValue("Server error");
            }
        }
        return thunkAPI.rejectWithValue("Network error");
    }
})
const UserSlice = createSlice({
    name: 'users',
    initialState: {
        list: [] as User[],
        token: null as string | null,
        currentUser: null as string | null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled,
                (state, action: PayloadAction<User[]>) => {
                    state.list = [...action.payload]

                }

            )
            .addCase(fetchUsers.rejected,
                () => {
                    alert('failed in getting users something went worng :{')
                }
            )
            .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; email: string }>) => {
                state.token = action.payload.token;
                state.currentUser = action.payload.email;
                alert("login successful");
            }).
            addCase(login.rejected,
                () => {
                    alert('failed in login try agaun later:{')
                })
            .addCase(addUser.fulfilled,
                (state, action) => {
                    state.list = [...state.list, { ...action.payload }]
                }
            )
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
