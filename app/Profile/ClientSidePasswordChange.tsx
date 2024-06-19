import React from 'react';
import { useRouter } from 'next/router';

const ClientSidePasswordChange: React.FC = () => {
  const router = useRouter();

  const handlePasswordChange = () => {
    router.push('/reset-password');
  };

  return (
    <div>
      <button onClick={handlePasswordChange}>Cambiar contraseña</button>
    </div>
  );
};

export default ClientSidePasswordChange;
