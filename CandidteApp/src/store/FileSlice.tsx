
// // export default fileSlice.reducer;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Files from "../models/Files";
// import TokenInterceptor from "../components/TokenInterceptor";
// const API_URL = 'http://localhost:5071';

// export const uploadFile = createAsyncThunk(
//   "files/uploadFile",
//   async ({ file, fileMetadata }: { file: File; fileMetadata: object }, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       formData.append("f", file);
//       formData.append("file", JSON.stringify(fileMetadata));
      
//       const response = await TokenInterceptor.post(`${API_URL}/upload`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Upload failed");
//     }
//   }
// );

// export const deleteFile = createAsyncThunk(
//   "files/deleteFile",
//   async ({  ownerId }: {  ownerId: number }, { rejectWithValue }) => {
//     try {
//       const response = await TokenInterceptor.delete(`${API_URL}/files/${ownerId}`, );

//       if (response.status === 200) {
//         return {ownerId,  message: response.data }; // מחזירים את ה-id של הקובץ
//       } else {
//         return rejectWithValue("File not found");
//       }
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Error deleting file");
//     }
//   }
// );




// const FileSlice = createSlice({
//   name: "files",
//   initialState: {
//     files: [] as Files[], // Array to hold the list of files
//     isLoading: false,
//     error: "",
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(uploadFile.pending, (state) => {
//         state.isLoading = true;
//         state.error = "";
//       })
//       .addCase(uploadFile.fulfilled, (state, action) => {
//         state.isLoading = true;
//         state.files.push(action.payload as Files);
//       })
//       .addCase(uploadFile.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(deleteFile.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(deleteFile.fulfilled, (state, action) => {
//           state.isLoading = false;
//           state.files = state.files.filter((file) => file.ownerId !== action.payload.ownerId);
//         })
//         .addCase(deleteFile.rejected, (state, action) => {
//           state.isLoading = false;
//           state.error = action.payload as string;
//         })
     
//   },
// });

// export default FileSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Files from "../models/Files";
import TokenInterceptor from "../components/TokenInterceptor";

const API_URL = 'http://localhost:5071';

// Upload file to S3
export const uploadFile = createAsyncThunk(
  "files/uploadFile",
  async ({ file, fileMetadata }: { file: File; fileMetadata: object }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("f", file);
      formData.append("file", JSON.stringify(fileMetadata));
      console.log();
      
      const response = await TokenInterceptor.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Upload failed");
    }
  }
);

// Add file metadata to DB
export const addFile = createAsyncThunk(
  "files/addFile",
  async (fileMetadata: { fileName: string; fileType: string; ownerId: number; size: number }, { rejectWithValue }) => {
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
        return rejectWithValue("File not found");
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error deleting file");
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
      })
      .addCase(addFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files.push(action.payload as Files);
      })
      .addCase(addFile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files = state.files.filter((file) => file.ownerId !== action.payload.ownerId);
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default FileSlice.reducer;
