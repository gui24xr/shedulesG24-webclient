import React from 'react'
import { EstablishmentsContainer, EstablishmentCard, HeaderUserInfo } from '../components/index'
import { Row, Col } from 'antd'

export default function OwnersDashboard() {
  
  return (
    <div> 
      <HeaderUserInfo />
      <EstablishmentsContainer>
        {({items}) => (
          <Row gutter={[16, 16]}>
            {items.map((item) => (
              <Col xs={24} md={12} lg={8} key={item.id}>
                <EstablishmentCard establishment={item}  />
              </Col>
            ))}
          </Row>
        )}
      </EstablishmentsContainer>
    </div>  )
}

