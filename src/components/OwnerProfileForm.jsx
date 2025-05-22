import React, {useEffect, useState} from 'react';

import { useProfileStore } from '../store/index';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Avatar, Space, Typography, Card, Divider } from 'antd';

const { Text } = Typography;
export const OwnerProfileForm = () => {
    const navigate = useNavigate();
    //const currentProfile = useProfileStore(state => state.currentUser)

    const currentProfile = useProfileStore(state => state.currentUser)
    const updateOwnerData = useProfileStore(state => state.updateOwnerDataInserver)

    const [form] = Form.useForm()
    const onFinish = (values) => {
      console.log(values)
      updateOwnerData({data: values, onSuccess: () => {
        message.success('Datos actualizados correctamente')
      }, onFailure: () => {
        message.error('Error al actualizar los datos')
      }})
    }


    

    return (
      <Card title="Datos de perfil">
      <Form
      form={form}
      name="formulario_basico"
      layout="inline"
      sp
      onFinish={onFinish}
      initialValues={{
        firstName: currentProfile?.firstName || null,
        lastName: currentProfile?.lastName || null,
        phoneNumber: currentProfile?.phoneNumber || null,
      }}
    >
       
      <Space direction="vertical" size={16} align="center">
        <Form.Item
        label="Nombre" name="firstName"
        rules={[
            { required: true, message: 'Por favor ingresa tu nombre' },
          ]}>
          <Input placeholder="Ingresa tu nombre" />
        </Form.Item>

        <Form.Item
        label="Apellido" name="lastName"
        rules={[
            { required: true, message: 'Por favor ingresa tu apellido' },
          ]}>
          <Input placeholder="Ingresa tu nombre" />
        </Form.Item>

        <Divider />

        <Form.Item
        label="Telefono" name="phoneNumber"
        rules={[
            { required: true, message: 'Por favor ingresa tu telefono' },
          ]}>
          <Input placeholder="Ingresa tu telefono" />
        </Form.Item>

      
        <Space direction="vertical" size={16} align="center">
            <Avatar src={currentProfile?.avatar} size={100} />
            <Text>Foto de perfil</Text>
        </Space>
       
        <Form.Item >
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Space>
      </Form>
      </Card>
    );
  }
  
  export default OwnerProfileForm;
