import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import SesionButton from "../components/SesionButton";
import PostsList from "../components/PostsList";
import PanelButton from "../components/PanelButton";
import ProfileAuth from "../components/ProfileAuth";
import { useAuth0 } from "@auth0/auth0-react";
import Hero from "../components/Hero";
import { ToastContainer } from "react-toastify";
import { getUserById } from "../supabaseApi";
const Inicio = () => {
    const { user } = useAuth0();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const checkUserExists = async () => {
            if (user?.sub) {
                try {
                    const userId = user.sub;
                    const userData = await getUserById(userId);
                    if (userData) {
                        setIsAdmin(true);
                    }
                }
                catch (error) {
                    console.error("Error verifying user:", error);
                }
            }
        };
        checkUserExists();
    }, [user]);
    return (_jsxs("div", { className: 'bg-slate justify-center items-center', children: [_jsxs("div", { className: "xl:flex xl:flex-row xl:justify-between xs:flex-col", children: [_jsxs("div", { className: "flex flex-row align-center justify-center", children: [_jsx(ProfileAuth, {}), _jsx(ToastContainer, {}), _jsx(SesionButton, {})] }), isAdmin && _jsx(PanelButton, {})] }), _jsx(Hero, {}), _jsx(PostsList, {})] }));
};
export default Inicio;
