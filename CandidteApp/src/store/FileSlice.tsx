
import Swal from 'sweetalert2'

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Files from "../models/Files";
import TokenInterceptor from "../components/TokenInterceptor";

const API_URL = import.meta.env.VITE_API_URL;

interface FileMetadata {
  fileName: string;
  fileType: string;
  ownerId: number;
  size: number;
}

interface FileState {
  files: Files[];
  isLoading: boolean;
  error: string | null;
  presignedUrl: string | null;
  uploadedOnce:boolean;

}

const initialState: FileState = {
  files: [],
  isLoading: false,
  error: null,
  presignedUrl: null,
  uploadedOnce:false
};

export const uploadToS3 = createAsyncThunk<boolean, File | null>(
  "files/uploadFile",
  async (file, { rejectWithValue }) => {
    if (!file) return rejectWithValue("No file provided");

    try {
      const response = await TokenInterceptor.get(`${API_URL}/files/upload`, {
        params: { fileName: file.name },
      });

      const presignedUrl: string = response.data as string;
console.log(presignedUrl+" presignedUrl");

      const uploadRes = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) {
        return rejectWithValue("Upload to S3 failed" +uploadRes);
      }

      const analyze = await TokenInterceptor.post(`${API_URL}/files/resume/analyze`, {
        S3Key: file.name,
        UserId: sessionStorage.getItem("userId")
      });

      if (analyze.status === 200) {
        Swal.fire({
          title: "Great we have finished!",
          icon: "success",
          draggable: true
        });
      }

      return true;

    } catch (error: any) {
      return rejectWithValue(error.message || "Error requesting presigned URL");
    }
  }
);



// Add file metadata to DB
export const addFile = createAsyncThunk(
  "files/addFile",
  async (fileMetadata: FileMetadata, { rejectWithValue }) => {
    try {
      const response = await TokenInterceptor.post(`${API_URL}/files`, fileMetadata);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to save file metadata");
    }
  }
);

// Delete file
export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async ({ ownerId }: { ownerId: number }, { rejectWithValue }) => {
    try {
      const response = await TokenInterceptor.delete(`${API_URL}/files/${ownerId}`);

      if (response.status === 200) {
        return { ownerId, message: response.data };
      } else {
console.log("res statts: "+response.status);

        return rejectWithValue("File not found");
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error deleting file");
    }
  }
);

// Fetch presigned URL for viewing file
export const fetchPresignedUrl = createAsyncThunk(
  "files/fetchPresignedUrl",
  async (ownerId: number, { rejectWithValue }) => {
    try {
      const response = await TokenInterceptor.get(`${API_URL}/files/view`, {
        params: { ownerId },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch presigned URL");
    }
  }
);

const FileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadToS3.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadToS3.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.isLoading = false;
        if (!action.payload) {
          state.error = "S3 Upload failed.";
        }
        state.uploadedOnce=true;
      })
      .addCase(uploadToS3.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addFile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFile.fulfilled, (state, action: PayloadAction<{ ownerId: number }>) => {
        state.isLoading = false;
        state.files = state.files.filter((file) => file.ownerId !== action.payload.ownerId);
        state.uploadedOnce=false;
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPresignedUrl.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPresignedUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.presignedUrl = action.payload as string;
      })
      .addCase(fetchPresignedUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default FileSlice.reducer;
