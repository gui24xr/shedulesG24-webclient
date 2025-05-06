import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { HomeLayout, EstablishmentsDashboardLayout, OwnersDashboardLayout } from "./layouts/index.js";
import { HomeIndex, OwnersDashboard, EstablishmentsDashboardIndex } from "./pages/index.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useProfileStore } from "./store/index.js";
import { useNavigate } from "react-router-dom";

function App() {


  const {user, getAccessTokenSilently,logout} = useAuth0()
  const {loginOwnerInServer} = useProfileStore()
  const navigate = useNavigate()

  useEffect(()=>{
   
  const setProfileStore = async (loggedUser) =>{
    try{
      if (!loggedUser) return ()=>{console.log("No hay usuario")}

      const auth0Token = await getAccessTokenSilently()
      console.log(auth0Token)
      loginOwnerInServer({
        auth0Token: auth0Token,
        onSuccess: () => {
          console.log("Usuario logueado")
          navigate("/owners")
        },
        onFailure: () => {
          alert("Error al loguear")
          logout()
        }
      
      })
    }catch(error){
      console.log(error)
    }
  }

   setProfileStore(user)
  },[user])
  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomeIndex />} />
        </Route>
        
        
        {/* Owners Dashboard */}
        <Route path="/owners" element={<OwnersDashboardLayout />}>
          <Route index element={<OwnersDashboard />} />
          <Route path="profile" element={<h1>Profile</h1>} />
          <Route path="address" element={<h1>Address</h1>} />
          <Route path="establishment/new" element={<h1>New Establishment</h1>} />
        </Route>

        {/* Establishments Dashboard */}
        <Route path="/establishments/:id" element={<EstablishmentsDashboardLayout />}>
          <Route index element={<EstablishmentsDashboardIndex />} />
          <Route path="profile" element={<h1>Profile</h1>} />
          <Route path="address" element={<h1>Address</h1>} />
          <Route path="establishment/new" element={<h1>New Establishment</h1>} />
        </Route>

       
       
      </Routes>
    </>
  );
}

export default App;

