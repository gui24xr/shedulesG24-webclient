import "./App.css";
import { loglevel } from "./libs/index.js";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { HomeLayout, EstablishmentsDashboardLayout, OwnersDashboardLayout } from "./layouts/index.js";
import { HomeIndex, OwnersDashboard, EstablishmentsDashboardIndex } from "./pages/index.js";
import { LoginHandler, LogoutHandler } from "./components/index.js";
import { useProfileStore } from "./store/index.js";
import { Spin } from 'antd';


function App() {
  const checkSessionInServerAndSetProfile = useProfileStore(state => state.checkSessionInServerAndSetProfile)
  const isAutenticated = useProfileStore(state => state.isAutenticated)
  const loading = useProfileStore(state => state.loading)
  const error = useProfileStore(state => state.error)

  useEffect(() => {
    //console.log('Cargando App ', Date.now())
    !isAutenticated && checkSessionInServerAndSetProfile({})
  }, [])

  if(loading) return <Spin />
  if(error) return <div>Error: {error.message}</div>

  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomeIndex />} />
        </Route>

        {/* handlelogin */}
        <Route path="/login" element={<LoginHandler />} />
        <Route path="/logout" element={<LogoutHandler />} />
   

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

