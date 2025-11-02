import { generateUploadButton } from "@uploadthing/react";

export const UploadButton = generateUploadButton({
  url: "http://localhost:3001/api/uploadthing",
  clientId:import.meta.env.VITE_UPLOADTHING_APP_ID
,
});

