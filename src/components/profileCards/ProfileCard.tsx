import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import React, { useState } from 'react';
import Slider from 'react-slick';
import Modal from 'react-modal';

interface MyProfileCard {
  post: {
    id: string
    title: string
    price: number
    imageUrl: string
    imageUrl1?: string
    imageUrl2?: string
    size: string[]
    category: string
    brand: string
    color: string
  }
}

const MyCard: React.FC<MyProfileCard> = ({ post }) => {
  const { title, price, imageUrl, imageUrl1, imageUrl2, size, brand } = post

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  }

  const images = [imageUrl, imageUrl1, imageUrl2].filter(Boolean) as string[]
  Modal.setAppElement('#root'); // O el ID del contenedor principal de tu aplicación


  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

  const handleShareClick = () => {
    setShareModalIsOpen(true);
  };

  
  return (
    <div className="flex flex-col xl:w-[220px] xl:h-[510px] xs:w-[150px] xs:h-[320px] max-w-sm m-4 bg-white shadow-md rounded-md overflow-hidden relative">
      <div className="relative">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Product Image ${index + 1}`}
                className="object-cover w-full xl:h-[300px] xs:h-[170px]"
              />
            </div>
          ))}
        </Slider>
        <button
          onClick={handleShareClick}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="xl:h-6 xl:w-6 xs:w-3 xs:h-3 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
      <div className="xl:p-4 xs:p-2 xl:text-md xs:text-sm xs:mt-3">
        <div className="flex items-center xl:text-lg xs:text-sm font-semibold text-center justify-center h-16 w-full">
          {title}
        </div>
        <div className="flex xs:flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-gray-600 xl:text-lg">${price}</p>
            <p className="xs:hidden xl:flex text-gray-600 mb-2">Talle</p>
          </div>
          <p className="text-gray-600 xs:text-xs xl:text-lg">{brand}</p>
        </div>
        <div className="flex flex-row gap-2 xl:text-md xl:m-1 xs:text-xs overflow-y-hidden overflow-x-auto">
          {size.map((s, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 xl:px-2 xl:py-1 rounded p-1 h-6 my-1"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

     {/* Modal para detalles del producto */}
     
      {/* Modal para compartir */}
      <Modal
        isOpen={shareModalIsOpen}
        onRequestClose={() => setShareModalIsOpen(false)}
        contentLabel="Compartir Producto"
        className="bg-white  rounded-lg shadow-lg max-w-md mx-auto my-20 xl:h-[580px] w-[300px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
         
        <div className="flex flex-col items-center ">
          <div className="w-full mb-4">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="w-full h-[400px]   object-cover rounded-t-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="p-1">
          <div className="flex items-center xl:text-lg xs:text-sm font-semibold text-center justify-center h-16 w-full">{title}</div>
          <p className="text-sm text-gray-600">Precio: ${price}</p>
          <p className="text-xs text-gray-600">Marca: {brand}</p>
        </div>
        </div>
          <div className="flex flex-row gap-2 xl:text-md mx-3 xs:text-xs  overflow-x-auto overflow-y-hidden">
          {size.map((s, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 xl:px-2 xl:py-1 rounded p-1 h-6 my-2"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-4">
          
          
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Copiar Enlace
          </button>
        </div>
      </Modal>
    </div>

  )
}

export default MyCard
