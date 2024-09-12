import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Modal from 'react-modal'; // Importar el componente Modal de react-modal
import { getUserById } from "../supabaseApi"; // Asegúrate de que la ruta sea correcta
const PostCard = ({ post }) => {
    const { title, price, imageUrl, imageUrl1, imageUrl2, size, brand, userId, } = post;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para el modal
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log('Fetching user with ID:', userId); // Loguea antes de la llamada a la API
                const userData = await getUserById(userId); // Usa la función que creaste
                console.log('User data received:', userData); // Loguea los datos del usuario
                setUser(userData);
            }
            catch (err) {
                console.error('Error fetching user:', err);
                // Manejo del error con verificación de tipo
                if (err instanceof Error) {
                    setError(err.message);
                }
                else {
                    setError('An unknown error occurred');
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);
    if (loading)
        return _jsx(Loader, {});
    if (error)
        return _jsx("p", { children: error });
    const handleVisitLocal = () => {
        console.log(`Navegando al perfil del usuario con ID: ${userId}`); // Loguea antes de la navegación
        navigate(`/profile/${userId}`); // Redirigir al perfil del usuario
    };
    const handleShare = () => {
        const message = `Me interesa este producto de ClearCompras: ${title}`;
        const whatsappLink = `https://wa.me/${user?.whatsapp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };
    const images = [imageUrl, imageUrl1, imageUrl2].filter(Boolean);
    return (_jsxs("div", { className: "flex flex-col xs:w-[160px] xl:w-[300px] xl:h-[600px] mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden", children: [_jsxs("div", { className: "bg-gray-100 text-center font-semibold xl:p-2 xl:text-sm xs:text-xs", children: [user?.businessName || "Nombre del negocio", _jsx("h3", { children: user?.direction || "Venta Online" })] }), _jsx("div", { className: "h-48 mb-4", children: _jsx(Slider, { ...settings, children: images.map((img, index) => (_jsx("div", { className: "relative", children: _jsx("img", { src: img, alt: `Image ${index}`, className: "w-full xl:h-[320px] xs:h-[200px] object-cover" }) }, index))) }) }), _jsxs("div", { className: "flex flex-col mx-4 h-1/3 overflow-y-auto xl:mt-[150px] xs:mt-5 justify-start", children: [_jsx("div", { className: "flex items-center xl:text-lg xs:text-sm font-semibold text-center justify-center h-12 w-full", children: title }), _jsxs("div", { className: "flex xl:flex-row justify-between xs:flex-col", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-gray-700 xl:text-xl xs:text-xs", children: ["$", price] }), _jsx("div", { className: "mb-2", children: _jsx("p", { className: "xl:flex lg:flex text-gray-600 xs:text-xs xs:hidden", children: "Talle" }) })] }), _jsx("div", { children: _jsxs("p", { className: "text-gray-600 sm:text-sm lg:text-md xl:text-md xl:m-2 xs:text-xs mb-2", children: ["Marca: ", brand] }) })] }), _jsx("div", { className: "flex flex-row gap-2 xl:text-md xl:m-1 xs:text-xs", children: size.map((s, index) => (_jsx("span", { className: "bg-gray-200 text-gray-700 xl:px-2 xl:py-1 rounded p-1", children: s }, index))) })] }), _jsxs("div", { className: "xl:p-4 flex justify-between xl:text-md xs:text-xs xs:p-2", children: [_jsx("button", { onClick: () => setModalIsOpen(true), className: "bg-blue-500 hover:bg-blue-700 text-white font-bold xl:p-2 xs:p-1 xs:text-xs rounded", children: "Consultar" }), _jsx("button", { onClick: handleVisitLocal, className: "bg-green-500 hover:bg-green-700 text-white font-bold xl:p-2 xs:p-1 xs:text-xs rounded", children: "Visitar local" })] }), _jsxs(Modal, { isOpen: modalIsOpen, onRequestClose: () => setModalIsOpen(false), contentLabel: "Compartir Producto", className: "bg-white p-5 rounded-lg shadow-lg max-w-2xl mx-auto my-20 xl:h-[600px] xs:w-[340px] xs:h-[620px]", overlayClassName: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center", children: [_jsx("h2", { className: "text-2xl font-semibold  text-center", children: "Consultar al Comercio" }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "w-full mb-4", children: _jsx(Slider, { ...settings, children: images.map((img, index) => (_jsx("div", { className: "relative", children: _jsx("img", { src: img, alt: `Image ${index}`, className: "w-full h-[400px] object-cover" }) }, index))) }) }), _jsx("h3", { className: "text-xl font-semibold m-4", children: title }), _jsx("button", { onClick: handleShare, className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4  rounded", children: "Enviar Mensaje" })] })] })] }));
};
export default PostCard;
