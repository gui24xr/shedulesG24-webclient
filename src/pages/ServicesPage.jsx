import React from 'react';
import { useParams } from 'react-router-dom';

const ServicesPage = () => {
    console.log(useParams())
    const {cid:companyId} = useParams()

    console.log('Entro el companyId', companyId)
    return (
        <div>
            <h1>Services pages</h1>
        </div>
    );
}

export default ServicesPage;
