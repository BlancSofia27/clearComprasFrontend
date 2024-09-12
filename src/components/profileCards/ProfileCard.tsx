import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"

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
      </div>
      <div className="xl:p-4 xs:p-2 xl:text-md xs:text-sm xs:mt-3">
      <div className="flex items-center xl:text-lg xs:text-sm font-semibold text-center justify-center h-16 w-full">
  {title}
</div>
        <div className="flex xs:flex-row justify-between ">
          <div className="flex flex-col">
            <p className="text-gray-600 xl:text-lg ">${price}</p>
            <p className="xs:hidden xl:flex text-gray-600 mb-2 ">Talle</p>
          </div>
          <p>{brand}</p>
        </div>
        <div className="flex flex-wrap gap-2 xs:m-2 xl:m-0">
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
  )
}

export default MyCard
