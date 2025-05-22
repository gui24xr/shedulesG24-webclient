import React, { useEffect } from 'react';
import { Card,Form,Select, Radio, Input, Button, Typography, Divider, Row, Col } from 'antd';
import { useEstablishmentsStore, useMetadataStore} from '../store/index.js';
import { useNavigate } from 'react-router-dom';

const renderField = (field) => {
    console.log('Rendering field:', field);

    switch(field.inputType) {
        case 'Input':
            switch(field.type) {
                case 'text':
                    return <Input placeholder={field.placeholder} />;
                
                  case 'textarea':
                    return <Input.TextArea placeholder={field.placeholder} />;
                
                  case 'email':
                    return <Input type="email" placeholder={field.placeholder} />;
                
                  case 'password':
                    return <Input.Password placeholder={field.placeholder} />;
                
                  case 'number':
                    return <Input type="number" placeholder={field.placeholder} />; // o InputNumber si preferís
                
                  case 'tel':
                    return <Input type="tel" placeholder={field.placeholder} />;
                
                  case 'url':
                    return <Input type="url" placeholder={field.placeholder} />;
                
                  case 'search':
                    return <Input.Search placeholder={field.placeholder} />;
                default:
                    return <Input placeholder={field.placeholder} />;
            }
        case 'Select':  // Ahora coincide con tu metadata
            console.log('Select options:', field.options);
            return <Select 
                placeholder={field.placeholder}
                options={field.options?.map(opt => ({
                    value: opt.value,
                    label: opt.label,
                    title: opt.description
                }))}
                notFoundContent="No hay opciones disponibles"
                mode={field.type === 'tags' ? 'tags' : field.type === 'multiple' ? 'multiple' : undefined}
            />;
        case 'Radio':
            return <Radio.Group options={field.options} />;
        default:
            console.log('Default case for field:', field);
            return <Input placeholder={field.placeholder} />;
    }
};

const SectionForm = ({sectionData}) => {
    return(
        <Col xs={24} md={12} style={{ padding: '40px' }}>
            <Typography.Title level={4}>{sectionData.title}</Typography.Title>
            {sectionData.fields.map((field)=>{
                return(
                    <Form.Item 
                   
                        key={field.id} 
                        name={field.name.split('.').map(part => part.trim())} 
                        label={field.label} 
                        rules={field.rules}
                    >
                        {renderField(field)}
                    </Form.Item>
                )
            })}
            <Divider />
        </Col>
    )
}

export default function CreateEstablishmentForm (){
    const navigate = useNavigate();
    const loading = useEstablishmentsStore(state => state)
    const error = useEstablishmentsStore(state => state)
    const createEstablishment = useEstablishmentsStore(state => state.createEstablishment)
    const createEstablishmentForm = useMetadataStore(state => state.data.createEstablishmentForm)
    const [form] = Form.useForm()

 
    useEffect(() => {
        console.log('Formulario de creación de establecimiento objeto desde el backend: ', createEstablishmentForm)
    }, [createEstablishmentForm])
    
    const onFinish = (values) => {
        console.log('onFinish values: ', values)
    }
   
    return (
        <Card title={createEstablishmentForm.title} style={{ width: '100%' }}>
          
            <Form 
                form={form} 
                onFinish={onFinish} 
                name="createEstablishmentForm" 
                layout="vertical"
                style={{width: '100%'}}
                >
                   <Row gutter={[24, 24]}>
                    {createEstablishmentForm.sections.map((section)=>
                        <SectionForm key={section.id} sectionData={section}/>)
                    }
                   </Row>
              
                   <Form.Item style={{ textAlign: 'center', marginTop: '24px'}}>
                        <Button type="primary" htmlType="submit" size="large" style={{padding: '10px 20px'}}>
                        Enviar
                        </Button>
                   </Form.Item>
            </Form>
            
        </Card>
    )
}
