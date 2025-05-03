import React from 'react';
import { Row, Col, Card } from 'antd';
import { RapidActionPanelsEstablishment, EstablishmentDetail } from '../components/index.js';
import styles from '../components/styles/Dashboard.module.css';

export default function EstablishmentDashboardIndex() {
    return (
        <div className={styles.dashboardContainer}>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Card className={styles.actionsCard}>
                        <RapidActionPanelsEstablishment />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card className={styles.detailCard}>
                        <EstablishmentDetail />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
