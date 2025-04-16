import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles/Forms.module.css';
import apiClient from '../config/apiclient';
import useProfileStore from '../store/useProfileStore';

function AddressForm() {
    const [addressData, setAddressData] = useState(null);
    const {updateOwnerDataInserver} = useProfileStore();
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('http://localhost:8081/api/owners');
                console.log(response.data);
                setAddressData(response.data?.location || {});
            } catch (error) {
                console.error('Error al obtener los datos de ubicación:', error);
            }
        };
      
        fetchData();
    }, []);

    useEffect(() => {
        if (addressData) {
            reset({
                street: addressData.street || '',
                streeNumber: addressData.streeNumber || '',
                floor: addressData.floor || '',
                apartment: addressData.apartment || '',
                city: addressData.city || '',
                postalCode: addressData.postalCode || '',
                state: addressData.state || '',
                country: addressData.country || '',
                latitude: addressData.latitude || '',
                longitude: addressData.longitude || ''
            });
        }
    }, [addressData, reset]);

    const onSubmit = handleSubmit(data => {
        console.log('Datos de ubicación:', data);
        updateOwnerDataInserver({
            data: { location: data },
            onSuccess: () => {
                alert('Datos de ubicación actualizados correctamente');
            },
            onFailure: () => {
                alert('Error al actualizar los datos de ubicación');
            }
        });
    });

    return (
        <form onSubmit={onSubmit} className={styles.forms}>
            <h1>Ingresar datos de ubicación...</h1>
            
            <div className={styles.formGroup}>
                <label>Calle:</label>
                <input 
                    type="text" 
                    {...register('street')}
                    placeholder="Nombre de la calle"
                />
            </div>

            <div className={styles.formGroup}>
                <label>Número:</label>
                <input 
                    type="text" 
                    {...register('streeNumber')}
                    placeholder="Número de calle"
                />
            </div>

            <div className={styles.formGroup}>
                <label>Piso:</label>
                <input 
                    type="text" 
                    {...register('floor')}
                    placeholder="Número de piso"
                />
            </div>

            <div className={styles.formGroup}>
                <label>Departamento:</label>
                <input 
                    type="text" 
                    {...register('apartment')}
                    placeholder="Número de departamento"
                />
            </div>

            <div className={styles.formGroup}>
                <label>Ciudad:</label>
                <input 
                    type="text" 
                    {...register('city')}
                    placeholder="Nombre de la ciudad"
                />
            </div>

            <div className={styles.formGroup}>
                <label>Código Postal:</label>
                <input 
                    type="text" 
                    {...register('postalCode')}
                    placeholder="Código postal"
                />
            </div>

            <div className={styles.formGroup}>
                <label>Provincia/Estado:</label>
                <input 
                    type="text" 
                    {...register('state')}
                    placeholder="Nombre de la provincia o estado"
                />
            </div>

            <div className={styles.formGroup}>
                <label>País:</label>
                <input 
                    type="text" 
                    {...register('country')}
                    placeholder="Nombre del país"
                />
            </div>

            <div className={styles.formGroup}>
                <label>Latitud:</label>
                <input 
                    type="number" 
                    step="any"
                    {...register('latitude')}
                    placeholder="Coordenada de latitud"
                />
            </div>

            <div className={styles.formGroup}>
                <label>Longitud:</label>
                <input 
                    type="number" 
                    step="any"
                    {...register('longitude')}
                    placeholder="Coordenada de longitud"
                />
            </div>

            <button type="submit">Guardar Ubicación</button>
        </form>
    );
}

export default AddressForm; 