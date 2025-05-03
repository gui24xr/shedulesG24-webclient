import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomeLayout, EstablishmentsLayout, OwnersDashboardLayout } from "./layouts/index.js";
import {Home} from "./pages/index.js";


function App() {
  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<h1>Home</h1>} />
        </Route>
        
        
        {/* Owners Dashboard */}
        <Route path="/owners" element={<OwnersDashboardLayout />}>
          <Route index element={<h1>Dashboard</h1>} />
          <Route path="profile" element={<h1>Profile</h1>} />
          <Route path="address" element={<h1>Address</h1>} />
          <Route path="establishment/new" element={<h1>New Establishment</h1>} />
        </Route>

       
       
      </Routes>
    </>
  );
}

export default App;

