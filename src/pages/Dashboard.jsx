import React from 'react';
import { HeaderUserInfo, RapidActionsPanel, RapidStaticsPanel } from '../components';
import { Card, Row, Col, Avatar, Typography, Space, Button } from 'antd';

import useProfileStore from '../store/useProfileStore';
import styles from '../components/styles/Dashboard.module.css';

const { Title, Text } = Typography;

const Dashboard = () => {
    const {currentUser} = useProfileStore();

    return (
       
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <HeaderUserInfo currentUser={currentUser}/>
                <RapidStaticsPanel />
                <RapidActionsPanel />
            </div>
        
    );
}

export default Dashboard;
