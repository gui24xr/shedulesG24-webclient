import "./App.css";
import {  Routes, Route,  } from "react-router-dom";
import Layout from "./layout/layout.jsx";
import {Home, Dashboard, ServicesPage, OwnerDashboard, EmployeeDashboard} from "./pages/index.js";
import CreateCompanyForm from "./components/CreateCompanyForm.jsx";


function App() {


  return (
    <>
      
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>} />
            <Route path="/createcompany" element={<CreateCompanyForm/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/services/:cid" element={<ServicesPage/>} />
            <Route path="/owner/dashboard" element={<OwnerDashboard/>} />
            <Route path="/employee/dashboard" element={<EmployeeDashboard/>} />
            
          </Route>
        </Routes>
     
    </>
  );
}

export default App;

