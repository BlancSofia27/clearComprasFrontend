import React, { useState } from "react";
import Modal from "react-modal";
import Slider from "react-slick";
import Swal from "sweetalert2";
import { updatePost, deletePost } from "../supabaseApi"; // Asegúrate de importar las funciones desde el archivo correcto

interface MyAdminCard {
  post: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    imageUrl1?: string;
    imageUrl2?: string;
    size: string[];
    category: string;
    brand: string;
    color: string;
  };
}

const MyAdminCard: React.FC<MyAdminCard> = ({ post }) => {
  const {
    id,
    title,
    price,
    imageUrl,
    imageUrl1,
    imageUrl2,
    size,
    category,
    brand,
    color,
  } = post;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedBrand, setEditedBrand] = useState(brand);
  const [editedColor, setEditedColor] = useState(color);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(size);

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

  const images = [imageUrl, imageUrl1, imageUrl2].filter(Boolean) as string[];

  const handleSizeClick = (clickedSize: string) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(clickedSize)
        ? prevSizes.filter((s) => s !== clickedSize)
        : [...prevSizes, clickedSize]
    );
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
    } catch (error) {
      console.error("Error updating product", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar el producto.",
        icon: "error",
      });
    } finally {
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
    } catch (error) {
      console.error("Error al eliminar el producto", error);
      await Swal.fire({
        title: "Error",
        text: "Hubo un problema al eliminar el producto.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex flex-col xl:w-[220px] xl:h-[510px] xs:w-[150px] xs:h-[300px] max-w-sm m-4 bg-white shadow-md rounded-md overflow-hidden">
      <div className="relative">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Product Image ${index + 1}`}
                className="object-cover w-full xl:h-56 xs:h-36"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="xl:p-4 xs:p-2 xl:text-md xs:text-sm xs:mt-3">
        <div className="xl:h-14 xs:h-10 xl:text-lg font-bold text-center mt-2">{title}</div>
        <p className="text-gray-600">${price}</p>
        <p className="xs:hidden xl:flex text-gray-600 ">{category}</p>
        <div className="mb-2">
          <p className="xs:hidden xl:flex text-gray-600 mb-2 ">Talle</p>
          <div className="flex flex-wrap gap-2">
            {size.map((s, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <p className="xs:hidden xl:flex text-gray-600">Color:{color}</p>
        <div className="xs:text-xs xl:text-sm mt-2 flex flex-row justify-between">
          <button
            onClick={() => setModalIsOpen(true)}
            className="bg-blue-500 text-white xl:px-4 xl:py-1 xs:px-2 rounded mr-2"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white xl:px-4 xl:py-1 xs:px-2  rounded"
          >
            Eliminar
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Edit Product"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl mb-4">Editar Producto</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit();
            }}
          >
            <label className="block mb-2">
              Título:
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Precio:
              <input
                type="number"
                value={editedPrice}
                onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Categoría:
              <select
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
            <label className="block mb-2">
              Marca:
              <input
                type="text"
                value={editedBrand}
                onChange={(e) => setEditedBrand(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Color:
              <select
                value={editedColor}
                onChange={(e) => setEditedColor(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              >
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </label>
            <div className="mb-4">
              <label className="block mb-2">Tamaños:</label>
              <div className="flex flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    className={`m-1 p-2 border rounded ${
                      selectedSizes.includes(size) ? 'bg-blue-500 text-white' : 'bg-white text-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default MyAdminCard;
