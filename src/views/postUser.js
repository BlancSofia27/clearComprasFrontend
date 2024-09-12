import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { uploadFile } from "../firebase/config"; // Asegúrate de importar esta función si es necesaria
const defaultHeaderUrl = "https://firebasestorage.googleapis.com/v0/b/compras-2cfd9.appspot.com/o/Profile%2FheaderDefault.jpg?alt=media&token=10112c80-4bfc-465b-a02a-89d8d34da0fa";
const defaultLogoUrl = "https://firebasestorage.googleapis.com/v0/b/compras-2cfd9.appspot.com/o/Profile%2FlogoDefault.jpg?alt=media&token=1f9abf27-edd6-431c-bc2c-0d1272b1f7e8";
const PostUser = () => {
    const [formData, setFormData] = useState({
        userId: "",
        email: "",
        businessName: "",
        direction: "",
        whatsapp: "",
        header: "",
        logo: "",
    });
    const [headerFile, setHeaderFile] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleFileChange = (e, fieldName) => {
        const file = e.target.files?.[0];
        if (file) {
            if (fieldName === "header") {
                setHeaderFile(file);
            }
            else if (fieldName === "logo") {
                setLogoFile(file);
            }
        }
    };
    const uploadFiles = async () => {
        const uploadedFiles = {
            header: formData.header,
            logo: formData.logo,
        };
        if (headerFile) {
            uploadedFiles.header = await uploadFile(headerFile);
        }
        if (logoFile) {
            uploadedFiles.logo = await uploadFile(logoFile);
        }
        return uploadedFiles;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const uploadedFiles = await uploadFiles();
            const finalFormData = {
                ...formData,
                header: uploadedFiles.header || defaultHeaderUrl,
                logo: uploadedFiles.logo || defaultLogoUrl,
            };
            const response = await axios.post("http://localhost:3000/api/users/", finalFormData);
            console.log("User created:", response.data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Cuenta creada con éxito",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        catch (error) {
            console.error("Error creating user:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Ocurrió un error al crear tu usuario, contacta con el soporte",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };
    return (_jsxs("div", { className: "max-w-md mx-auto p-4 bg-white shadow-md rounded-lg", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Crear Nuevo Usuario" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "userId", children: "Id del usuario" }), _jsx("input", { type: "text", id: "userId", name: "userId", value: formData.userId, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "email", children: "Email" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "businessName", children: "Nombre del Negocio" }), _jsx("input", { type: "text", id: "businessName", name: "businessName", value: formData.businessName, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "direction", children: "Direccion" }), _jsx("input", { type: "text", id: "direction", name: "direction", value: formData.direction, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "whatsapp", children: "N\u00FAmero de celular (Ej: 54 3442 457108)" }), _jsx("input", { type: "text", id: "whatsapp", name: "whatsapp", value: formData.whatsapp, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "header", children: "Imagen de Header (opcional)" }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => handleFileChange(e, "header"), className: "w-full p-2 border border-gray-300 rounded" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "logo", children: "Imagen de Logo (opcional)" }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => handleFileChange(e, "logo"), className: "w-full p-2 border border-gray-300 rounded" })] }), _jsx("button", { type: "submit", className: "w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded", children: "Crear Usuario" })] })] }));
};
export default PostUser;
