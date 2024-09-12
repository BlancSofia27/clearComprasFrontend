import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom'; // Usa useNavigate en lugar de useHistory
const AdminButton = () => {
    const { isAuthenticated } = useAuth0(); // Obtén el estado de autenticación
    const navigate = useNavigate(); // Hook para la redirección
    const handleClick = () => {
        if (isAuthenticated) {
            navigate('/AdminPanel'); // Redirige a /AdminPanel si el usuario está autenticado
        }
        else {
            // Aquí puedes manejar el caso en que el usuario no está autenticado, si es necesario
            alert('No estás autenticado para acceder a esta sección.');
        }
    };
    // Renderiza el botón solo si el usuario está autenticado
    return (_jsx(_Fragment, { children: isAuthenticated && (_jsx("button", { onClick: handleClick, className: "xs:text-xs   xs:p-1 xs:m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md xl:h-8 xl:p-2 text-center xl:m-4", children: "Ir al Panel de Administraci\u00F3n" })) }));
};
export default AdminButton;
