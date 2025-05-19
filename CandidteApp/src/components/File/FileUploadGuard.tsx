// FileUploadGuard.tsx

import { JSX, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { RootState } from '../../store/store';
import { getFilesByUserId } from "../../store/FileSlice";
import Spinner from "../Spinner";

const FileUploadGuard = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch<AppDispatch>();
  const uploadedOnce = useSelector((state: RootState) => state.files.uploadedOnce);
  const isLoading = useSelector((state: RootState) => state.files.isLoading);
  const userId = Number(sessionStorage.getItem("userId"));

  useEffect(() => {
    dispatch(getFilesByUserId(userId));
  }, [dispatch, userId]);

  if (isLoading) return <Spinner />;
  else if (uploadedOnce) return <Navigate to="/" replace />;
console.log("uploadedOnce", uploadedOnce);

  return children;
};

export default FileUploadGuard;
