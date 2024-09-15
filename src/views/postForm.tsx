import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { uploadFile } from "../firebase/config";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { insertPost } from "../supabaseApi"; // Importa la función insertPost


const sizes = [
  "Único", "S", "M", "L", "XL", "XXL", "34","35", "36", "37", "38", "39", "40", "41", "42","43","44","45"
];
const categories = [
  "Remeras", "Polleras", "Top Casual", "Jeans", "Pantalones", "Camperas y Buzos", "Calzado", "Bikinis", "Deportivo", "Noche y Fiesta","Marroquineria y Accesorios" ,"Electronica", "Otros",
];
const colors = [
  "Negro", "Blanco", "Rojo", "Azul", "Rosa", "Marron", "Verde", "Violeta",
];

const PostForm: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    imageUrl: "" as string,
    imageUrl1: "" as string,
    imageUrl2: "" as string,
    size: [] as string[],
    category: "" as string,
    brand: "",
    color: "" as string,
  });
  const [imagePreviews, setImagePreviews] = useState({
    imageUrl: "" as string,
    imageUrl1: "" as string,
    imageUrl2: "" as string,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSizeClick = (size: string) => {
    setFormData((prevData) => ({
      ...prevData,
      size: prevData.size.includes(size)
        ? prevData.size.filter((s) => s !== size)
        : [...prevData.size, size],
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "imageUrl" | "imageUrl1" | "imageUrl2"
  ) => {
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
      const urls = await Promise.all(
        Object.entries(formData)
          .filter(
            ([key, value]) =>
              key.startsWith("imageUrl") && value instanceof File
          )
          .map(async ([key, file]) => {
            // Ensure file is of type File
            if (file instanceof File) {
              const url = await uploadFile(file);
              console.log(`URL de ${key}:`, url);
              return { [key]: url };
            }
            return { [key]: "" }; // Default to empty string if not a File
          })
      );

      // Update formData with image URLs
      const updatedFormData = urls.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        formData
      );

      return updatedFormData;
    } catch (uploadError) {
      console.error("Error uploading images:", uploadError);
      setError("Error uploading images");
      throw uploadError;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      alert(
        "No estás autenticado o no se pudo obtener la información del usuario."
      );
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
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      setError("Ocurrió un error al crear la publicación. Inténtalo de nuevo.");
      Swal.fire({
        position: "top-end",
        icon: "error",
        title:
          "Ocurrió un error al crear tu publicación, contacta con el soporte",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link to="/AdminPanel">
        <button className="rounded-ee-xl bg-blue-500 text-white p-5">Volver al Panel</button>
      </Link>
      <div className="text-gray-600 max-w-lg mx-auto p-4 bg-slate shadow-md rounded-lg my-6">
        <h2 className="text-2xl font-bold mb-4 py-6 text-center">
          Nueva publicación
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Campo de Título */}
          <div className="mb-4">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="title"
            >
              Título
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Campo de Precio */}
          <div className="mb-4">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="price"
            >
              Precio
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Campo de Imagen */}
          <div className="mb-4">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="imageUrl"
            >
              Imagen 1
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "imageUrl")}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {imagePreviews.imageUrl && (
              <div className="mt-2">
                <img
                  src={imagePreviews.imageUrl}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover border border-gray-300 rounded"
                />
              </div>
            )}
          </div>

          {/* Campo de Imagen Adicional 1 */}
          <div className="mb-4">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="imageUrl1"
            >
              Imagen 2
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "imageUrl1")}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {imagePreviews.imageUrl1 && (
              <div className="mt-2">
                <img
                  src={imagePreviews.imageUrl1}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover border border-gray-300 rounded"
                />
              </div>
            )}
          </div>

          {/* Campo de Imagen Adicional 2 */}
          <div className="mb-4">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="imageUrl2"
            >
              Imagen 3
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "imageUrl2")}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {imagePreviews.imageUrl2 && (
              <div className="mt-2">
                <img
                  src={imagePreviews.imageUrl2}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover border border-gray-300 rounded"
                />
              </div>
            )}
          </div>

          {/* Campo de Talles */}
          <div className="mb-4">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="size"
            >
              Talles
            </label>
            <div className="flex flex-wrap">
              {sizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`m-1 p-2 border rounded ${
                    formData.size.includes(size)
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Campo de Categoría */}
          <div className="mb-4">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="category"
            >
              Categoría
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Campo de Marca */}
          <div className="mb-4">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="brand"
            >
              Marca
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Campo de Color */}
          <div className="mb-4">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="color"
            >
              Color
            </label>
            <select
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>
                Selecciona un color
              </option>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`bg-green-500 text-white p-4 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Cargando..." : "Guardar Publicación"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PostForm;
