import React, {useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select, Radio } from 'antd';
import styles from './styles/Forms.module.css'; 


import {useCatalogsStore,useProfileStore,useEstablishmentsStore} from '../store/index.js';
import { useNavigate } from 'react-router-dom';

const CreateEstablishment = () => {
    const navigate = useNavigate();
    const { loading:loadingCatalogs, error:errorCatalogs,establishmentsCategories, fetchEstablishmentsCategories} = useCatalogsStore()
    const {loading:loadingProfile, error:errorProfile, updateOwnerDataInserver} = useProfileStore()
    const {loading:loadingEstablishments, error:errorEstablishments, createEstablishment} = useEstablishmentsStore()
    
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            category: "",
            hasBranch: false
        }
    });

    useEffect(() => {
        fetchEstablishmentsCategories()
    }, [])

    const onSubmit = handleSubmit(data => {
        console.log('Data en componente: ', data)
        createEstablishment({
            establishmentData: data,
            onSuccess: () => {
                alert('Establecimiento creado correctamente')
            },
            onError: (error) => {
                console.log('Error en componente: ', error)
                alert('Error al crear establecimiento')
            }
        })
    })

    return (
        <>
        {loadingCatalogs && <p>Cargando categorías...</p>}
        {errorCatalogs && <p>Error al cargar categorías: {errorCatalogs.message}</p>}
        {establishmentsCategories.loaded && (
            <form onSubmit={onSubmit} className={styles.forms}>
                <h1>Ingresar datos basicos de tu establecimiento...</h1>
                
                <label>Categoria:</label>
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            value={value}
                            onChange={onChange}
                            style={{ width: '100%' }}
                            placeholder="Selecciona una categoría"
                        >
                            {establishmentsCategories.data?.map(category => (
                                <Select.Option key={category.id} value={category.id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    )}
                />
                {errors.category && <span className={styles.error}>La categoría es requerida</span>}

                <label>Nombre:</label>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <input 
                            type="text" 
                            value={value || ""}
                            onChange={onChange}
                        />
                    )}
                />
                {errors.name && <span className={styles.error}>El nombre es requerido</span>}

                <label>Tu Establecimiento tiene sucursales?</label>
                <Controller
                    name="hasBranch"
                    control={control}
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => (
                        <Radio.Group 
                            onChange={(e) => onChange(e.target.value)}
                            value={value}
                        >
                            <Radio value={true}>Sí</Radio>
                            <Radio value={false}>No</Radio>
                        </Radio.Group>
                    )}
                />
                {errors.hasBranch && <span className={styles.error}>Debes seleccionar una opción</span>}

                <button type="submit">Enviar</button>
            </form>
        )}
        </>
    )
}

export default CreateEstablishment;
