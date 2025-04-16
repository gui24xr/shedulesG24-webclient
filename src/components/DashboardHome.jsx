import React from 'react';
import { Row, Col } from 'antd';
import HeaderUserInfo from './HeaderUserInfo';
import RapidActionsPanel from './RapidActionsPanel';
import RapidStaticsPanel from './RapidStaticsPanel';
import styles from './styles/DashboardHome.module.css';

const DashboardHome = () => {
    return (
        <div className={styles.dashboardHome}>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <HeaderUserInfo />
                </Col>
                <Col span={24}>
                    <RapidStaticsPanel/>
                </Col>
                <Col span={24}>
                   <RapidActionsPanel/>
                </Col>
                {/* Aquí puedes agregar más componentes */}
            </Row>
        </div>
    );
};

export default DashboardHome; 