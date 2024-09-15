import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Modal from 'react-modal';
import { getUserById } from "../supabaseApi";

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
  };
}

interface User {
  id: string;
  businessName: string;
  direction: string;
  whatsapp: string;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    title,
    price,
    imageUrl,
    imageUrl1,
    imageUrl2,
    size,
    brand,
    userId,
  } = post;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalWhatsappIsOpen, setModalWhatsappIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const handleVisitLocal = () => {
    navigate(`/profile/${userId}`);
  };

  const handleOpenWhatsappModal = () => {
    setModalWhatsappIsOpen(true);
  };

  const handleWhatsapp = () => {
    const message = `Me interesa este producto: ${title}`;
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
    <div className="flex flex-col xs:w-[160px] xs:h-[430px] xl:w-[300px] xl:h-[620px] mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-100 text-center font-semibold xl:p-2 xl:text-sm xs:text-xs p-1">
        {user?.businessName || "Nombre del negocio"}
        <h3>{user?.direction || "Venta Online"}</h3>
      </div>

      <div className="relative xl:h-[300px] mb-4">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`Image ${index}`}
                className="w-full xl:h-[320px] xs:h-[200px] object-cover"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-end justify-between xs:p-2 xl:p-4 bg-gradient-to-t from-black via-transparent to-transparent">
                <button
                  onClick={handleOpenWhatsappModal}
                  className="bg-green-500 bg-opacity-80 text-white font-bold xl:p-2 xs:p-1 rounded-full"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                  >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                </button>
                <button
                  onClick={handleVisitLocal}
                  className="bg-gray-400 bg-opacity-75 hover:bg-gray-600 text-white xl:font-semibold xs:text-[12px] xs:font-light xs:p-1 xl:p-2 xl:px-4 rounded-md"
                >
                  Visitar local
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex flex-col xl:mt-[30px] p-4 ">
        <div className="flex items-center xl:text-lg xs:text-sm font-semibold text-center justify-center h-16 w-full">
          {title}
        </div>
        <div className="flex xl:flex-row xs:flex-col justify-between">
          <div className="flex flex-col">
            <p className="text-gray-600 xl:text-lg">${price}</p>
            <p className="xs:hidden xl:flex text-gray-600 mb-2">Talles</p>
          </div>
          <p className="text-gray-600 xs:text-xs xl:text-lg">{brand}</p>
        </div>
        <div className="flex flex-row gap-2 xl:text-md xl:m-1 xs:text-xs overflow-y-hidden overflow-x-auto">
          {size.map((s, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 xl:px-2 xl:py-1 rounded p-1 my-1 xs:text-sm xl:text-xl "
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Modal para WhatsApp */}
      <Modal
        isOpen={modalWhatsappIsOpen}
        onRequestClose={() => setModalWhatsappIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
        overlayClassName="fixed inset-0"
      >
        <div className=" flex flex-col bg-white justify-center  rounded-lg w-11/12 max-w-md relative xs:w-[300px] xs:h-[520px]">
          <button
            onClick={() => setModalWhatsappIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 bg-slate rounded-xl px-2 bg-opacity-80 "
          >
            X
          </button>
          <div className="w-full mb-4">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="w-full h-[350px] mt-2   object-cover "
                  />
                </div>
              ))}
            </Slider>
          </div>
          <h2 className="text-center text-lg font-semibold my-2">{title}</h2>
          <button
            onClick={handleWhatsapp}
            className=" bg-green-500 text-white px-4 py-2"
          >
            Consultar por WhatsApp
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PostCard;
