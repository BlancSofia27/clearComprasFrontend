import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import AdminPostsList from '../components/AdminPostsList';
import ProfileAdmin from '../components/ProfileAdmin';
const AdminPanel = () => {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-row p-2 bg-slate", children: [_jsx("h1", { className: "xs:text-xs xl:text-2xl font-bold mb-4 text-white mx-2 justify-center", children: "Panel de Administraci\u00F3n" }), _jsx(Link, { to: "/NewPublic", children: _jsx("button", { className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 xl:px-4 xl:mx-4 xs:text-xs xs:p-2 mx-2 rounded", children: "Publicar nueva prenda" }) }), _jsx(Link, { to: "/", children: _jsx("button", { className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 xl:px-4 xl:mx-4 xs:text-xs xs:p-2 mx-2 rounded", children: "Volver al Inicio" }) })] }), _jsx(ProfileAdmin, {}), _jsx(AdminPostsList, {})] }));
};
export default AdminPanel;
