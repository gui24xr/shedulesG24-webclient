import React from 'react';
import styles from "./styles/FormsStyle.module.css";
import useProfileStore from '../store/useProfileStore';

const CreateCompanyForm = () => {

    const {createCompany} = useProfileStore()
    const handleSubmit = (event) =>{
        event.preventDefault()
        const formData = new FormData(event.target)
        const formValues = Object.fromEntries(formData.entries())
         console.log(formValues)
         //sendDataToServer(formValues)
        createCompany(formValues)
    }
    return (
    <div className={styles.container}>
            <h1>Ingresar datos de tu empresa...</h1>
            <form id="companyForm" onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label for="nombrePaciente">Nombre de tu empresa:</label>
                <input type="text" id="companyName" name="companyName" required />
              </div>
    
              <div className={styles.formGroup}>
                <label for="nombreMedico">Logotipo:</label>
                <input type="text" id="logoUrl" name="logoUrl" required />
              </div>

              <div className={styles.formGroup}>
                <label for="nombreMedico">Calle</label>
                <input type="text" id="street" name="street" required />
              </div>

              <div className={styles.formGroup}>
                <label for="nombreMedico">Numero:</label>
                <input type="text" id="streetNumber" name="streetNumber" required />
              </div>

              <div className={styles.formGroup}>
                <label for="nombreMedico">Piso:</label>
                <input type="text" id="floor" name="floor" required />
              </div>

              <div className={styles.formGroup}>
                <label for="nombreMedico">Departamento:</label>
                <input type="text" id="apartment" name="apartment" required />
              </div>

              <div className={styles.formGroup}>
                <label for="nombreMedico">Codigo postal:</label>
                <input type="text" id="postalCode" name="postalCode" required />
              </div>

              <div className={styles.formGroup}>
                <label for="nombreMedico">Estado:</label>
                <input type="text" id="state" name="state" required />
              </div>

              <div className={styles.formGroup}>
                <label for="nombreMedico">Pais:</label>
                <input type="text" id="country" name="country" required />
              </div>

              
              <div className={styles.formGroup}>
                <label for="nombreMedico">Email de contacto</label>
                <input type="email" id="contactEmail" name="contactEmail" required />
              </div>

                
              <button type="submit">Aceptar</button>
            </form>
          </div>
    );
}

export default CreateCompanyForm;
