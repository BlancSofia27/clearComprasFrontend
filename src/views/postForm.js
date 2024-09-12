import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { uploadFile } from "../firebase/config";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { insertPost } from "../supabaseApi"; // Importa la función insertPost
const sizes = [
    "Único", "S", "M", "L", "XL", "XXL", "34", "36", "37", "38", "39", "40", "41", "42",
];
const categories = [
    "Remeras", "Polleras", "Top Casual", "Jeans", "Pantalones", "Camperas y Buzos", "Calzado", "Bikinis", "Deportivo", "Noche y Fiesta", "Marroquineria y Accesorios", "Electronica", "Otros",
];
const colors = [
    "Negro", "Blanco", "Rojo", "Azul", "Rosa", "Marron", "Verde", "Violeta",
];
const PostForm = () => {
    const { user, isAuthenticated } = useAuth0();
    const [formData, setFormData] = useState({
        title: "",
        price: 0,
        imageUrl: "",
        imageUrl1: "",
        imageUrl2: "",
        size: [],
        category: "",
        brand: "",
        color: "",
    });
    const [imagePreviews, setImagePreviews] = useState({
        imageUrl: "",
        imageUrl1: "",
        imageUrl2: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSizeClick = (size) => {
        setFormData((prevData) => ({
            ...prevData,
            size: prevData.size.includes(size)
                ? prevData.size.filter((s) => s !== size)
                : [...prevData.size, size],
        }));
    };
    const handleFileChange = (e, fieldName) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: file, // Store the file object
            }));
            // Generate a preview URL for the image
            const fileURL = URL.createObjectURL(file);
            setImagePreviews((prevPreviews) => ({
                ...prevPreviews,
                [fieldName]: fileURL,
            }));
        }
    };
    const uploadImagesAndSubmit = async () => {
        try {
            const urls = await Promise.all(Object.entries(formData)
                .filter(([key, value]) => key.startsWith("imageUrl") && value instanceof File)
                .map(async ([key, file]) => {
                // Ensure file is of type File
                if (file instanceof File) {
                    const url = await uploadFile(file);
                    console.log(`URL de ${key}:`, url);
                    return { [key]: url };
                }
                return { [key]: "" }; // Default to empty string if not a File
            }));
            // Update formData with image URLs
            const updatedFormData = urls.reduce((acc, curr) => ({ ...acc, ...curr }), formData);
            return updatedFormData;
        }
        catch (uploadError) {
            console.error("Error uploading images:", uploadError);
            setError("Error uploading images");
            throw uploadError;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated || !user) {
            alert("No estás autenticado o no se pudo obtener la información del usuario.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const updatedFormData = await uploadImagesAndSubmit();
            const postData = {
                ...updatedFormData,
                userId: user.sub,
                price: Number(updatedFormData.price), // Convertir el precio a número
            };
            console.log('Datos enviados a Supabase:', postData);
            const response = await insertPost(postData); // Usa la función insertPost
            console.log("Post creado:", response);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Publicación subida con éxito",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => window.location.reload(), 3000);
        }
        catch (error) {
            console.error("Error al crear la publicación:", error);
            setError("Ocurrió un error al crear la publicación. Inténtalo de nuevo.");
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Ocurrió un error al crear tu publicación, contacta con el soporte",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/AdminPanel", children: _jsx("button", { className: "bg-celeste text-white p-5", children: "Volver al Panel" }) }), _jsxs("div", { className: "max-w-lg mx-auto p-4 bg-slate shadow-md rounded-lg my-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-4 py-6 text-center", children: "Nueva publicaci\u00F3n" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "title", children: "T\u00EDtulo" }), _jsx("input", { type: "text", name: "title", value: formData.title, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "price", children: "Precio" }), _jsx("input", { type: "number", name: "price", value: formData.price, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "imageUrl", children: "Imagen 1" }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => handleFileChange(e, "imageUrl"), className: "w-full p-2 border border-gray-300 rounded", required: true }), imagePreviews.imageUrl && (_jsx("div", { className: "mt-2", children: _jsx("img", { src: imagePreviews.imageUrl, alt: "Vista previa", className: "w-32 h-32 object-cover border border-gray-300 rounded" }) }))] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "imageUrl1", children: "Imagen 2" }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => handleFileChange(e, "imageUrl1"), className: "w-full p-2 border border-gray-300 rounded" }), imagePreviews.imageUrl1 && (_jsx("div", { className: "mt-2", children: _jsx("img", { src: imagePreviews.imageUrl1, alt: "Vista previa", className: "w-32 h-32 object-cover border border-gray-300 rounded" }) }))] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "imageUrl2", children: "Imagen 3" }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => handleFileChange(e, "imageUrl2"), className: "w-full p-2 border border-gray-300 rounded" }), imagePreviews.imageUrl2 && (_jsx("div", { className: "mt-2", children: _jsx("img", { src: imagePreviews.imageUrl2, alt: "Vista previa", className: "w-32 h-32 object-cover border border-gray-300 rounded" }) }))] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "size", children: "Talles" }), _jsx("div", { className: "flex flex-wrap", children: sizes.map((size) => (_jsx("button", { type: "button", onClick: () => handleSizeClick(size), className: `m-1 p-2 border rounded ${formData.size.includes(size)
                                                ? "bg-blue-500 text-white"
                                                : "bg-white text-black"}`, children: size }, size))) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "category", children: "Categor\u00EDa" }), _jsxs("select", { name: "category", value: formData.category, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true, children: [_jsx("option", { value: "", disabled: true, children: "Selecciona una categor\u00EDa" }), categories.map((category) => (_jsx("option", { value: category, children: category }, category)))] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "brand", children: "Marca" }), _jsx("input", { type: "text", name: "brand", value: formData.brand, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "color", children: "Color" }), _jsxs("select", { name: "color", value: formData.color, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true, children: [_jsx("option", { value: "", disabled: true, children: "Selecciona un color" }), colors.map((color) => (_jsx("option", { value: color, children: color }, color)))] })] }), _jsx("div", { className: "flex justify-center", children: _jsx("button", { type: "submit", className: `bg-green-500 text-white p-4 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`, disabled: loading, children: loading ? "Cargando..." : "Guardar Publicación" }) })] }), error && (_jsx("div", { className: "mt-4 text-red-500", children: _jsx("p", { children: error }) }))] })] }));
};
export default PostForm;
