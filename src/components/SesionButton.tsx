
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SesionButton: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className='flex aling-center justify-center items-center'>
      {isAuthenticated ? (
        <button
        className='xs:text-xs xs:w-[90px]  bg-blue-500 h-9  text-white bg-slate-400 rounded-xl xl:p-2 text-center aling-center justify-center'
         onClick={() => logout({ returnTo: window.location.origin })}>
          Cerrar Sesión
        </button>
      ) : (
        <button 
        className='  xs:text-xs xs:w-[200px] bg-blue-500 xl:h-9 bg-slate-500 xl:py-2 xl:px-4 rounded-xl text-white'
        onClick={loginWithRedirect}>
          Agregar mi negocio
        </button>
      )}
    </div>
  );
};

export default SesionButton;
