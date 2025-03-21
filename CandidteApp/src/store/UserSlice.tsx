import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User, { UserLogin } from "../models/User";
const API_URL = 'http://localhost:5071';



export const fetchUsers = createAsyncThunk('', async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL);

        return response.data as User[];
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

interface RegisterResponse {
  id: string;
  token: string;
  user: User;
}

export const addUser = createAsyncThunk<User, User, { rejectValue: string }>(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post<RegisterResponse>(`${API_URL}/auth/register`, user);

      if (!response.data || !response.data.id || !response.data.token || !response.data.user) {
        throw new Error("Invalid response data");
      }

      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("token", response.data.token);

      return response.data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Registration failed");
    }
  }
);

export const updateUser = createAsyncThunk('users/update', async (user: User, thunkAPI) => {
    try {
        localStorage.getItem('userId')
        const response = await axios.put(`${API_URL}/users/${localStorage.getItem('userId')}`, user);// check what will be the call
        return response.data as User;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
})

export const login = createAsyncThunk('auth/login', async (credentials: UserLogin, thunkAPI) => {
    try {
        console.log("in login");

        const response = await axios.post<{ token: string }>(`${API_URL}/auth/login`, credentials);//it isnt good
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
