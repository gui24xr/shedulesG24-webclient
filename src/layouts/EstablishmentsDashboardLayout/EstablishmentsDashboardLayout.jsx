import { NavBar } from "../../components/index.js";
import { Layout, Menu, } from "antd";
import { Outlet, Link } from 'react-router-dom';



const { Content, Header } = Layout;

export default function EstablishmentsDashboardLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      
       <h1>Establishments Dashboard Layout</h1>
    

      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
