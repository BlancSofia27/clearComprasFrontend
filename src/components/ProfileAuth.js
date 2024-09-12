import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth0 } from "@auth0/auth0-react";
import copy from "../assets/copy.svg"; // Asegúrate de que la ruta sea correcta
import { toast, Flip } from 'react-toastify'; // Corrige el import
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos necesarios
const ProfileAuth = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const copyToClipboard = () => {
        if (user?.sub) {
            navigator.clipboard.writeText(user.sub)
                .then(() => {
                toast.success('ID copiado al portapapeles', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Flip,
                });
            })
                .catch((err) => {
                console.error("Error al copiar: ", err);
            });
        }
    };
    if (isLoading) {
        return _jsx("div", {});
    }
    return (isAuthenticated && user && (_jsxs("div", { className: "flex flex-row xs:w-[260px] xl:w-[360px] bg-celeste p-2 rounded-se-full text-white font-extralight", children: [_jsx("img", { className: "xl:w-11 xl:h-11 xs:h-8 xs:w-8 rounded-full", src: user.picture, alt: user.name }), _jsxs("div", { className: "flex flex-col mx-3 text-start", children: [_jsx("h2", { className: "xl:text-md xs:text-xs", children: user.name }), _jsx("h2", { className: "xl:text-md xs:text-xs", children: user.email }), _jsxs("div", { className: "flex items-center", children: [_jsxs("h1", { className: "xl:text-md xs:text-xs", children: ["ID: ", user.sub] }), _jsx("button", { onClick: copyToClipboard, className: "xl:ml-2 xs:w-6 xl:w-9", children: _jsx("img", { src: copy, className: "", alt: "copiar id" }) })] })] })] })));
};
export default ProfileAuth;
