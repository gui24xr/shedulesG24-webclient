import React, { useEffect } from "react";
import styles from "./styles/BookingForm.module.css";
const BookingForm = () => {
    
    const handleSubmit = (event) =>{
        event.preventDefault()
        const formData = new FormData(event.target)
        const formValues = Object.fromEntries(formData.entries())
         console.log(formValues)
         //sendDataToServer(formValues)
    }

  return (
    <div>
      <div className={styles.container}>
        <h1>Impresión de Turnos</h1>
        <form id="turnoForm" onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label for="nombrePaciente">Nombre del Paciente:</label>
            <input type="text" id="nombrePaciente" name="patient" required />
          </div>

          <div className={styles.formGroup}>
            <label for="nombreMedico">Nombre del Médico:</label>
            <input type="text" id="nombreMedico" name="medic" required />
          </div>

          <div className={styles.formGroup}>
            <label for="fechaTurno">Fecha del Turno:</label>
            <input type="date" id="fechaTurno" name="date" required />
          </div>

          <div className={styles.formGroup}>
            <label for="horaTurno">Hora del Turno:</label>
            <input type="time" id="horaTurno" name="hour" required />
          </div>

          <div className={styles.formGroup}>
            <label for="institucion">Nombre de la Institución:</label>
            <input type="text" id="institucion" name="clinic" required />
          </div>

          <button type="submit">Generar Turno</button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
