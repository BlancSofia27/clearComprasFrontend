import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from './Loader';
const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    if (isLoading) {
        return _jsx(Loader, {});
    }
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/inicio" });
    }
    return _jsx(Outlet, {});
};
export default ProtectedRoute;
