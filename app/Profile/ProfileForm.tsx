// src/app/Profile/ProfileForm.tsx
import React, { useState, useRef } from 'react';
import styles from './Profile.module.css';

interface ProfileFormProps {
  onSubmit: (profileData: ProfileData) => void;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    role: 'Admin',
  });

  const [profilePhoto, setProfilePhoto] = useState<string | ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profileData);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Perfil</h1>
          <p className={styles.description}>Descripción breve del usuario....</p>
        </div>
        <div className={styles.profilePhoto}>
          {profilePhoto ? (
            <img src={profilePhoto as string} alt="foto del usuario" />
          ) : (
            <img src="/profile-photo-placeholder.png" alt="foto del usuario" />
          )}
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoChange} style={{ display: 'none' }} />
          <a href="#" onClick={handlePhotoClick}>Añadir foto</a>
        </div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div>
            <label className={styles.label}>Nombres</label>
            <input type="text" name="firstName" value={profileData.firstName} onChange={handleChange} className={styles.input} />
          </div>
          <div>
            <label className={styles.label}>Apellidos</label>
            <input type="text" name="lastName" value={profileData.lastName} onChange={handleChange} className={styles.input} />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div>
            <label className={styles.label}>Usuario</label>
            <input type="text" name="username" value={profileData.username} onChange={handleChange} className={styles.input} />
          </div>
          <div>
            <label className={styles.label}>Correo Electrónico</label>
            <input type="email" name="email" value={profileData.email} onChange={handleChange} className={styles.input} />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.formGroupFull}>
            <label className={styles.label}>Rol</label>
            <select name="role" value={profileData.role} onChange={handleChange} className={styles.select}>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
        </div>
        <button type="submit" className={styles.button}>Guardar cambios</button>
      </form>
    </div>
  );
};

export default ProfileForm;
