import { createRoot } from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";


const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;
const AUTH0_CACHE_LOCATION = import.meta.env.VITE_AUTH0_CACHE_LOCATION;
const AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE;

const auth0ConfigValues = {
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  cacheLocation: AUTH0_CACHE_LOCATION,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: AUTH0_AUDIENCE,
  },
};




createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Auth0Provider
      domain={auth0ConfigValues.domain}
      clientId={auth0ConfigValues.clientId}
      cacheLocation="localstorage" // o "memory" para que no persista entre recargas
      authorizationParams={{
        redirect_uri: window.location.origin + '/login', // 👈 vuelve al path exacto
        audience: auth0ConfigValues.authorizationParams.audience,
      }}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);
