import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Modal from "react-modal";
import Slider from "react-slick";
import Swal from "sweetalert2";
import { updatePost, deletePost } from "../supabaseApi"; // Asegúrate de importar las funciones desde el archivo correcto
const MyAdminCard = ({ post }) => {
    const { id, title, price, imageUrl, imageUrl1, imageUrl2, size, category, brand, color, } = post;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedPrice, setEditedPrice] = useState(price);
    const [editedCategory, setEditedCategory] = useState(category);
    const [editedBrand, setEditedBrand] = useState(brand);
    const [editedColor, setEditedColor] = useState(color);
    const [selectedSizes, setSelectedSizes] = useState(size);
    const sizes = [
        "Único",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
        "34",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
    ];
    const categories = [
        "Remeras",
        "Polleras",
        "Top Casual",
        "Jeans",
        "Pantalones",
        "Camperas y Buzos",
        "Zapatos",
        "Bikinis",
        "Deportivo",
        "Noche y Fiesta",
        "Marroquineria y Accesorios",
        "Electronica",
        "Otros",
    ];
    const colors = [
        "Negro",
        "Blanco",
        "Rojo",
        "Azul",
        "Rosa",
        "Marron",
        "Verde",
        "Violeta",
    ];
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };
    const images = [imageUrl, imageUrl1, imageUrl2].filter(Boolean);
    const handleSizeClick = (clickedSize) => {
        setSelectedSizes((prevSizes) => prevSizes.includes(clickedSize)
            ? prevSizes.filter((s) => s !== clickedSize)
            : [...prevSizes, clickedSize]);
    };
    const handleEdit = async () => {
        try {
            await updatePost({
                id,
                title: editedTitle,
                price: editedPrice,
                category: editedCategory,
                brand: editedBrand,
                color: editedColor,
                size: selectedSizes,
            });
            Swal.fire({
                title: "¡Actualizado!",
                text: "El producto se ha actualizado correctamente.",
                icon: "success",
                timer: 3000,
                showConfirmButton: false,
            });
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
        catch (error) {
            console.error("Error updating product", error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al actualizar el producto.",
                icon: "error",
            });
        }
        finally {
            setModalIsOpen(false);
        }
    };
    const handleDelete = async () => {
        try {
            const result = await Swal.fire({
                title: "¿Queres Eliminar el Producto?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Eliminar",
            });
            if (result.isConfirmed) {
                await deletePost(id);
                await Swal.fire({
                    title: "¡Eliminado!",
                    text: "El producto se ha eliminado correctamente.",
                    icon: "success",
                    timer: 3000,
                    showConfirmButton: false,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        }
        catch (error) {
            console.error("Error al eliminar el producto", error);
            await Swal.fire({
                title: "Error",
                text: "Hubo un problema al eliminar el producto.",
                icon: "error",
            });
        }
    };
    return (_jsxs("div", { className: "flex flex-col xl:w-[220px] xl:h-[510px] xs:w-[150px] xs:h-[300px] max-w-sm m-4 bg-white shadow-md rounded-md overflow-hidden", children: [_jsx("div", { className: "relative", children: _jsx(Slider, { ...settings, children: images.map((image, index) => (_jsx("div", { children: _jsx("img", { src: image, alt: `Product Image ${index + 1}`, className: "object-cover w-full xl:h-56 xs:h-36" }) }, index))) }) }), _jsxs("div", { className: "xl:p-4 xs:p-2 xl:text-md xs:text-sm xs:mt-3", children: [_jsx("div", { className: "flex items-center xl:text-lg xs:text-sm font-semibold text-center justify-center h-12 w-full", children: title }), _jsxs("p", { className: "text-gray-600", children: ["$", price] }), _jsx("p", { className: "xs:hidden xl:flex text-gray-600 ", children: category }), _jsxs("div", { className: "mb-2", children: [_jsx("p", { className: "xs:hidden xl:flex text-gray-600 mb-2 ", children: "Talle" }), _jsx("div", { className: "flex flex-wrap gap-2", children: size.map((s, index) => (_jsx("span", { className: "bg-gray-200 text-gray-700 px-2 py-1 rounded", children: s }, index))) })] }), _jsxs("p", { className: "xs:hidden xl:flex text-gray-600", children: ["Color:", color] }), _jsxs("div", { className: "xs:text-xs xl:text-sm mt-2 flex flex-row justify-between", children: [_jsx("button", { onClick: () => setModalIsOpen(true), className: "bg-blue-500 text-white xl:px-4 xl:py-1 xs:px-2 rounded mr-2", children: "Editar" }), _jsx("button", { onClick: handleDelete, className: "bg-red-500 text-white xl:px-4 xl:py-1 xs:px-2  rounded", children: "Eliminar" })] })] }), _jsx(Modal, { isOpen: modalIsOpen, onRequestClose: () => setModalIsOpen(false), contentLabel: "Edit Product", className: "fixed inset-0 flex items-center justify-center p-4", overlayClassName: "fixed inset-0 bg-black bg-opacity-50", children: _jsxs("div", { className: "bg-white p-8 rounded-lg shadow-lg max-w-md w-full", children: [_jsx("h2", { className: "text-2xl mb-4", children: "Editar Producto" }), _jsxs("form", { onSubmit: (e) => {
                                e.preventDefault();
                                handleEdit();
                            }, children: [_jsxs("label", { className: "block mb-2", children: ["T\u00EDtulo:", _jsx("input", { type: "text", value: editedTitle, onChange: (e) => setEditedTitle(e.target.value), className: "w-full mt-1 p-2 border border-gray-300 rounded" })] }), _jsxs("label", { className: "block mb-2", children: ["Precio:", _jsx("input", { type: "number", value: editedPrice, onChange: (e) => setEditedPrice(parseFloat(e.target.value)), className: "w-full mt-1 p-2 border border-gray-300 rounded" })] }), _jsxs("label", { className: "block mb-2", children: ["Categor\u00EDa:", _jsx("select", { value: editedCategory, onChange: (e) => setEditedCategory(e.target.value), className: "w-full mt-1 p-2 border border-gray-300 rounded", children: categories.map((cat) => (_jsx("option", { value: cat, children: cat }, cat))) })] }), _jsxs("label", { className: "block mb-2", children: ["Marca:", _jsx("input", { type: "text", value: editedBrand, onChange: (e) => setEditedBrand(e.target.value), className: "w-full mt-1 p-2 border border-gray-300 rounded" })] }), _jsxs("label", { className: "block mb-2", children: ["Color:", _jsx("select", { value: editedColor, onChange: (e) => setEditedColor(e.target.value), className: "w-full mt-1 p-2 border border-gray-300 rounded", children: colors.map((color) => (_jsx("option", { value: color, children: color }, color))) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block mb-2", children: "Tama\u00F1os:" }), _jsx("div", { className: "flex flex-wrap", children: sizes.map((size) => (_jsx("button", { onClick: (e) => {
                                                    e.preventDefault();
                                                    handleSizeClick(size);
                                                }, className: `m-1 p-2 border rounded ${selectedSizes.includes(size) ? 'bg-blue-500 text-white' : 'bg-white text-black'}`, children: size }, size))) })] }), _jsx("button", { type: "submit", className: "bg-blue-500 text-white px-4 py-2 rounded m-2", children: "Guardar Cambios" }), _jsx("button", { type: "button", onClick: () => setModalIsOpen(false), className: "bg-gray-500 text-white px-4 py-2 rounded m-2", children: "Cancelar" })] })] }) })] }));
};
export default MyAdminCard;
