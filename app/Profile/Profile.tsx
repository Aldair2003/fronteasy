// src/app/Profile/Profile.tsx
import React, { useState } from 'react';
import styles from './Profile.module.css';
import ProfileForm from './ProfileForm';
import ResetPassword from './reset/ResetPassword';
import Link from 'next/link';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('details');

  const handleSubmit = (profileData: any) => {
    // Lógica para manejar la actualización del perfil
    console.log('Profile data submitted: ', profileData);
  };

  return (
    <div className={styles.profileFormContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.heading}>Perfil</h1>
            <p className={styles.description}>Descripción breve del usuario....</p>
          </div>
          <div className={styles.profilePhoto}>
            <img src="/profile-photo-placeholder.png" alt="foto del usuario" />
            <a href="#" onClick={() => document.getElementById('fileInput')?.click()}>Añadir foto</a>
            <input type="file" id="fileInput" style={{ display: 'none' }} />
          </div>
        </div>
        <div className={styles.tabs}>
          <div className={`${styles.tab} ${activeTab === 'details' ? styles.tabActive : ''}`} onClick={() => setActiveTab('details')}>Detalles</div>
          <div className={`${styles.tab} ${activeTab === 'resetPassword' ? styles.tabActive : ''}`} onClick={() => setActiveTab('resetPassword')}>Cambiar Contraseña</div>
          <Link href="/profile/reset">
            <div className={`${styles.tab} ${activeTab === 'recoverPassword' ? styles.tabActive : ''}`} onClick={() => setActiveTab('recoverPassword')}>Recuperación de Contraseña</div>
          </Link>
        </div>
        {activeTab === 'details' && <ProfileForm onSubmit={handleSubmit} />}
        {activeTab === 'resetPassword' && <ResetPassword />}
      </div>
    </div>
  );
};

export default Profile;
