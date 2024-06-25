import React, { useState, useEffect } from 'react';
import axios from '../../src/axiosConfig';
import './profile.css';
import dynamic from 'next/dynamic';

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    role: 'Admin',
    photo: ''
  });

  const [selectedTab, setSelectedTab] = useState('details');
  const [photo, setPhoto] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    axios.get('/api/profile')
      .then(response => {
        setUser(response.data);
        setPhoto(response.data.photo);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setPhoto(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    axios.post('/api/profile', { ...user, photo })
      .then(response => {
        console.log('Datos guardados:', response.data);
      })
      .catch(error => {
        console.error('Error saving profile:', error);
      });
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="profile-container">
      <div className="profile">
        <h1>Perfil</h1>
        <p>Descripción breve del usuario....</p>
        <div className="user-photo">
          <div>
            {photo ? (
              <img src={photo.toString()} alt="foto del user" />
            ) : (
              <img src="path/to/default/photo.jpg" alt="foto del user" />
            )}
            <label htmlFor="photo-upload" className="photo-upload-label">Añadir foto</label>
            <input 
              id="photo-upload" 
              type="file" 
              onChange={handlePhotoChange} 
              className="photo-upload-input"
            />
          </div>
        </div>
        <div className="tabs">
          <a href="#" onClick={() => handleTabChange('details')} className={selectedTab === 'details' ? 'active' : ''}>Detalles</a>
        </div>
        {selectedTab === 'details' && (
          <div className="form">
            <div>
              <label>Nombres</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Apellidos</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Usuario</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Rol</label>
              <select
                name="role"
                value={user.role}
                onChange={handleChange}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Guest">Guest</option>
              </select>
            </div>
            <div style={{ flexBasis: '100%' }}>
              <button onClick={handleSave}>Guardar cambios</button>
            </div>
          </div>
        )}
        {selectedTab === 'password' && (
          <ClientSidePasswordChange />
        )}
      </div>
    </div>
  );
};

const ClientSidePasswordChange = dynamic(() => import('./ClientSidePasswordChange'), { ssr: false });

export default Profile;
