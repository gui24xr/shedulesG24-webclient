import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../../components/index.js';
import SideMenu from './SideMenu.jsx'
import { useProfileStore } from '../../store/index.js';
import { useNavigate } from 'react-router-dom';


const { Content,Sider } = Layout;

export default function OwnersDashboardLayout() {


    const isAutenticated = useProfileStore(state => state.isAutenticated)
    const navigate = useNavigate()
    
    useEffect(()=>{
      if(!isAutenticated){
        navigate("/")
      }
    },[isAutenticated])
  
    return (
        <Layout >
            <Sider>
                <SideMenu />
            </Sider>
           
            <Layout >
                <NavBar />
                <Content >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
} 