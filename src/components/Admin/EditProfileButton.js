import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getUserById, updateUser } from '../../supabaseApi';
import { useAuth0 } from '@auth0/auth0-react';
import { uploadFile } from '../../firebase/config';
import Swal from 'sweetalert2';
import Loader from '../Loader';
const EditProfileButton = () => {
    const [profileData, setProfileData] = useState({
        header: '',
        logo: '',
        instagram: '',
        businessName: '',
        direction: '',
        whatsapp: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [headerFile, setHeaderFile] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [headerPreview, setHeaderPreview] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const { user } = useAuth0();
    const userId = user?.sub;
    useEffect(() => {
        if (userId) {
            const fetchProfileData = async () => {
                try {
                    const data = await getUserById(userId);
                    setProfileData(data);
                    setHeaderPreview(data.header);
                    setLogoPreview(data.logo);
                }
                catch (err) {
                    setError('Error al cargar los datos del perfil');
                }
                finally {
                    setLoading(false);
                }
            };
            fetchProfileData();
        }
    }, [userId]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleImageChange = (e, type) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'header') {
                    setHeaderPreview(reader.result);
                }
                else if (type === 'logo') {
                    setLogoPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
            if (type === 'header') {
                setHeaderFile(file);
            }
            else if (type === 'logo') {
                setLogoFile(file);
            }
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };
    const handleConfirm = async () => {
        try {
            let updatedProfileData = { ...profileData };
            if (headerFile) {
                const headerUrl = await uploadFile(headerFile);
                updatedProfileData.header = headerUrl;
            }
            if (logoFile) {
                const logoUrl = await uploadFile(logoFile);
                updatedProfileData.logo = logoUrl;
            }
            if (userId) {
                await updateUser(userId, updatedProfileData);
            }
            else {
                setError('Error: No se pudo obtener el ID del usuario.');
            }
            Swal.fire({
                title: "¡Actualizado!",
                text: "El perfil se ha actualizado correctamente.",
                icon: "success",
                timer: 3000,
                showConfirmButton: false
            });
            setIsModalOpen(false);
            setTimeout(() => window.location.reload(), 3000);
        }
        catch (err) {
            setError('Error al guardar los cambios');
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    if (loading)
        return _jsx(Loader, {});
    if (error)
        return _jsx("p", { children: error });
    return (_jsxs("div", { children: [_jsx("button", { onClick: () => setIsModalOpen(true), className: "bg-blue-500 xs:text-xs m-1 xl:text-md text-white px-4 py-2 rounded", children: "Editar Perfil" }), isModalOpen && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg max-w-sm w-full", children: [_jsx("h2", { className: "text-lg font-bold mb-4", children: "Editar Perfil" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "businessName", className: "block text-sm font-medium", children: "Nombre del Negocio:" }), _jsx("input", { type: "text", id: "businessName", name: "businessName", value: profileData.businessName, onChange: handleChange, className: "border border-gray-300 p-2 rounded w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "instagram", className: "block text-sm font-medium", children: "Instagram:" }), _jsx("input", { type: "text", id: "instagram", name: "instagram", value: profileData.instagram, onChange: handleChange, className: "border border-gray-300 p-2 rounded w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "direction", className: "block text-sm font-medium", children: "Direcci\u00F3n:" }), _jsx("input", { type: "text", id: "direction", name: "direction", value: profileData.direction, onChange: handleChange, className: "border border-gray-300 p-2 rounded w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "whatsapp", className: "block text-sm font-medium", children: "WhatsApp:(ej +543442457109)" }), _jsx("input", { type: "text", id: "whatsapp", name: "whatsapp", value: profileData.whatsapp, onChange: handleChange, className: "border border-gray-300 p-2 rounded w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-medium", children: "Logo:(Recomendado 200x200px)" }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => handleImageChange(e, 'logo'), className: "mt-2" }), logoPreview && _jsx("img", { src: logoPreview, alt: "Logo preview", className: "mt-2 w-20 h-20 object-cover" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-medium", children: "Header:(Recomendado 1300x400px)" }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => handleImageChange(e, 'header'), className: "mt-2" }), headerPreview && _jsx("img", { src: headerPreview, alt: "Header preview", className: "mt-2 w-full h-20 object-cover" })] }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx("button", { type: "button", onClick: handleCancel, className: "bg-red-500 text-white px-4 py-2 rounded", children: "Cancelar" }), _jsx("button", { type: "submit", onClick: handleConfirm, className: "bg-green-500 text-white px-4 py-2 rounded", children: "Confirmar" })] })] })] }) }))] }));
};
export default EditProfileButton;
