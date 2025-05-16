import { loglevel } from '../libs/index.js'
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useProfileStore } from "../store/index.js"
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';

  export default function LoginHandler() {
    
    const {user:auth0User, getAccessTokenSilently,isLoading:isLoadingAuth0, isAuthenticated, loginWithRedirect} = useAuth0()
    const loginOwnerInServerAndSetProfile = useProfileStore(state => state.loginOwnerInServerAndSetProfile)
    const navigate = useNavigate()
  
    const getAuth0TokenAndLoginInServer = async () => {
      try {
        const auth0Token = await getAccessTokenSilently();
        loglevel.debug("auth0Token",auth0Token);
        
        loginOwnerInServerAndSetProfile({
          auth0Token:auth0Token,
          onSuccess: () => {
            loglevel.debug("Usuario logueado");
            navigate("/");
          },
          onFailure: () => {
            alert("Error al iniciar sesión en cliente 2");
            navigate('/logout');
          }
        });
      } catch (error) {
        console.error(error);
        alert("Error al iniciar sesión 3");
        navigate('/logout')
      }
    };


  useEffect(() => {
    if (isLoadingAuth0) return;
    if (!isAuthenticated && !auth0User) {
      console.log("Antes de hacer login with redirecct")
      loginWithRedirect()
    }

    
    console.log("Antes de obtener token de auth0")
    getAuth0TokenAndLoginInServer();
  }, [isLoadingAuth0,isAuthenticated ]);
  

  if (isLoadingAuth0) return <Spin />
  
  return null
}
