import {  Upload } from "@mui/icons-material";
import { Card, CardContent, Input, Button } from "@mui/material";
import { useState } from "react";


export default function UploadForm() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event:any) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    if (file) {
      console.log("Uploading file:", file);
      // הוסיפי כאן קריאה ל-API להעלאת הקובץ
    }
  };

  return (
    <>
    <div className="flex justify-center items-center  bg-gray-100 p-6">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-4">העלאת טופס</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                בחר קובץ להעלאה
              </label>
              <div className="mt-2 flex items-center gap-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                <Upload className="w-5 h-5 text-gray-500" />
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="text-gray-500 text-sm">
                  {file ? file : "לא נבחר קובץ"}
                </span>
              </div>
            </div>
            <Button type="submit" className="w-full">
              העלאה
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
