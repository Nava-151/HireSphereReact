// // // import React, { useState } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { uploadFile } from "../../store/FileSlice";
// // // import { RootState } from "@reduxjs/toolkit/query";

// // // const FileUpload: React.FC = () => {
// // //   const dispatch = useDispatch();
// // //   const { isLoading, error, files } = useSelector((state: RootState) => state.files);
// // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);

// // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // //     if (event.target.files && event.target.files.length > 0) {
// // //       setSelectedFile(event.target.files[0]);
// // //     }
// // //   };

// // //   const handleUpload = () => {
// // //     if (selectedFile) {
// // //       dispatch(uploadFile(selectedFile));
// // //     }
// // //   };

// // //   return (
// // //     <div className="max-w-md mx-auto p-6 bg-gray-900 shadow-xl rounded-lg border border-blue-500 text-white sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
// // //       <h2 className="text-2xl font-semibold mb-4 text-blue-400 text-center">Upload a File</h2>
// // //       <input 
// // //         type="file" 
// // //         onChange={handleFileChange} 
// // //         className="mb-4 p-2 border rounded w-full bg-gray-800 text-white border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //       />
// // //       <button
// // //         onClick={handleUpload}
// // //         disabled={isLoading}
// // //         className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //       >
// // //         {isLoading ? "Uploading..." : "Upload"}
// // //       </button>
// // //       {error && <p className="text-red-500 mt-2 text-center">Error: {error}</p>}
// // //       <ul className="mt-4 text-blue-300 divide-y divide-blue-400">
// // //         {files.map((file: { fileName: string }, index: number) => (
// // //           <li key={index} className="py-2 text-center">{file.fileName}</li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   );
// // // };

// // // export default FileUpload;
// // import React, { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { uploadFile } from "../../store/FileSlice";
// // import { RootState } from "@reduxjs/toolkit/query";

// // const FileUpload: React.FC = () => {
// //   const dispatch = useDispatch();
// //   const { isLoading, error, files } = useSelector((state: RootState) => state.files);
// //   const { user } = useSelector((state: RootState) => state.user);
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);

// //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     if (event.target.files && event.target.files.length > 0) {
// //       setSelectedFile(event.target.files[0]);
// //     }
// //   };

// //   const handleUpload = () => {
// //     if (selectedFile) {
// //       dispatch(uploadFile(selectedFile) as any);
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto p-6 bg-gray-900 shadow-xl rounded-lg border border-blue-500 text-white">
// //       <h2 className="text-2xl font-semibold mb-4 text-blue-400 text-center">Upload a File</h2>
// //       {user && <p className="text-center text-blue-300 mb-2">Logged in as: {user.name}</p>}
// //       <input 
// //         type="file" 
// //         onChange={handleFileChange} 
// //         className="mb-4 p-2 border rounded w-full bg-gray-800 text-white border-blue-400"
// //       />
// //       <button
// //         onClick={handleUpload}
// //         disabled={isLoading}
// //         className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
// //       >
// //         {isLoading ? "Uploading..." : "Upload"}
// //       </button>
// //       {error && <p className="text-red-500 mt-2 text-center">Error: {error}</p>}
// //       <ul className="mt-4 text-blue-300 divide-y divide-blue-400">
// //         {files.map((file: { fileName: string }, index: number) => (
// //           <li key={index} className="py-2 text-center">{file.fileName}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store";
// import { uploadFile } from "../../store/FileSlice";

// const FileUpload: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { isLoading, error, files } = useSelector((state: RootState) => state.files);
//   const { list } = useSelector((state: RootState) => state.user);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = () => {
//     if (selectedFile && list) {
//       const formData = new FormData();
//       formData.append("f", selectedFile);
//       formData.append("file", JSON.stringify({
//         fileName: selectedFile.name,
//         size: selectedFile.size,
//         ownerId: localStorage.getItem("userId")||"0",
//       }));
      
//       dispatch(uploadFile(formData));
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="w-full max-w-3xl mx-auto p-6 bg-gray-900 shadow-xl rounded-lg border border-blue-500 text-white">
//         <h2 className="text-2xl font-semibold mb-4 text-blue-400 text-center">Upload a File</h2>
//         <input 
//           type="file" 
//           onChange={handleFileChange} 
//           className="mb-4 p-2 border rounded w-full bg-gray-800 text-white border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={handleUpload}
//           disabled={isLoading}
//           className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {isLoading ? "Uploading..." : "Upload"}
//         </button>
//         {error && <p className="text-red-500 mt-2 text-center">Error: {error}</p>}
//         <ul className="mt-4 text-blue-300 divide-y divide-blue-400">
//           {files.map((file:any, index:number) => (
//             <li key={index} className="py-2 text-center">{file.fileName}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default FileUpload;
