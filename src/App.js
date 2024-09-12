import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import Inicio from "./views/Inicio";
import AdminPanel from "./views/AdminPanel";
import PostForm from "./views/postForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./views/Profile";
const App = () => {
    return (_jsx(Router, { children: _jsx("div", { className: "App", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Inicio, {}) }), _jsx(Route, { path: "/profile/:userId", element: _jsx(Profile, {}) }), _jsxs(Route, { element: _jsx(ProtectedRoute, {}), children: [_jsx(Route, { path: "/adminPanel", element: _jsx(AdminPanel, {}) }), _jsx(Route, { path: "/NewPublic", element: _jsx(PostForm, {}) })] }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) }) }));
};
export default App;
