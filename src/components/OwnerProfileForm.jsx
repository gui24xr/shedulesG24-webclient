import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles/Forms.module.css'; 
import apiClient from '../config/apiclient';
import useProfileStore from '../store/useProfileStore';
import { useNavigate } from 'react-router-dom';

export const OwnerProfileForm = () => {
    const navigate = useNavigate();
    const [ownerData, setOwnerData] = useState(null);
    const {updateOwnerDataInserver} = useProfileStore()
    const { register, handleSubmit, reset } = useForm();


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await apiClient.get('http://localhost:8081/api/owners');
            console.log(response.data); // Para ver en consola
            setOwnerData(response.data); // Guardás los datos en el state
          } catch (error) {
            console.error('Error al obtener los datos de los owners:', error);
          }
        };
      
        fetchData();
      }, []);

      useEffect(() => {
        if (ownerData) {
            reset({
                firstName: ownerData.firstName || '',
                lastName: ownerData.lastName || '',
                phoneNumber: ownerData.phoneNumber || ''
            });
        }
    }, [ownerData, reset]);

 

    const onSubmit = handleSubmit(data => {
        console.log('Data en componente: ', data)
        updateOwnerDataInserver({data, onSuccess: () => {
            alert('Datos actualizados correctamente')
            navigate('/dashboard')
        }, onFailure: () => {
            alert('Error al actualizar los datos')
        }})
      })

    return (
      <form onSubmit={onSubmit} className={styles.forms}>
          <h1>Ingresar tus datos personales...</h1>
          <label>Nombre:</label>
          <input type="text" name="firstName" 
          {...register('firstName')}
          />

          <label>Apellido:</label>
          <input type="text" name="lastName" 
          {...register('lastName')}
          />

          <label>Telefono:</label>
          <input type="text" name="phoneNumber" 
          {...register('phoneNumber')}
          />
    
        <button type="submit">Enviar</button>
      </form>
    );
  }
  
  export default OwnerProfileForm;
