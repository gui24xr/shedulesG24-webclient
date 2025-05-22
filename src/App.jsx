import { loglevel } from "./libs/index.js";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { HomeLayout, EstablishmentsDashboardLayout, OwnersDashboardLayout } from "./layouts/index.js";
import { HomeIndex, OwnersDashboard, EstablishmentsDashboardIndex } from "./pages/index.js";
import { LoginHandler, LogoutHandler, OwnerProfileForm, CreateEstablishmentForm } from "./components/index.js";
import { useProfileStore, useMetadataStore } from "./store/index.js";
import { Spin } from 'antd';


function App() {
  const checkSessionInServerAndSetProfile = useProfileStore(state => state.checkSessionInServerAndSetProfile)
  const isAutenticated = useProfileStore(state => state.isAutenticated)
  //const loading = useProfileStore(state => state.loading)
  //const error = useProfileStore(state => state.error)
  const fetchMetadata = useMetadataStore(state => state.fetchMetadata)
  const metadataIsLoading = useMetadataStore(state => state.loading)
  const metadataError = useMetadataStore(state => state.error)

  useEffect(() => {
    !isAutenticated && checkSessionInServerAndSetProfile({})
  }, [])

  useEffect(() => {
    fetchMetadata()
  }, [])

  if(metadataIsLoading) return <Spin />
  if(metadataError) return <div>Error: {metadataError.message}</div>

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
          <Route path="profile" element={<OwnerProfileForm />} />
          <Route path="address" element={<h1>Address</h1>} />
          <Route path="establishment/new" element={<CreateEstablishmentForm />} />
        </Route>

        {/* Establishments Dashboard */}
        <Route path="/establishments/:id" element={<EstablishmentsDashboardLayout />}>
          <Route index element={<EstablishmentsDashboardIndex />} />
          <Route path="profile" element={<h1>Profile</h1>} />
          <Route path="address" element={<h1>Address</h1>} />

        </Route>

      </Routes>
    </>
  );
}

export default App;

