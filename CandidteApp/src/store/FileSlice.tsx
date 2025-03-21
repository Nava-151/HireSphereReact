
// export default fileSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Files from "../models/Files";
import TokenInterceptor from "../components/TokenInterceptor";
const API_URL = 'https://hiresphereapi.onrender.com';

export const uploadFile = createAsyncThunk(
  "files/uploadFile",
  async ({ file, fileMetadata }: { file: File; fileMetadata: object }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("f", file);
      formData.append("file", JSON.stringify(fileMetadata));
      
      const response = await TokenInterceptor.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Upload failed");
    }
  }
);

const FileSlice = createSlice({
  name: "files",
  initialState: {
    files: [] as Files[],
    isLoading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files.push(action.payload as Files);
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default FileSlice.reducer;
