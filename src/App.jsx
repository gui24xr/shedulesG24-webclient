import { useEffect } from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import useProfileStore from "./store/useProfileStore.js";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./layout/layout.jsx";
import {Home, Dashboard} from "./pages/index.js";
import CreateCompanyForm from "./components/CreateCompanyForm.jsx";
import { Navigate } from "react-router-dom";

function App() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { loginUserInServer, logoutUserInServer } = useProfileStore();
  const navigate = useNavigate()
  

  useEffect(()=>{ 
    if (!isAuthenticated) logoutUserInServer()
    else {
      getAccessTokenSilently()
      .then((auth0Token) => {
        console.log('Token en nuevo use efectt: ', auth0Token)
        loginUserInServer({
          auth0Token: auth0Token,
          onSuccess: () => {
            alert('Se inicio sesion en el server, redirigir a dashboard....')
            return navigate('/dashboard')
          }
        })
      })
      .catch((error) => console.log('Error al obtener token de auth0...', error))
    }
  },[isAuthenticated])

  return (
    <>
      
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>} />
            <Route path="/createcompany" element={<CreateCompanyForm/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Route>
        </Routes>
     
    </>
  );
}

export default App;

