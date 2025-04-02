

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Files from "../models/Files";
// import TokenInterceptor from "../components/TokenInterceptor";

// // const API_URL =  process.env.VITE_API_URL;
// const API_URL = import.meta.env.VITE_API_URL;



// // Upload file to S3
// export const uploadFile = createAsyncThunk(
//   "files/uploadFile",
//   async ({ file, fileMetadata }: { file: File; fileMetadata: object }, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       formData.append("f", file);
//       formData.append("file", JSON.stringify(fileMetadata));

//       const response = await TokenInterceptor.post(`${API_URL}/upload`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Upload failed");
//     }
//   }
// );

// // Add file metadata to DB
// export const addFile = createAsyncThunk(
//   "files/addFile",
//   async (fileMetadata: { fileName: string; fileType: string; ownerId: number; size: number }, { rejectWithValue }) => {
//     try {
//       const response = await TokenInterceptor.post(`${API_URL}/files`, fileMetadata);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to save file metadata");
//     }
//   }
// );

// // Delete file
// export const deleteFile = createAsyncThunk(
//   "files/deleteFile",
//   async ({ ownerId }: { ownerId: number }, { rejectWithValue }) => {
//     try {
//       const response = await TokenInterceptor.delete(`${API_URL}/files/${ownerId}`);

//       if (response.status === 200) {
//         return { ownerId, message: response.data };
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
//     files: [] as Files[],
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
//         state.isLoading = false;
//         state.files.push(action.payload as Files);
//       })
//       .addCase(uploadFile.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(addFile.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(addFile.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.files.push(action.payload as Files);
//       })
//       .addCase(addFile.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(deleteFile.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(deleteFile.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.files = state.files.filter((file) => file.ownerId !== action.payload.ownerId);
//       })
//       .addCase(deleteFile.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default FileSlice.reducer;
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

// export const uploadToS3 =  createAsyncThunk(
//   "files/uploadFile",
// async (file: File | null) => {
//   if (!file) return false;
//   try {
//     // Request Presigned URL from the server
//     const response = await TokenInterceptor.get('https://hiresphereapi.onrender.com/files/upload', {
//       params: { fileName: file.name }
//     });

//     const presignedUrl: URL = response.data as URL;
//     const xhr = new XMLHttpRequest();

//     return new Promise((resolve: (value: boolean) => void, reject) => {
//       xhr.onload = () => {
//         if (xhr.status === 200) {
//           resolve(true);
//         } else {
//           console.error('Upload error:', xhr.statusText);
//           reject(new Error(`Upload failed with status: ${xhr.statusText}`)); // Pass an error object
//         }
//       };

//       xhr.onerror = () => {
//         reject(new Error('Network error occurred during file upload')); // Handle network errors
//       };

//       xhr.open('PUT', presignedUrl.toString());
//       xhr.send(file);
//     });
// } catch (error) {
//     console.error('Error requesting presigned URL:', error);
//     throw error; // Re-throw the error for further handling
// }
// })
export const uploadToS3 = createAsyncThunk<boolean, File | null>(
  "files/uploadFile",
  async (file, { rejectWithValue }) => {
    if (!file) return rejectWithValue("No file provided");

    try {
      const response = await TokenInterceptor.get(`${API_URL}/files/upload`, {
        params: { fileName: file.name },
      });

      const presignedUrl: string = response.data as string;
      const xhr = new XMLHttpRequest();
      const analyze = await TokenInterceptor.post(`${API_URL}/files/resume/analyze`, { S3Key: file.name, UserId: localStorage.getItem("userId") });
      if (analyze.status === 200) {
        alert("you have finished this step , we are moving to the next step ...")
      }
      return new Promise<boolean>((resolve) => {
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(true);
          } else {
            rejectWithValue(`Upload failed with status: ${xhr.statusText}`);
          }
        };

        xhr.onerror = () => {
          rejectWithValue("Network error occurred during file upload");
        };

        xhr.open("PUT", presignedUrl);
        xhr.send(file);
      });

    } catch (error: any) {
      return rejectWithValue(error.message || "Error requesting presigned URL");
    }
  }
);

// Upload file to S3


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
