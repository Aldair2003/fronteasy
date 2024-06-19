// src/app/Profile/reset/reset.tsx
import React from 'react';
import styles from '../Profile.module.css'; // Ajusta la ruta según la ubicación del archivo

const ResetPassword: React.FC = () => {
  return (
    <div className={styles.resetPasswordContainer}>
      <h2>Cambiar Contraseña</h2>
      <form>
        <div className={styles.formGroupFull}>
          <label className={styles.label}>Nueva Contraseña</label>
          <input type="password" className={styles.input} />
          <label className={styles.label}>Confirmar Nueva Contraseña</label>
          <input type="password" className={styles.input} />
        </div>
        <button type="submit" className={styles.button}>Guardar cambios</button>
      </form>
    </div>
  );
};

export default ResetPassword;
