import { useEffect } from "react";
import { NavBar } from "../../components/index.js";
import { Layout } from "antd";
import { Outlet,  } from 'react-router-dom';
import { useProfileStore } from "../../store/index.js"; 
import { useNavigate } from "react-router-dom";

const { Content, Header } = Layout;

export default function HomeLayout() {

  const isAutenticated = useProfileStore(state => state.isAutenticated)
  
  const navigate = useNavigate()
  
  useEffect(()=>{
    
    if(isAutenticated) return navigate("/owners")
    
  },[isAutenticated])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
        <NavBar />
    

      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
