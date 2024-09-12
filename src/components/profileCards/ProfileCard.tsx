import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface MyProfileCard {
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

const MyCard: React.FC<MyProfileCard> = ({ post }) => {
  const { title, price, imageUrl, imageUrl1, imageUrl2, size, brand } = post;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const images = [imageUrl, imageUrl1, imageUrl2].filter(Boolean) as string[];

  // Función para abrir WhatsApp
  const handleConsult = () => {
    const message = `Me interesa este producto de ClearCompras: ${title}`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="flex flex-col xl:w-[220px] xl:h-[510px] xs:w-[150px] xs:h-[320px] max-w-sm m-4 bg-white shadow-md rounded-md overflow-hidden">
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
        {/* Botón posicionado absolutamente */}
        <div className="absolute bottom-2 right-2">
          <button
            onClick={handleConsult}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded text-xs"
          >
            Consultar
          </button>
        </div>
      </div>
      <div className="xl:p-4 xs:p-2 xl:text-md xs:text-sm xs:mt-3 flex flex-col justify-between h-full">
        <div className="flex items-center xl:text-lg xs:text-sm font-semibold text-center justify-center h-16 w-full">
          {title}
        </div>
        <div className="flex xs:flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-gray-600 xl:text-lg">${price}</p>
            <p className="xs:hidden xl:flex text-gray-600 mb-2">Talle</p>
          </div>
          <p>{brand}</p>
        </div>
        {/* Ajuste en la visibilidad del overflow */}
        <div className="flex flex-nowrap gap-2 xs:m-2 xl:m-0 overflow-x-auto py-1">
          {size.map((s, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-center flex items-center justify-center whitespace-nowrap"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCard;
