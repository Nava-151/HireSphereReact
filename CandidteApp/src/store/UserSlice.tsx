import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User, { UserLogin } from "../models/User";
import TokenInterceptor from "../components/TokenInterceptor";
import Swal from 'sweetalert2';


const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await TokenInterceptor.get(`${API_URL}/users`);
        return response.data as User[];
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

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
            
            sessionStorage.setItem("name", user.fullName);
            sessionStorage.setItem("userId", response.data.id);
            sessionStorage.setItem("token", response.data.token);
            return response.data.user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Registration failed");
        }
    }
);

export const updateUser = createAsyncThunk('users/update', async (user: User, thunkAPI) => {
    try {
        const userId = sessionStorage.getItem('userId');
        console.log("in updateUser", userId);
        
        const response = await TokenInterceptor.put(`${API_URL}/users/${userId}`, user);
        return response.data as User;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const login = createAsyncThunk('auth/login', async (credentials: UserLogin, thunkAPI) => {
    try {
        const response = await axios.post<{ token: string , id:number}>(`${API_URL}/auth/login`, credentials);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data.id.toString());
        const userResponse = await thunkAPI.dispatch(fetchUserById(response.data.id)).unwrap();
        console.log(userResponse);
        
        sessionStorage.setItem("name", userResponse.fullName);

        return { token: response.data.token, email: credentials.email };
        
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 404) {
                Swal.fire({
                    title: "User not found",
                    text: "please register first",
                    icon: "error"
                  });
                return thunkAPI.rejectWithValue("User not found");
            }
            if (error.response.status === 500) {
                Swal.fire({
                    title: "There is an error on our side",
                    text: "try again later",
                    icon: "error"
                  });
                return thunkAPI.rejectWithValue("Server error");
            }
        }
        return thunkAPI.rejectWithValue("Network error");
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        sessionStorage.removeItem("token");
        sessionStorage.setItem("token", "")
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("name");
        return null;
    } catch (error: any) {
        return thunkAPI.rejectWithValue("Logout failed");
    }
});

const userSlice = createSlice({
    name: 'users',
    initialState: {
        list: [] as User[],
        token: sessionStorage.getItem("token"),
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
                Swal.fire({
                    title: "Welcome back!",
                    text: "lets continoue",
                    icon: "success"
                  });
            })
            .addCase(login.rejected, () => {
                alert('Login failed, try again later :{');
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(addUser.rejected, () => {
                Swal.fire({
                    title: "Did you register?",
                    text: "Please register first",
                    icon: "question"
                  });
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.list = state.list.map(user => user.id === action.payload.id ? action.payload : user);
            })
            .addCase(updateUser.rejected, () => {
                Swal.fire({
                    title: "The update failed...",
                    text: "try again later",
                    icon: "error"
                  });
            })
            .addCase(logout.fulfilled, (state) => {
                state.token = null;
                state.currentUser = null;
            })
            .addCase(logout.rejected, () => {
                Swal.fire({
                    title: "The logout failled",
                    text: "try again soon",
                    icon: "error"
                  });
            });
    }
});

export default userSlice.reducer;
