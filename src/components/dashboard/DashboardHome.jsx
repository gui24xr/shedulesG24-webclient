import React from 'react';
import { Row, Col } from 'antd';
import HeaderUserInfo from '../common/HeaderUserInfo';
import RapidActionsPanel from '../common/RapidActionsPanel';
import useProfileStore from '../../store/useProfileStore';

const DashboardHome = () => {
  const { currentUser } = useProfileStore();

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <HeaderUserInfo currentUser={currentUser} />
        </Col>
        <Col span={24}>
          <RapidActionsPanel />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHome; 