import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from './Loader';

const SesionButton: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect(); // Llama a loginWithRedirect al hacer clic
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='flex align-center justify-center items-center '>
      {isLoading ? (
        <div className='w-[1300px] h-full justify-center'>
        <Loader/> // Muestra un indicador de carga mientras Auth0 está en proceso de autenticación
        </div>
      ) : isAuthenticated ? (
        <button
          className='xs:text-xs xs:w-[90px] xl:w-[100px] bg-blue-500 xs:h-9 xl:h-[35px] rounded-xl m-2 font-bold text-white bg-slate-400 xl:p-2 text-center align-center justify-center'
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      ) : (
        <button
        onClick={handleLogin}
  className="flex justify-center gap-3 m-2 text-white items-center mx-auto shadow-xl text-sm md:text-lg bg-green-500 backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-green-300 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-3 md:px-4 py-2 overflow-hidden border-2 rounded-full group"
>
  Agregar mi negocio
  <svg
    className="w-6 md:w-8 h-6 md:h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-white group-hover:border-none group-hover:text-green-200"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
</button>

      )}
    </div>
  );
};

export default SesionButton;

