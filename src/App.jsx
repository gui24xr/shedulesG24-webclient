import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/layout.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import {Home} from "./pages/index.js";
import { OwnerProfileForm, AddressForm, DashboardHome, CreateEstablishment } from "./components/index.js";

function App() {
  return (
    <>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
        </Route>
        
        {/* Rutas del Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<OwnerProfileForm />} />
          <Route path="address" element={<AddressForm />} />
          <Route path="establishment/new" element={<CreateEstablishment />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

