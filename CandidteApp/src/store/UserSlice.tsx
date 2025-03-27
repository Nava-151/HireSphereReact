
import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User, { UserLogin } from "../models/User";
import TokenInterceptor from "../components/TokenInterceptor";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await TokenInterceptor.get(`${API_URL}/users`);
        return response.data as User[];
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

// ** New function: Fetch user by ID **
export const fetchUserById = createAsyncThunk<User, number, { rejectValue: string }>(
    'users/fetchById',
    async (userId, thunkAPI) => {
        try {
            const response = await TokenInterceptor.get(`${API_URL}/users/${userId}`);
            return response.data as User;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch user");
        }
    }
);

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
            console.log(response.data);
            return response.data.user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Registration failed");
        }
    }
);

export const updateUser = createAsyncThunk('users/update', async (user: User, thunkAPI) => {
    try {
        const userId = localStorage.getItem('userId');
        const response = await TokenInterceptor.put(`${API_URL}/users/${userId}`, user);
        
        return response.data as User;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const login = createAsyncThunk('auth/login', async (credentials: UserLogin, thunkAPI) => {
    try {
        console.log("in login");

        const response = await axios.post<{ token: string }>(`${API_URL}/auth/login`, credentials);
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
});

const UserSlice = createSlice({
    name: 'users',
    initialState: {
        list: [] as User[],
        token: null as string | null,
        currentUser: null as User | null,
        loading: false,
        error: null as string | null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.list = action.payload;
            })
            .addCase(fetchUsers.rejected, () => {
                alert('Failed to fetch users, something went wrong :{');
            })
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
                state.currentUser = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch user";
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; email: string }>) => {
                state.token = action.payload.token;
                alert("Login successful");
            })
            .addCase(login.rejected, () => {
                alert('Login failed, try again later :{');
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(addUser.rejected, () => {
                alert('Failed to register, try again later :{');
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.list = state.list.map(user => user.id === action.payload.id ? action.payload : user);
            })
            .addCase(updateUser.rejected, () => {
                alert('Failed to update user details, something went wrong :{');
            });
    }
});

export default UserSlice;

