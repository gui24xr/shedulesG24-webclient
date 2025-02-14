import { createRoot } from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-8puz7l6ml0moiqni.us.auth0.com"
      clientId="pwCiwAHvi33RnlAVRswa363QjxEJpFBc"
      cacheLocation="localstorage" // o "memory" para que no persista entre recargas
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "http://ShedulesAndAlarmsAPI",
      }}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);
