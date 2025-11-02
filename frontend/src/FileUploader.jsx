import React, { useState } from "react";
import { UploadButton } from "./lib/uploadthing";

function FileUploader() {
  const [fileUrl, setFileUrl] = useState("");

  const handleUploadComplete = async (files) => {
    const url = files[0].url;
    setFileUrl(url);
    console.log("Uploaded URL:", url);

    try {
      const response = await fetch("http://127.0.0.1:5000/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      console.log("Server response:", data);
    } catch (err) {
      console.error("Error sending URL to Flask:", err);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <UploadButton
        endpoint="pdfUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error) => alert(`Upload failed: ${error.message}`)}
      />

      {fileUrl && (
        <div className="mt-4">
          <p>File uploaded successfully:</p>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            {fileUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
