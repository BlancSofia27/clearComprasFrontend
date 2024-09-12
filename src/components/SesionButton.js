import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth0 } from '@auth0/auth0-react';
import Loader from './Loader';
const SesionButton = () => {
    const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
    const handleLogin = () => {
        loginWithRedirect(); // Llama a loginWithRedirect al hacer clic
    };
    const handleLogout = () => {
        logout();
    };
    return (_jsx("div", { className: 'flex align-center justify-center items-center', children: isLoading ? (_jsxs("div", { className: 'w-[1300px] h-full justify-center', children: [_jsx(Loader, {}) // Muestra un indicador de carga mientras Auth0 está en proceso de autenticación
                , " // Muestra un indicador de carga mientras Auth0 est\u00E1 en proceso de autenticaci\u00F3n"] })) : isAuthenticated ? (_jsx("button", { className: 'xs:text-xs xs:w-[90px] xl:w-[100px] bg-blue-500 xs:h-9 xl:h-[35px] rounded-xl m-2 font-bold text-white bg-slate-400 xl:p-2 text-center align-center justify-center', onClick: handleLogout, children: "Cerrar Sesi\u00F3n" })) : (_jsx("button", { className: 'xs:text-xs xs:w-[200px] bg-blue-500 rounded-se-3xl font-bold xl:h-9 bg-slate-500 xl:py-2 xl:px-4 text-white', onClick: handleLogin, children: "Agregar mi negocio" })) }));
};
export default SesionButton;
