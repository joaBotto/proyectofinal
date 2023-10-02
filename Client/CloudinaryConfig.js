import React from "react";
import { CloudinaryContext } from "cloudinary-react";
import App from "./App"; // Reemplaza "App" con el nombre de tu componente principal

const CloudinaryConfig = () => {
  return (
    <CloudinaryContext cloudName="ddupuyeko">
      <App />
    </CloudinaryContext>
  );
};

export default CloudinaryConfig;
