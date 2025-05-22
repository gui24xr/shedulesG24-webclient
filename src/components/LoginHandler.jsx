import { loglevel } from '../libs/index.js'
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useProfileStore } from "../store/index.js"
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';

export default function LoginHandler() {

  const { getAccessTokenSilently, isLoading: isLoadingAuth0, isAuthenticated: existAuth0Token, loginWithRedirect, logout: deleteAuth0Token } = useAuth0()
  const loginOwnerInServerAndSetProfile = useProfileStore(state => state.loginOwnerInServerAndSetProfile)
  const isAutenticatedInServer = useProfileStore(state => state.isAutenticated)
  const navigate = useNavigate()

  const loginInServerUsingAuth0Token = async () => {
    try {
      const auth0Token = await getAccessTokenSilently();
      loglevel.debug("Se obtuvo el auth0Token", auth0Token);

      loginOwnerInServerAndSetProfile({
        auth0Token: auth0Token,
        deleteAuth0TokenFunction: () => deleteAuth0Token({
          logoutParams: {
            localOnly: true
          }
        }),
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
      alert("Error al intentar obtener el token de Auth0");
      return navigate('/')
    }
  };

  useEffect(() => {
    if (isLoadingAuth0) return;
    if (isAutenticatedInServer) return navigate("/");
    if (!existAuth0Token) return loginWithRedirect();
    loginInServerUsingAuth0Token()
  }, [isLoadingAuth0]);

  if (isLoadingAuth0) return <Spin />
  return null
}
