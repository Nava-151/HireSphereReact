// // import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// // import axios from "axios";

// // interface FileState {
// //   files: { fileName: string }[];
// //   isLoading: boolean;
// //   error: string | null;
// // }

// // // מצב התחלתי של ה-slice
// // const initialState: FileState = {
// //   files: [],
// //   isLoading: false,
// //   error: null,
// // };
// // const API_URL = 'http://localhost:5071';

// // // פעולה אסינכרונית להעלאת קובץ
// // export const uploadFile = createAsyncThunk(
// //   "files/uploadFile",
// //   async (file: File, { rejectWithValue }) => {
// //     try {
// //       const formData = new FormData();
// //       formData.append("file", file);

// //       const response = await axios.post<{ fileName: string }>(
// //         "upload", 
// //         formData,
// //         { headers: { "Content-Type": "multipart/form-data" } }
// //       );

// //       return response.data;
// //     } catch (error: any) {
// //       return rejectWithValue(error.response?.data || "Upload failed");
// //     }
// //   }
// // );

// // // יצירת ה-slice
// // const FileSlice = createSlice({
// //   name: "files",
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(uploadFile.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(uploadFile.fulfilled, (state, action: PayloadAction<{ fileName: string }>) => {
// //         state.isLoading = false;
// //         state.files.push(action.payload);
// //       })
// //       .addCase(uploadFile.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.payload as string;
// //       });
// //   },
// // });

// // export default FileSlice;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import Files from "../models/Files";
// const API_URL = 'https://hiresphereapi.onrender.com';

// export const uploadFile = createAsyncThunk(
//   "files/uploadFile",
//   async (file: File, { rejectWithValue }) => {
//     try {
//       // 1. בקשת URL להעלאה
//       // const { data } = await axios.get<{ url: string; key: string }>(`${API_URL}/files/upload`, {});

//       // const uploadUrl = data.url;
//       // const s3Key = data.key; // המפתח שנשמר ב-S3

      

//       // 3. שליחת המפתח לשרת
//       const response = await axios.post(`/api/files/save`, { key: s3Key });

//       return response.data;
//     } catch (error:AxiosError) {
//       return rejectWithValue(error.response?.data || "Upload failed");
//     }
//   }
// );

// const fileSlice = createSlice({
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
//       });
//   },
// });

// export default fileSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Files from "../models/Files";
const API_URL = 'https://hiresphereapi.onrender.com';

export const uploadFile = createAsyncThunk(
  "files/uploadFile",
  async ({ file, fileMetadata }: { file: File; fileMetadata: object }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("f", file);
      formData.append("file", JSON.stringify(fileMetadata));
      
      const response = await axios.post(`${API_URL}/upload`, formData, {
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
