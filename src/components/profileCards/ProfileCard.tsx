import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


interface MyProfileCard {
  post:{
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

const MyCard: React.FC<MyProfileCard> = ({post}) =>{
  const {
  title,
  price,
  imageUrl,
  imageUrl1,
  imageUrl2,
  size,
  brand,
  }= post;

  

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
    <div className="flex flex-col xl:w-[300px] xl:h-[600px]  xs:w-[160px] max-w-sm mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="h-48 mb-4">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`Image ${index}`}
                className="w-full xl:h-[370px] xs:h-[200px] object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="p-4 xl:mt-[180px] xs:mt-2">
        <h2 className="xl:h-14 xs:h-10 text-center xl:text-xl xs:text-sm font-semibold mb-2">{title}</h2>
        <div className="flex xl:flex-row xs:flex-col justify-between xs:text-md xl:text-lg">
        <p className="text-gray-700 xl:mb-2">${price}</p>
        <p className="text-gray-600 xl:mb-2 xs:h-12 xl:h-8 ">Marca: {brand}</p>
        </div>
        <div className="mb-2">
          <p className="text-gray-600 mb-2">Talle</p>
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
      </div>
    </div>
  );
};

export default MyCard;