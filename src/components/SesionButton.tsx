
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SesionButton: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect(); // Llama a loginWithRedirect al hacer clic
  };
   const handleLogout = () => {
    logout()
   }

  return (
    <div className='flex aling-center justify-center items-center'>
      {isAuthenticated ? (
        <button
        className='xs:text-xs xs:w-[90px] xl:w-[100px]  bg-blue-500 xs:h-9 xl:h-[35px] rounded-xl m-2 font-bold  text-white bg-slate-400  xl:p-2 text-center aling-center justify-center'
         onClick={handleLogout}>
          Cerrar Sesión
        </button>
      ) : (
        <button 
        className='  xs:text-xs xs:w-[200px] bg-blue-500 rounded-se-3xl font-bold  xl:h-9 bg-slate-500 xl:py-2 xl:px-4 text-white'
        onClick={handleLogin}>
          Agregar mi negocio
        </button>
      )}
    </div>
  );
};

export default SesionButton;
