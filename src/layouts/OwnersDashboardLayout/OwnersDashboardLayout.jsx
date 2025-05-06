import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../../components/index.js';
import SideMenu from './SideMenu.jsx'


const { Content,Sider } = Layout;

export default function OwnersDashboardLayout() {
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