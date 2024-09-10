import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Modal from 'react-modal'; // Importar el componente Modal de react-modal
import { getUserById } from "../supabaseApi"; // Asegúrate de que la ruta sea correcta

interface PostCardProps {
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
    userId: string;
    whatsapp: string; // Añadir whatsapp al post
  };
}

interface User {
  id: string;
  businessName: string;
  direction: string;
  whatsapp: string;
  // otras propiedades del usuario si las hay
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    title,
    price,
    imageUrl,
    imageUrl1,
    imageUrl2,
    size,
    category,
    brand,
    userId,
    whatsapp,
    // Añadir whatsapp al post
  } = post;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); // Estado para el modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('Fetching user with ID:', userId); // Loguea antes de la llamada a la API
        const userData = await getUserById(userId); // Usa la función que creaste
        console.log('User data received:', userData); // Loguea los datos del usuario
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

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

  const images = [imageUrl, imageUrl1, imageUrl2].filter(Boolean) as string[];

  return (
    <div className="flex flex-col xs:w-[160px] xl:w-[300px] xl:h-[600px] mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-100 text-center font-semibold xl:p-2 xl:text-sm xs:text-xs">
        {user?.businessName || "Nombre del negocio"}
        <h3>{user?.direction || "Venta Online"}</h3>
      </div>
      <div className="h-48 mb-4">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className="relative ">
              <img
                src={img}
                alt={`Image ${index}`}
                className="w-full xl:h-[320px] xs:h-[200px] object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex flex-col mx-4 h-1/3 overflow-y-auto xl:mt-[150px] xs:mt-5 justify-start">
        <h2 className="xl:text-lg xs:text-sm font-semibold text-center">{title}</h2>
        <div className="flex xl:flex-row justify-between xs:flex-col">
          <div>
            <p className="text-gray-700 xl:text-xl xs:text-xs ">${price}</p>
            <div className="mb-2">
              <p className="xl:flex lg:flex  text-gray-600 xs:text-xs xs:hidden ">Talle</p>
            </div>
          </div>
          <div>
            <p className="text-gray-600 sm:text-sm lg:text-md xl:text-md xl:m-2 xs:text-xs mb-2">Marca: {brand}</p>
          </div>
        </div>
        <div className="flex flex-row gap-2 xl:text-md xl:m-1 xs:text-xs">
          {size.map((s, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 xl:px-2 xl:py-1 rounded"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="xl:p-4 flex justify-between xl:text-md xs:text-xs xs:p-2">
        <button
          onClick={() => setModalIsOpen(true)} // Abrir modal
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold xl:p-2 xs:p-1 xs:text-xs rounded"
        >
          Consultar
        </button>
        <button
          onClick={handleVisitLocal}
          className="bg-green-500 hover:bg-green-700 text-white font-bold xl:p-2 xs:p-1  xs:text-xs rounded"
        >
          Visitar local
        </button>
      </div>

      {/* Modal para compartir */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Compartir Producto"
        className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto my-20 xl:h-[600px] xs:w-[340px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Consultar al Comercio</h2>
        <div className="flex flex-col items-center">
          <div className="w-full mb-4">
            <Slider {...settings}>
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`Image ${index}`}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <h3 className="text-xl font-semibold mb-4">{title}</h3>
          <button
            onClick={handleShare}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Enviar Mensaje
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PostCard;
